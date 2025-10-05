import React, { useEffect } from "react";
import BannerSection from "./BannerSection";
import MemberSection from "./MemberSection";
import AboutSection from "./AboutSection";
import WorkSection from "./WorkSection";
import StorySection from "./StorySection";
import ReviewSection from "./ReviewSection";
import AppSection from "./AppSection";

// import "../styles/hearts.css"; // CSS file import

const Home = () => {
  useEffect(() => {
    const heartContainer = document.getElementById("abcdhearts");

    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDuration = Math.random() * 5 + 3 + "s";
      heartContainer.appendChild(heart);

      setTimeout(() => heart.remove(), 8000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BannerSection />
      <MemberSection />
      <AboutSection />
      <WorkSection />
      <StorySection />
      <ReviewSection />
      <AppSection />

      {/* Heart animation container */}
      <div id="abcdhearts"></div>
    </>
  );
};

export default Home;
