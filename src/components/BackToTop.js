import React, { useState } from "react";
import { BsArrow90DegUp } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import "../style/BackToTop.css";

const BackToTop = () => {
  const showOnPx = 400;
  const backToTopArrow = document.querySelector(".backToTop");

  const scrollContainer = () => {
    return document.documentElement || document.body;
  };

  document.addEventListener("scroll", () => {
    if (backToTopArrow) {
      if (scrollContainer().scrollTop > showOnPx) {
        if (backToTopArrow.classList.contains("hidden")) {
          backToTopArrow.classList.remove("hidden");
        }
      }

      if (scrollContainer().scrollTop < showOnPx) {
        if (!backToTopArrow.classList.contains("hidden")) {
          backToTopArrow.classList.add("hidden");
        }
      }
    }
  });

  return (
    <BsArrow90DegUp
      className="backToTop hidden"
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    />
  );
};

export default BackToTop;
