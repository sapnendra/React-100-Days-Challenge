import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradient, setGradient] = useState([]);

  const getHexColorCode = () => {
    const rgb = 255 * 255 * 255;
    const hexCode = `${Math.floor(Math.random() * rgb).toString(16)}`;
    const colorHex = hexCode.padStart(6, "0");
    return `#${colorHex.toUpperCase()}`;
  };

  const generateGradient = () => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random() * 360);
      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degree}deg, ${color1}, ${color2})`,
          css: `background: linear-gradient(${degree}deg, ${color1}, ${color2});`,
        });
      } else {
        colors.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background: radial-gradient("circle", ${color1}, ${color2});`,
        });
      }
    }
    setGradient(colors);
  };

  useEffect(() => {
    generateGradient();
  }, [num, type]);

  const copyGradient = (css) => {
    navigator.clipboard.writeText(css);
    toast.success("Gradient copied to clipboard!", { position: "top-center" });
  };
  
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-9/12 mx-auto space-y-8">
        <div className="flex justify-between p-5 rounded-xl" style={{background: getHexColorCode()}}>
          <h1 className="text-3xl font-bold">🎨 Grandient Generator</h1>
          <div className="flex gap-5">
            <input
              value={num}
              placeholder="12"
              onChange={(e) => setNum(e.target.value)}
              className="border border-slate-300 bg-white rounded-lg w-[90px] p-2"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-slate-300 bg-white rounded-lg w-[150px] p-2"
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button className="px-16 py-2 bg-rose-500 text-white rounded font-md font-bold" onClick={generateGradient}>Generate</button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {gradient.map((item, index) => (
            <div
              key={index}
              className="h-[220px] rounded-xl relative"
              style={{
                background: item.gradient,
              }}
            >
              <button
                onClick={() => copyGradient(item.css)}
                className="h-8 flex items-center justify-center gap-2 px-3 pt-2 pb-1  bg-black/50 hover:bg-black/75 text-sm text-white rounded absolute bottom-2 right-2 cursor-pointer"
              >
                {getHexColorCode()}
                <FaRegCopy />
              </button>
            </div>
          ))}
        </div>
      <footer className="w-12/12 mt-10 py-4 text-center" style={{
                background: gradient[0]?.gradient,
              }}>
        <p className="text-white">Designed and Managed by <a className="text-xl text-white font-bold" href="https://github.com/sapnendra">Sapnendra</a></p>
        <p className="text-sm text-white">Made with ❤️ by Sapnendra Jaiswal</p>
      </footer>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
