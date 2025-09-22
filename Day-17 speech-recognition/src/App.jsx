import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ToastContainer, toast } from "react-toastify";
import {Ban, Copy, ListRestart, Mic} from "lucide-react"

const App = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // Handler functions (keep user gesture in mind!)
  const handleStartListening = () => {
    // Reset transcript to clear previous results
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Data copied to clipboard.", { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-gray-300 py-15">
      <div className="w-8/12 mx-auto p-9 bg-white rounded-xl flex flex-col items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-center mb-4 capitalize tracking-wide">
            Speech To Text{" "}
            <span className="text-blue-600 underline text-4xl">Converter</span>
          </h2>
          <p className="text-center tracking-widest">
            A react hook that converts speech from the microphone to text and
            makes it available to you components.
          </p>
        </div>
        <div className="main-content w-full h-50 border border-gray-200 rounded-lg mt-10 shadow-lg p-8">
          {transcript}
        </div>
        <div className="btn-style flex justify-center items-center gap-30 w-full mt-10">
          <button
            className="flex items-center gap-1 font-bold px-8 py-2 bg-green-500 text-white font-semibold rounded-lg active:scale-80 duration-200"
            onClick={() => handleCopy(transcript)}
          >
            <Copy className="w-5 h-5"/>
            Copy
          </button>
          <button
            className="flex items-center gap-1 px-8 py-2 bg-green-600 text-white font-semibold rounded-lg active:scale-80 duration-200"
            onClick={handleStartListening}
          >
            <Mic className="w-5 h-5"/>
            Start Listening
          </button>
          <button
            className="flex items-center gap-1 px-8 py-2 bg-red-500 text-white font-semibold rounded-lg active:scale-80 duration-200"
            onClick={handleStopListening}
          >
            <Ban className="w-5 h-5" />
            Stop Listening
          </button>
          <button
            className="flex items-center gap-1 px-8 py-2 bg-yellow-600 text-white font-semibold rounded-lg active:scale-80 duration-200"
            onClick={resetTranscript}
          >
            <ListRestart className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
