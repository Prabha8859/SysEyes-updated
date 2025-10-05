import React, { useEffect } from "react";

const HeartsBackground = () => {
  useEffect(() => {
    const container = document.querySelector(".hearts-container");

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.classList.add("heart");

      // Random position (X-axis)
      heart.style.left = Math.random() * 100 + "vw";
      // Random size
      const size = Math.random() * 20 + 10;
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;
      // Random animation duration
      heart.style.animationDuration = 5 + Math.random() * 5 + "s";
      // Random opacity
      heart.style.opacity = 0.5 + Math.random() * 0.5;
      // Random horizontal sway
      heart.style.setProperty("--sway", `${Math.random() * 30 - 15}px`);

      container.appendChild(heart);

      // Remove after animation
      setTimeout(() => {
        heart.remove();
      }, 10000);
    };

    const interval = setInterval(createHeart, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="hearts-container"></div>

      <style>{`
        .hearts-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }

        .heart {
          position: absolute;
          bottom: -20px;
          background-color: rgb(248, 34, 98);
          transform: rotate(-45deg);
          animation: floatUp linear infinite;
          opacity: 0.7;
        }

        .heart::before,
        .heart::after {
          content: "";
          position: absolute;
          background-color: rgb(248, 34, 98);
          border-radius: 50%;
        }

        .heart::before {
          top: -50%;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .heart::after {
          left: 50%;
          top: 0;
          width: 100%;
          height: 100%;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) rotate(-45deg) scale(0.8);
            opacity: var(--start-opacity, 0.7);
          }
          50% {
            transform: translateY(-50vh) translateX(var(--sway, 0px)) rotate(-45deg) scale(1);
          }
          100% {
            transform: translateY(-120vh) translateX(0px) rotate(-45deg) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default HeartsBackground;
