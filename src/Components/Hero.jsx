import HeroRock from "../assets/hero-rock.webp";
import { Parallax } from "react-scroll-parallax";
import { ReactComponent as OpenseaIcon } from "../assets/Icons/Opensea.svg";
const Hero = () => {
  return (
    <>
      <div className="hero-container h100 w100 parallax">
        <Parallax
          className="parallax h100 w100"
          translateY={[-10, 10]}
          speed={5}
        >
          <div className="plexus h100 w100" />
        </Parallax>
        <div className="h100 w100 plexus-grad"></div>
        <Parallax
          className="parallax3 w100 jc-center"
          speed={5}
          translateY={[-20, 10]}
        >
          <div className="hero-main h100 flex-col ">
            <div className="hero-text fstrong">
              Limited edition Rock specially designed for Base chain
            </div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://opensea.io/collection/rockinbase"
              className="mint-button"
            >
              Opensea ! <OpenseaIcon />
            </a>
          </div>
        </Parallax>
        <Parallax
          speed={2}
          translateY={[10, -10]}
          className="hero-rock parallax2 flex  "
        >
          <img src={HeroRock}></img>
        </Parallax>
      </div>
    </>
  );
};

export default Hero;
