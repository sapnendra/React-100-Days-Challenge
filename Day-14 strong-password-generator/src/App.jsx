import React, { useState } from "react";
import { ArrowRight, Copy, ShieldCheck } from "lucide-react";
import "animate.css";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const pattern =
    "zP#7b=)R$@kV4^&D<y+Sm0g?LnaHqT2p5l>1wMUK!(i9NZoOE8u6sJAXr3tWvhf*YI-_xCGBFdcjQ";
  const [password, setPassword] = useState("");

  const generatePassword = (e) => {
    e.preventDefault();
    let pass = "";
    const len = e.target[0].value;
    const patternLength = pattern.length - 1;
    for (let i = 0; i < len; i++) {
      const randomIdx = Math.floor(Math.random() * patternLength);
      pass += pattern[randomIdx];
    }
    setPassword(pass);
  };

  const copyPassword = async () => {
    await navigator.clipboard.writeText(password);
    toast.success("Password Copied to Clipboard", {position: "top-center"})
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-rose-500 to-slate-900 ">
      <div className="flex flex-col items-center gap-3 animate__animated animate__pulse p-8 w-lg bg-white rounded-lg bg-gradient-to-r from-slate-700 via-rose-700 to-slate-700 border border-white/30 shadow-xl">
        <ShieldCheck className="text-white w-10 h-10" />
        <h1 className="text-3xl font-bold text-white">Password Generator</h1>
        <form
          className="w-full mt-5 flex flex-col items-center justify-center gap-5"
          onSubmit={generatePassword}
        >
          <input
            type="number"
            placeholder="Enter password length"
            className="w-full bg-black/10 p-3 rounded-lg focus:outline-none text-white border border-white/20"
          />
          <button className="flex items-center gap-1 text-white font-semibold px-8 py-2 bg-green-500 rounded-md border-none hover:scale-105 duration-200 cursor-pointer">
            <ArrowRight />
            Generate
          </button>
        </form>
        {password !== "" && (
          <div className="mt-2 p-3 rounded-lg bg-black/30 text-white w-full flex items-center justify-between">
            <p className="text-gray-200 text-center">{password}</p>
            <Copy
              className="w-4 h-4 hover:scale-105 duration-150 cursor-pointer"
              onClick={copyPassword}
            />
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
