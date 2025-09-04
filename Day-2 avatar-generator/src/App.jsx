import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import "animate.css";
import { ToastContainer, toast } from "react-toastify";

const data = [
  {
    label: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
  },
  {
    label: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed=",
  },
  {
    label: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed=",
  },
  {
    label: "Art",
    value: "art",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=",
  },
  {
    label: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men",
  },
  {
    label: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/women",
  },
];

const App = () => {
  const [src, setSrc] = useState(null);
  const [option, setoption] = useState("male");

  const generate = () => {
    const obj = data.find((item) => item.value === option);
    if (obj.value === "male" || obj.value === "female") {
      const url = obj.url;
      const imageUrl = `${url}/${Math.floor(Math.random() * 100)}.jpg`;
      setSrc(imageUrl);
    } else {
      const url = obj.url;
      const uniqueValue = Date.now();
      const imageUrl = `${url}${uniqueValue}`;
      setSrc(imageUrl);
    }
  };

  const onOptionChage = (e) => {
    const value = e.target.value;
    setoption(value);
  };

  const copyAvatar = (src) => {
    navigator.clipboard.writeText(src);
    toast.success("Image URL copied to clipboard!", { position: "top-center" });
  };

  const downloadImage = (src) => {
    const imageUrl = src;
    const fileName = `${Date.now()}.jpg`;

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        link.remove();
      })
      .catch((error) => console.error("Download failed:", error));
  };

  useEffect(() => {
    generate();
  }, [option]);

  return (
    <div className="animate__animated animate__fadeIn min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-white">
      <div className="animate__animated animate__bounceIn w-full max-w-md border rounded-2xl shadow-xl backdrop-blur-xl border border-slate-700 p-10 flex flex-col items-center gap-6">
        <img
          src={src || "/avt.webp"}
          className="h-35 w-35 rounded-full border-3 border-slate-700 shadow-lg object-cover"
        />
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-wide">Avatar Generator</h1>
          <p className="text-slate-300">
            Generate unlimited avatars for your website
          </p>
        </div>
        <div className="w-full space-y-3">
          <select
            className="w-full bg-slate-900 p-3 rounded-lg"
            value={option}
            onChange={onOptionChage}
          >
            {data.map((item, idx) => (
              <option key={idx} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <div className="w-full bg-slate-900 p-3 rounded-lg">{src}</div>

          <div className="flex gap-2 w-full">
            <button
              className="cursor-pointer flex-1 bg-gradient-to-r from-rose-500 to-orange-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform"
              onClick={generate}
            >
              <i className="ri-arrow-right-up-line mr-2"></i>
              Change
            </button>
            <button
              className="cursor-pointer flex-1 bg-gradient-to-r from-green-500 to-cyan-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform"
              onClick={() => downloadImage(src)}
            >
              <i className="ri-download-line"></i>
              Download
            </button>
            <button
              className="cursor-pointer flex-1 bg-gradient-to-r from-orange-500 to-amber-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform"
              onClick={() => copyAvatar(src)}
            >
              <i className="ri-file-copy-line mr-2"></i>
              Copy
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
