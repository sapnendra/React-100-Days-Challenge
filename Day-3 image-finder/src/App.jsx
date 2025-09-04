import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API_KEY = "Your API_KEY here";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, SetPage] = useState(1);
  const [query, setQuery] = useState("Nature");

  const fetchImage = async () => {
    try {
      setLoading(true);
      const options = {
        headers: {
          Authorization: API_KEY,
        },
      };
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`,
        options
      );
      console.log(res.data.photos);

      setPhotos([...photos, ...res.data.photos]);
    } catch (err) {
      console.log("Faild to fetch:", err);
      toast.error(
        "Failed to fecth images, Check logs for more info...",
        "top-center"
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    SetPage(page + 1);
  };

  const querySearch = (e) => {
    e.preventDefault();
    const val = e.target[0].value;
    setPhotos([]);
    setQuery(val);
  };

  useEffect(() => {
    fetchImage();
  }, [page, query]);

  return (
    <div className="min-h-screen">
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
        <div className="w-full flex justify-between items-center p-5 rounded-xl bg-gray-100">
          <h1 className="w-1/2 text-4xl font-bold text-blue-600">
            📸 Search image for - {query}
          </h1>
          <form onSubmit={querySearch} className="w-1/2 flex justify-end">
            <input
              type="text"
              className="w-1/2 border border-gray-300 p-2 rounded-md focus:outline-blue-600"
              placeholder="Search for images..."
              required
            />
            <button
              type="submit"
              className="font-semibold bg-blue-600 text-white p-2 rounded-md ml-2 hover:bg-blue-700 cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
        {photos.length === 0 && (
          <h1 className="w-full text-4xl font-bold text-center">
            Search query not found
          </h1>
        )}
        <div className="grid lg:grid-cols-5 lg:gap-12 gap-4">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className="min-h-[320px] w-[250px] bg-gray-200 rounded-xl overflow-hidden"
            >
              <div className="img-box h-[210px]">
                <img
                  className="object-cover w-full h-full"
                  src={item.src.medium}
                  alt={item.alt}
                />
              </div>
              <div className="h-[100px] mt-[10px] w-full p-2 flex items-center justify-between flex-col">
                <h3 className="w-full font-medium text-2xl text-gray-600">
                  {item.photographer} {}
                </h3>
                <button className="w-full font-semibold bg-green-500 py-2 rounded-md hover:scale-102 transition-transform duration-300 cursor-pointer">
                  <i className="ri-download-line"></i>{" "}
                  <a href={item.src.original} target="_blank">
                    Download
                  </a>
                </button>
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <i className="ri-loader-line text-4xl text-gray-400 animate-spin"></i>
        )}
        {photos.length > 0 && (
          <button
            onClick={loadMore}
            className="bg-rose-500 py-3 px-16 rounded-lg font-bold text-white hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            Load More
          </button>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
