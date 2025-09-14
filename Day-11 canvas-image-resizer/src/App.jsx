import React, { useState } from "react";

const App = () => {
  const [img, setImg] = useState("/img-placeholder.png");
  const [resizedImage, setResizedImage] = useState("/img-placeholder.png");
  const [form, setForm] = useState({
    width: "",
    height: "",
  });

  const handleChange = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const showImage = (e) => {
    const input = e.target;
    const file = input.files[0];
    const blobURL = URL.createObjectURL(file);
    setImg(blobURL);
  };

  const resizeImage = (e) => {
    e.preventDefault();
    const image = new Image();
    image.src = img;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const targetWidth = Number(form.width);
      const targetHeight = Number(form.height);
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
      const imgString = canvas.toDataURL("image/png", 0.92);
      setResizedImage(imgString);
    };
  };

  const downloadImage = (src) => {
    const a = document.createElement("a");
    a.href = src;
    a.download = "resized-image.png";
    a.click();
    a.remove();
  };

  return (
    <div className="bg-gray-200 min-h-screen py-12">
      <div className="mx-auto w-10/12 bg-white p-8 rounded-xl grid grid-cols-2 gap-5">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Image Resizer</h1>
          <div className="relative rounded-lg h-[500px] bg-slate-900 p-5">
            <img
              src={img}
              className="rounded-lg object-contain w-full h-full"
            />
            <input
              onChange={showImage}
              accept="image/*"
              type="file"
              className="opacity-0 absolute top-0 left-0 w-full h-full rounded-lg"
            />
          </div>
          <div>
            <form className="flex gap-4" onSubmit={resizeImage}>
              <input
                type="number"
                name="width"
                placeholder="Width"
                className="border border-gray-300 p-2 rounded focus:outline-none"
                onChange={handleChange}
                disabled={img === "/img-placeholder.png"}
                required
              />
              <input
                type="number"
                name="height"
                placeholder="Height"
                className="border border-gray-300 p-2 rounded focus:outline-none"
                onChange={handleChange}
                disabled={img === "/img-placeholder.png"}
                required
              />
              <button
                disabled={img === "/img-placeholder.png"}
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold px-8 py-2 hover:scale-105 transition-transform duration-200"
              >
                Resize Image
              </button>
            </form>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Result</h1>
          <div className="rounded-lg h-[500px] bg-slate-900 p-5 flex items-center justify-center overflow-auto">
            <img
              src={resizedImage}
              style={{
                width: form.width,
                height: form.height,
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              disabled={img === "/img-placeholder.png"}
              onClick={() => downloadImage(resizedImage)}
              className="cursor-pointer bg-green-600 rounded text-white font-semibold px-8 py-2 hover:scale-105 transition-transform duration-200"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
