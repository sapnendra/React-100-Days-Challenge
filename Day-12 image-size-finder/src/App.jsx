import { ArrowBigRight, ArrowRight, Plus } from "lucide-react";
import React, { useState } from "react";

const App = () => {
  const [src, setSrc] = useState("/img-placeholder.png");
  const [original, setOriginal] = useState({
    width: 0,
    height: 0,
  });
  const [suggestedHeight, setSuggestedHeight] = useState(0);
  const [suggestedWidth, setSuggestedWidth] = useState(0);
  const chooseImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      const blobURL = URL.createObjectURL(file);
      setSrc(blobURL);
      const image = new Image();
      image.src = blobURL;
      image.onload = () => {
        setOriginal({ width: image.width, height: image.height });
      };
    };
  };

  const findHeight = (e) => {
    e.preventDefault();
    const width = e.target[0].value;
    const newHeight = Math.floor((width * original.height) / original.width);
    setSuggestedHeight(newHeight);
  };

  const findWidth = (e) => {
    e.preventDefault();
    const height = e.target[0].value;
    const newWidth = Math.floor((height * original.width) / original.height);
    setSuggestedWidth(newWidth);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
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
      <div className="w-9/12 mx-auto py-4 flex flex-col gap-4">
        <button
          onClick={chooseImage}
          className="w-fit flex items-center justify-center gap-1 px-10 py-3 bg-blue-500 text-white font-bold rounded-lg hover:scale-102 transition-transform duration-200"
        >
          <Plus className="w-5 h-5" /> Add Image
        </button>
        <div className="bg-white rounded-xl p-8 flex justify-center">
          <img src={src} className="w-1/2 rounded-lg" />
        </div>
        <div className="bg-white rounded-xl p-8 grid c grid-cols-2">
          <div className="">
            <h1 className="mb-3 bg-green-600 py-3 px-4 font-bold text-lg text-white w-fit rounded">
              Height Finder
            </h1>
            <form onSubmit={findHeight}>
              <input
                name="width"
                type="number"
                placeholder="Width"
                className="border border-gray-300 p-3 rounded"
                required
              />
              <button className="bg-indigo-600 flex gap-2 font-bold items-center text-white rounded px-5 py-2 mt-3">
                <ArrowBigRight />
                Find
              </button>
            </form>
            <h1 className="mt-4 text-xl font-semibold">
              Height Suggestion : {suggestedHeight}
            </h1>
          </div>
          <div className="">
            <h1 className="mb-3 bg-red-600 py-3 px-4 font-bold text-lg text-white w-fit rounded">
              Width Finder
            </h1>
            <form onSubmit={findWidth}>
              <input
                name="height"
                type="number"
                placeholder="Height"
                className="border border-gray-300 p-3 rounded"
                required
              />
              <button className="bg-indigo-600 flex gap-2 font-bold items-center text-white rounded px-5 py-2 mt-3">
                <ArrowBigRight />
                Find
              </button>
            </form>
            <h1 className="mt-4 text-xl font-semibold">
              Width Suggestion : {suggestedWidth}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
