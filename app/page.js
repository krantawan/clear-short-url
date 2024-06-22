"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Shortened from "./components/shortened";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState([]);
  const [error, setError] = useState("");
  const [isMouseEnter, setMouseEnter] = useState(-1);

  // Load URLs from local storage
  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem("shortUrls")) || [];
    setShortUrl(storedUrls);
  }, []);

  // Save URLs to local storage
  const saveUrlsToLocalStorage = (urls) => {
    localStorage.setItem("shortUrls", JSON.stringify(urls));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!url) {
      setError("Please enter a URL");
      return;
    }

    if (
      !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
        url
      )
    ) {
      setError("Please enter a valid URL");
      return;
    }

    let formattedurl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      formattedurl = "https://" + url;
    }

    try {
      const res = await axios.post("/api/shorten", { url: formattedurl });

      if (res.status === 200) {
        const newShortUrls = [
          ...shortUrl,
          { originalUrl: url, shortUrl: res.data.shortUrl },
        ];

        setShortUrl(newShortUrls);
        saveUrlsToLocalStorage(newShortUrls);
        setUrl("");
      } else {
        setError("Failed to shorten the URL");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen bg-whit">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          URL Shortener
        </h1>
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.example.com"
                className="block w-full text-lg py-3 px-4 placeholder-gray-500 text-gray-900 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              className="w-full py-2 rounded-b-md bg-black text-white"
              type="submit"
            >
              Shorten URL
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {shortUrl.length > 0 && (
            <div className="w-full max-w-md mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Your Shortened URLs
              </h2>

              {shortUrl.map((item, index) => (
                <Tippy content="Copied!" key={index} trigger="click">
                  <div
                    className={`grid gap-2 ${
                      isMouseEnter === index ? "bg-gray-100 cursor-pointer" : ""
                    } rounded-md`}
                    onMouseEnter={() => setMouseEnter(index)}
                    onMouseLeave={() => setMouseEnter(-1)}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `http://localhost:3000/${item.shortUrl}`
                      );
                    }}
                  >
                    <Shortened key={index} shortUrl={item} />
                  </div>
                </Tippy>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
