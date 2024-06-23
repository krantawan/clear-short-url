import { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Shortened from "./Shortened";

export default function UrlList({ shortUrl, handleDelete, handleClick }) {
  const [isMouseEnter, setMouseEnter] = useState(-1);

  return (
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
        >
          <Shortened shortUrl={item} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
}
