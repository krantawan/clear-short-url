"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "./components/ModalDelete";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";

import "tippy.js/dist/tippy.css";

export default function Home() {
  const [shortUrl, setShortUrl] = useState([]);
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

  const handleSubmit = async (url) => {
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
      } else {
        console.error("Failed to shorten the URL");
      }
    } catch (error) {
      console.error("An error occurred. Please try again.", error);
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
          <UrlForm onSubmit={handleSubmit} />
          <UrlList shortUrl={shortUrl} handleDelete={handleDelete} />
        </div>
      </div>

      <Modal
        showModal={showModal}
        condel={confirmDelete}
        candel={cancelDelete}
      />
    </div>
  );
}
