import Footer from "./Footer";

import baseNameService from "../assets/partner-baseNameService.webp";
import beagleSwap from "../assets/partner-beagleSwap.webp";
import bullsOnBase from "../assets/partner-bullsOnBase.webp";
import innovaz from "../assets/partner-innovaz.webp";
import nftFeed from "../assets/partner-nftFeed.webp";
import omnisea from "../assets/partner-omnisea.webp";

const Partners = () => {
  return (
    <div className="partners-container jc-center h100 w100 bg-grad">
      <div className="partners-inner-container  bg-grad2 flex-col jc-center w100 h100">
        <div className="jc-center flex-col h100 w100">
          <div className="partners-description flex-col jc-center  w100">
            <h className="partners-header fstrong ">Partners</h>
            <p className="finfo">
              Vivamus in diam turpis. In condimentum maximus tristique. Maecenas
              non laoreet odio.
            </p>
          </div>
          <div className="flex-col  w100">
            <div className="flex-se w100 ">
              <div className="flex-col jc-center">
                <img src={baseNameService} />
                {/* <p className="jc-center">Base Name Service</p> */}
              </div>
              <div className="flex-col">
                <img src={beagleSwap} />
                {/* <p className="jc-center">Beagle Swap</p> */}
              </div>
              <div className="flex-col">
                <img src={omnisea} />
                {/* <p className="jc-center">Omnisea</p> */}
              </div>
              <div className="flex-col">
                <img src={nftFeed} />
                {/* <p className="jc-center">NFT Feed</p> */}
              </div>
              <div className="flex-col">
                <img src={innovaz} />
                {/* <p className="jc-center">Innovaz</p> */}
              </div>
              <div className="flex-col">
                <img src={bullsOnBase} />
                {/* <p className="jc-center">Base Pepe</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Partners;
