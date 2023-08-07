import baserockLogo from "../assets/baserock-logo.webp";
import Connect from "./Connect";
import { useEffect, useState, useRef } from "react";

import { ReactComponent as MenuIcon } from "../assets/Icons/menu-icon.svg";

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

  const desktopHeader = () => {
    return (
      <div className={`header-container ${headerTheme}`}>
        <div className="header-logo">
          <img src={baserockLogo} alt="finaleLogo"></img>
        </div>
        <div className="header-links  h100 flex ">
          <div className="header-item jc-center jc-center">Roadmap</div>
          <div className="header-item jc-center">Gallery</div>
          <div className="header-item jc-center">Team</div>
          <div className="header-item jc-center">Stake( Soon)</div>
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
            <MenuIcon></MenuIcon>
          </a>
          <img src={baserockLogo} alt="finaleLogo"></img>
        </div>
        <div
          ref={sideBarRef}
          className={`mobile-header-links ${
            isMobileSidebarOpen ? "header-visible" : ""
          }`}
        >
          <div className="mobile-header-logo">
            <img src={baserockLogo} alt="finaleLogo"></img>
          </div>
          <div className="mobile-header-item">Roadmap</div>
          <div className="mobile-header-item">Gallery</div>
          <div className="mobile-header-item">Team</div>
          <div className="mobile-header-item">Stake(Soon)</div>
        </div>

        <Connect />
      </div>
    );
  };

  return width < breakpoint ? mobileHeader() : desktopHeader();
};

export default Header;
