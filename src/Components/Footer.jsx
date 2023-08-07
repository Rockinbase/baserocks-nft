import { ReactComponent as DiscordLogo } from "../assets/Icons/discord-icon.svg";
import { ReactComponent as TwitterLogo } from "../assets/Icons/twitter-icon.svg";

import BaseRockLogo from "../assets/baserock-logo.webp";

const Footer = () => {
  return (
    <div className="footer-container ">
      <div className="footer-links-social-container flex-sb h100 w100">
        <div className="footer-links">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/rockinbase"
          >
            <TwitterLogo className="footer-social"></TwitterLogo>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://discord.gg/N4eED96Jpg"
          >
            <DiscordLogo className="footer-social"></DiscordLogo>
          </a>
        </div>

        <div className="footer-logo">
          <img src={BaseRockLogo} alt="finaleLogo"></img>
        </div>
      </div>
    </div>
  );
};

export default Footer;
