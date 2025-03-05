import React, { useState } from "react";

interface Message {
  email: string;
  name: string;
  owner: string;
  text: string;
}

type MessageSliderProps = {
  messages: Message[];
  onMessageChange: (page: number) => void;
};

export const MessageSlider = ({ messages, onMessageChange }: MessageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSliderChange = e => {
    const newIndex = parseInt(e.target.value);
    setCurrentIndex(newIndex);
    onMessageChange(newIndex);
  };

  const handlePrevMessage = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : messages.length - 1;
    setCurrentIndex(newIndex);
    onMessageChange(newIndex);
  };

  const handleNextMessage = () => {
    const newIndex = currentIndex < messages.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onMessageChange(newIndex);
  };

  return (
    <div className="w-full flex items-center space-x-4 mt-4">
      <button onClick={handlePrevMessage} className="text-gray-600 hover:text-gray-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="flex-1 relative">
        <input
          type="range"
          min="0"
          max={messages.length - 1}
          value={currentIndex}
          onChange={handleSliderChange}
          className="w-full h-2 bg-transparent appearance-none"
          style={{
            background: `linear-gradient(to right, 
                #8B5CF6 0%, 
                #8B5CF6 ${(currentIndex / (messages.length - 1)) * 100}%, 
                #E5E7EB ${(currentIndex / (messages.length - 1)) * 100}%, 
                #E5E7EB 100%)`,
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-purple-600 rounded-full shadow-lg transform -translate-x-1/2"
          style={{
            left: `${(currentIndex / (messages.length - 1)) * 100}%`,
          }}
        />
      </div>

      <button onClick={handleNextMessage} className="text-gray-600 hover:text-gray-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};
