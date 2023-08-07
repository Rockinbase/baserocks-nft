import Rock1 from "../assets/rock-1.webp";
import Rock2 from "../assets/rock-2.webp";
import Rock3 from "../assets/rock-3.webp";
import Rock4 from "../assets/rock-4.webp";
import Rock5 from "../assets/rock-5.webp";
import Rock6 from "../assets/rock-6.webp";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Gallery = () => {
  return (
    <div className="gallery-container">
      <div className="carousel-container flex h100">
        <div className="gallery-about flex-col w100 h100">
          <h1 className="fstrong">About</h1>
          <div className="finfo">
            BaseRock collection of 1,000 designed & randomly generated NFTs on
            the Base Ecosystem . BaseRock holders will have access and
            opportunities to participate in exclusive events, such as:
            giveaways, bonus NFT claims & more.
          </div>
        </div>
        <div className="carousel bg-grad2 h100 w100">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
          >
            <div>
              <img src={Rock1} alt="Image 1" />
            </div>
            <div>
              <img src={Rock2} alt="Image 2" />
            </div>
            <div>
              <img src={Rock3} alt="Image 3" />
            </div>
            <div>
              <img src={Rock4} alt="Image 3" />
            </div>
            <div>
              <img src={Rock5} alt="Image 3" />
            </div>
            <div>
              <img src={Rock6} alt="Image 3" />
            </div>
            {/* Add more images as needed */}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Gallery;