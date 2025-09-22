import React, { useState } from "react";
import { Upload } from "lucide-react";
import "animate.css";
import { ReactPhotoEditor } from "react-photo-editor";

const App = () => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  const chooseImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      setFile(file);
      setOpen(true);
    };
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  const handleSave = (editedImg) => {
    const url = URL.createObjectURL(editedImg);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Edited-Image.jpeg"
    a.click();
    a.remove();
  };

  return (
    <div className="animate__animated animate__fadeIn min-h-screen bg-gray-300 flex items-center justify-center">
      <div
        onClick={chooseImage}
        className="bg-rose-500 text-white shadow-lg w-lg p-9 rounded-lg active:scale-80 cursor-pointer duration-100 flex items-center justify-center flex-col gap-4"
      >
        <Upload className="w-8 h-8" />
        <h1>Choose an image</h1>
      </div>

      <ReactPhotoEditor
        open={open}
        file={file}
        onClose={handleClose}
        onSaveImage={handleSave}
      />
    </div>
  );
};

export default App;
