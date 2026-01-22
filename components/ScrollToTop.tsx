"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 300); // 当滚动超过300px时显示
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`group fixed right-8 bottom-8 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
      aria-label="Scroll to top"
    >
      {/* 进度环 */}
      <div className="relative h-14 w-14">
        <svg className="h-14 w-14 -rotate-90 transform" viewBox="0 0 36 36">
          {/* 背景环 */}
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          {/* 进度环 */}
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgb(255,107,53)"
            strokeWidth="2"
            strokeDasharray={`${scrollProgress * 0.995}, 100`}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        {/* 箭头图标 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ArrowUp className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>

      {/* 悬停效果 */}
      <div className="bg-based-orange/20 absolute inset-0 scale-0 rounded-full transition-transform duration-300 group-hover:scale-110" />
    </button>
  );
}
