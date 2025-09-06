import React from "react";
import "animate.css";
import {
  Delete,
  DeleteIcon,
  Download,
  LogIn,
  Trash,
  Trash2,
  Upload,
  UploadCloud,
  UploadIcon,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useImageStore } from "./zustand/useImageStore";

const FIVE_MB = 5 * 1024 * 1024;

const App = () => {
  const { images, setImage, deleteImage } = useImageStore();

  const chooseFile = (e) => {
    const input = e.target;
    const file = input.files[0];
    if (!file.type.startsWith("image/"))
      return toast.error("Please select an image file.!", {
        position: "top-center",
      });

    if (file.size > FIVE_MB)
      return toast.error(
        "File size is too large, please upload image less than 5MB.!",
        { position: "top-center" }
      );

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImage({
        id: Date.now(),
        name: file.name,
        size: file.size,
        binary: fileReader.result,
        createdAt: new Date(),
      });
      toast.success("New image added !", { position: "top-center" });
    };
  };

  const downloadImage = (item) => {
    const a = document.createElement("a");
    a.href = item.binary;
    a.download = item.name;
    a.click();
    a.remove();
  };

  return (
    <>
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
      <div className="bg-gray-100 min-h-screen lg:px-0 px-8">
        <div className="lg:w-9/12 mx-auto py-10 space-y-8">
          <h1 className="text-4xl font-bold text-center">Image Storage</h1>
          <button className="w-full relative h-45 cursor-pointer hover:scale-105 tansition-transform duration-300 lg:w-8/12 mx-auto flex flex-col gap-3 items-center justify-center text-white p-24 bg-red-400 rounded-xl bg-[linear-gradient(131deg,_#00c6ff,_#0072ff,_hsl(312.7,_75.71482310035785%,_42.34793514504251%))]">
            <div className="flex flex-col items-center gap-3">
              <UploadIcon className="w-12 h-12" />
              <h1 className="text-2xl font-medium">Click me to add an image</h1>
            </div>
            <input
              type="file"
              className="absolute top-0 left-0 opacity-0 w-full h-full rounded-xl"
              onChange={chooseFile}
            />
          </button>
          <div className="grid lg:grid-cols-4 gap-8">
            {images.map((item, idx) => (
              <div key={idx} className="">
                <img
                  src={item.binary}
                  className="overflow-hidden hover:scale-105 transition-transform duration-300 w-full h-[170px] object-cover rounded-t-xl"
                />
                <div className="bg-white p-3 rounded-b-xl flex items-center justify-between">
                  <div>
                    <h1 className="text-sm font-semibold">{item.name}</h1>
                    <p className="text-xs">
                      {(item.size / 1024 / 1024).toFixed(2)}MB
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <button
                      onClick={() => downloadImage(item)}
                      className="p-2 rounded w-8 h-8 font-bold flex items-center justify-center bg-green-600 text-white hover:scale-105 transition-transform duration-200"
                    >
                      <Download />
                    </button>
                    <button
                      onClick={() => deleteImage(item.id)}
                      className="p-2 rounded w-8 h-8 font-bold flex items-center justify-center bg-red-600 text-white hover:scale-105 transition-transform duration-200"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
