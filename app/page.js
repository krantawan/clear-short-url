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
  const [showModal, setShowModal] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);

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

    const urlPattern = new RegExp(
      "^" +
        "(?:(?:https?|ftp)://)" +
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.\\d{1,3}){3}|" +
        "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
        "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
        "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
        ")" +
        "(?::\\d{2,5})?" +
        "(?:/\\S*)?" +
        "$",
      "i"
    );

    if (!urlPattern.test(url)) {
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

  const handleDelete = (shortUrlToDelete) => {
    setUrlToDelete(shortUrlToDelete);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/delete/${urlToDelete}`);
      const newShortUrls = shortUrl.filter(
        (item) => item.shortUrl !== urlToDelete
      );
      setShortUrl(newShortUrls);
      saveUrlsToLocalStorage(newShortUrls);
      setShowModal(false);
      setUrlToDelete(null);
    } catch (error) {
      console.error("Failed to delete the URL", error);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setUrlToDelete(null);
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
                  <Shortened shortUrl={item} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Delete URL
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this URL? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
