// src/pages/preloader/Preloader.jsx
import React from "react";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-8">
        
        {/* Heart Shape with Fill */}
        <div className="relative w-60 h-50 animate-heartbeat">
          <svg
            viewBox="0 0 32 29.6"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Outline Heart */}
            <path
              d="M23.6,0c-3.4,0-6.4,2.1-7.6,5.1C14.8,2.1,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4
              c0,9.2,16,21.2,16,21.2s16-12,16-21.2C32,3.8,28.2,0,23.6,0z"
              fill="white"
              stroke="red"
              strokeWidth="0.9"
            />
            {/* Red Fill (water effect) */}
            <rect
              className="animate-fill"
              x="0"
              y="0"
              width="32"
              height="29.6"
              fill="red"
              mask="url(#heartMask)"
            />
            <mask id="heartMask">
              <path
                d="M23.6,0c-3.4,0-6.4,2.1-7.6,5.1C14.8,2.1,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4
                c0,9.2,16,21.2,16,21.2s16-12,16-21.2C32,3.8,28.2,0,23.6,0z"
                fill="white"
              />
            </mask>
          </svg>
        </div>

        {/* Text */}
        <p className="text-red-600 text-4xl font-semibold animate-pulse">
          Loading SysEye...
        </p>
      </div>
    </div>
  );
};

export default Preloader;
