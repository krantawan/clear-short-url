import { useState } from "react";

export default function UrlForm({ onSubmit }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
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

    setError("");
    onSubmit(url);
    setUrl("");
  };
  return (
    <div>
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
    </div>
  );
}
