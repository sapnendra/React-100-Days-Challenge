import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import "animate.css";
import getYouTubeID from "get-youtube-id";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const urlModel = [
    {
      width: 120,
      height: 90,
      url: "https://img.youtube.com/vi",
      filename: "default.jpg",
    },
    {
      width: 320,
      height: 180,
      url: "https://img.youtube.com/vi",
      filename: "mqdefault.jpg",
    },
    {
      width: 480,
      height: 360,
      url: "https://img.youtube.com/vi",
      filename: "hqdefault.jpg",
    },
    {
      width: 640,
      height: 480,
      url: "https://img.youtube.com/vi",
      filename: "sddefault.jpg",
    },
    {
      width: 1280,
      height: 720,
      url: "https://img.youtube.com/vi",
      filename: "maxresdefault.jpg",
    },
  ];

  const [url, setURL] = useState("");
  const [thumbnails, setThumbnail] = useState([]);

  const fetchThumbnail = (e) => {
    e.preventDefault();

    const videoId = getYouTubeID(url);
    if (videoId) {
      const model = urlModel.map((item) => {
        return {
          ...item,
          url: `${item.url}/${videoId}/${item.filename}`,
        };
      });
      setThumbnail(model);
    } else {
      toast.error("Invalid video URL...", "top-center");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <header className="w-full text-xl text-center bg-black sticky bottom-0 py-4">
        <p className="text-white">
          Designed and Managed by -{" "}
          <a
            href="https://github.com/sapnendra"
            className="text-yellow-600 font-semibold"
          >
            Sapnendra
          </a>
        </p>
      </header>
      <div className="w-9/12 mx-auto space-y-8 flex items-center justify-center flex-col py-12">
        <div className="w-full flex flex-col gap-5 justify-between items-center p-5 rounded-xl bg-gray-100">
          <h1 className="w-1/2 text-4xl text-center font-bold">
            Youtube Thumbnail Downloader
          </h1>
          <form
            className="w-full flex justify-center"
            onSubmit={fetchThumbnail}
          >
            <input
              type="url"
              className="w-1/2 border border-gray-300 p-2 rounded-md focus:outline-blue-600"
              placeholder="Enter youtube video URL..."
              onChange={(e) => setURL(e.target.value)}
              required
            />
            <button
              type="submit"
              className="font-semibold bg-black text-white py-2 px-3 rounded-md ml-2 hover:bg-blue-700 cursor-pointer"
            >
              Search <i className="ri-search-line"></i>
            </button>
          </form>
        </div>
        <div className="w-10/12 grid grid-cols-3 gap-12">
          {thumbnails.map((item, idx) => (
            <div className="bg-white rounded-lg" key={idx}>
              <img
                src={item.url}
                className="w-full h-[250px] object-cover rounded-t-xl"
              />
              <div className="p-3 bg-white rounded-b-xl flex items-center justify-between">
                <h1 className="text-lg font-semibold">
                  Size: {item.width}x{item.height}
                </h1>
                <a href={item.url} target="_blank">
                  <button className="font-semibold bg-black text-white py-2 px-3 rounded-md ml-2 hover:bg-green-600 cursor-pointer">
                    <i className="ri-download-line"></i> Download
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
