import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "animate.css";
import { SendHorizontal } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setTyping] = useState(false);

  const createChat = async (e) => {
    try {
      e.preventDefault();
      setChats((prev) => [
        ...prev,
        {
          sender: "me",
          message: message,
          createdAt: new Date(),
        },
      ]);
      setMessage("");
      setTyping(true);
      const payload = {
        contents: {
          parts: {
            // prompt: `Answer this in short - ${message}`,
            prompt: `${message}`,
          },
        },
      };
      const options = {
        headers: {
          "X-goog-api-key": API_KEY,
        },
      };
      const { data } = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        payload,
        options
      );
      const aiResult = data.candidates[0].content.parts[0].text;
      setChats((prev) => [
        ...prev,
        {
          sender: "ai",
          message: aiResult,
          createdAt: new Date(),
        },
      ]);
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <header className="px-8 flex items-center justify-between fixed top-0 w-full text-md text-center bg-black sticky bottom-0 py-4">
        <h1 className="text-3xl text-white font-bold text-center">
          🛠️🕹️ AI CHAT
        </h1>
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
      <div className="w-full mx-auto bg-[#222] min-h-screen pt-12 pb-30 overflow-y-auto">
        <div className="p-8">
          {chats.map((item, index) => (
            <div key={index}>
              {item.sender === "me" && (
                <div className="flex flex-col items-end animate__animated animate__fadeIn my-4">
                  <div className="w-fit bg-green-200 font-semibold px-6 py-3 rounded">
                    <ReactMarkdown>{item.message}</ReactMarkdown>
                    <div className="flex justify-end text-gray-700 text-xs">
                      <label>
                        {moment(item.createdAt).format(
                          "MMM DD YYYY, hh:mm:ss A"
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {item.sender === "ai" && (
                <div className="flex flex-col justify-start animate__animated animate__fadeIn">
                  <div className="w-fit bg-rose-200 font-semibold px-6 py-3 rounded">
                    <ReactMarkdown>{item.message}</ReactMarkdown>
                    <div className="flex justify-start text-gray-700 text-xs">
                      <label>
                        {moment(item.createdAt).format(
                          "MMM DD YYYY, hh:mm:ss A"
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {isTyping && (
          <div className="p-8">
            <small className="text-sm text-gray-500 mb-5 animate__animated animate__fadeIn">
              Typing...
            </small>
          </div>
        )}
        <div className="bg-indigo-900 p-8 fixed bottom-0 w-full">
          <form
            className="flex items-center justify-center gap-2"
            onSubmit={createChat}
          >
            <input
              onChange={(e) => setMessage(e.target.value.trim())}
              className="bg-gray-300 rounded-lg p-5 w-full focus:outline-none"
              placeholder="What's going on..."
              required
            />
            <button className="px-12 py-4 bg-green-600 rounded-lg text-white hover:bg-green-700 tansition-transform duration-100">
              <SendHorizontal size="32" />
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
