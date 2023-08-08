import React, { useEffect, useState, useRef } from "react";
import { scroller } from "react-scroll";
import { ReactComponent as MenuIcon } from "../assets/Icons/menu-icon.svg";
import baserockLogo from "../assets/baserock-logo.webp";
import Connect from "./Connect";
import { Link } from "react-scroll";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  const [headerTheme, setHeaderTheme] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 820;
  const sideBarRef = useRef(null);

  window.addEventListener("resize", (event) =>
    setWidth(event.target.innerWidth)
  );

  useEffect(() => {
    const handleHeaderTheme = () => {
      setScrollPosition(window.scrollY);
      const interval = window.innerHeight * 0.1;
      if (scrollPosition > interval) {
        setHeaderTheme("header-dark");
      } else {
        setHeaderTheme("");
      }
    };

    window.addEventListener("scroll", handleHeaderTheme);

    return () => window.removeEventListener("scroll", handleHeaderTheme);
  }, [scrollPosition]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        console.log("click");
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const scrollToElement = (elementId) => {
    scroller.scrollTo(elementId, {
      smooth: true,
      offset: -100,
      duration: 800,
    });
    setIsMobileSidebarOpen(false);
  };

  const desktopHeader = () => {
    return (
      <div className={`header-container ${headerTheme}`}>
        <div className="header-logo">
          <img src={baserockLogo} alt="baseRockLogo" />
        </div>
        <div className="header-links h100 flex">
          <div
            className="header-item jc-center jc-center"
            onClick={() => scrollToElement("roadmap-container")}
          >
            Roadmap
          </div>
          <div
            className="header-item jc-center"
            onClick={() => scrollToElement("gallery-container")}
          >
            Gallery
          </div>
          <div
            className="header-item jc-center"
            onClick={() => scrollToElement("team-container")}
          >
            Team
          </div>
          <div className="header-item jc-center">Stake(Soon)</div>
          <Connect />
        </div>
      </div>
    );
  };

  const mobileHeader = () => {
    return (
      <div className={`header-container ${headerTheme}`}>
        <div className="header-logo">
          <a className="menu-icon" onClick={() => setIsMobileSidebarOpen(true)}>
            <MenuIcon />
          </a>
          <img src={baserockLogo} alt="finaleLogo" />
        </div>
        <div
          ref={sideBarRef}
          className={`mobile-header-links ${
            isMobileSidebarOpen ? "header-visible" : ""
          }`}
        >
          <div className="mobile-header-logo">
            <img src={baserockLogo} alt="finaleLogo" />
          </div>
          <div
            className="mobile-header-item"
            onClick={() => scrollToElement("roadmap-container")}
          >
            Roadmap
          </div>
          <div
            className="mobile-header-item"
            onClick={() => scrollToElement("gallery-container")}
          >
            Gallery
          </div>
          <div
            className="mobile-header-item"
            onClick={() => scrollToElement("team-container")}
          >
            Team
          </div>
          <div className="mobile-header-item">Stake(Soon)</div>
        </div>
        <Connect />
      </div>
    );
  };

  return width < breakpoint ? mobileHeader() : desktopHeader();
};

export default Header;
