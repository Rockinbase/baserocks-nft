import { ReactComponent as AirdropIcon } from "../assets/Icons/Airdrop.svg";
import { ReactComponent as CollabIcon } from "../assets/Icons/Collab.svg";
import { ReactComponent as RiseIcon } from "../assets/Icons/Rise.svg";
import { ReactComponent as BuildIcon } from "../assets/Icons/Build.svg";
import { ReactComponent as StakeIcon } from "../assets/Icons/Stake.svg";
import { Parallax } from "react-scroll-parallax";
const Roadmap = () => {
  return (
    <div className="roadmap-container flex flex-se h100 w100 parallax3">
      <div className="roadmap-bg flex  h100 w100 parallax3 gap">
        <Parallax className="parallax h100" speed={5} translateY={[0, 5]}>
          <div className=" w100  bg-grad2 border roadmap-layer">
            <div className="roadmap-item flex-col w100 h100 border">
              <BuildIcon />
              <h2 className="w100">Creation</h2>
              <h4 className="w100">Building a Strong Community</h4>
              <p className="finfo">
                In this initial phase, our primary focus is on fostering a
                vibrant and engaged community. We actively reach out to
                enthusiasts who resonate with our project’s vision, inviting
                them to join our Discord, Twitter, and social media channels.
                Transparent and regular communication keeps the community
                informed of our progress, upcoming plans, and opportunities for
                participation. We encourage discussions, feedback, and idea
                sharing to create a sense of belonging and camaraderie among our
                early supporters.
              </p>
            </div>
          </div>
        </Parallax>
        <Parallax className="parallax h100" speed={2} translateY={[0, 10]}>
          <div className="w100  bg-grad2 border roadmap-layer">
            <div className="roadmap-item flex-col w100 h100 border">
              <CollabIcon />
              <h2 className="w100">Growth</h2>
              <h4 className="w100">Collaborations with Projects and DAOs</h4>

              <p className="finfo">
                Collaboration is at the core of our project’s philosophy. We
                actively seek partnerships with like-minded projects and
                decentralized autonomous organizations (DAOs) that align with
                our values and vision. These collaborations not only broaden our
                exposure but also introduce our enchanting world to diverse
                audiences. Working together, we can create innovative
                experiences that transcend individual projects, forming a
                network of interconnected creativity and shared success.
              </p>
            </div>
          </div>
        </Parallax>
        <Parallax className="parallax h100" speed={4} translateY={[0, 18]}>
          <div className=" w100 bg-grad2 border roadmap-layer">
            <div className="roadmap-item flex-col w100 h100 border">
              <AirdropIcon />
              <h2 className="w100">Earning </h2>
              <h4 className="w100">NFT Airdrop For all Holders</h4>

              <p className="finfo">
                As a token of appreciation for our anticipated loyal holders, we
                are planning to conduct airdrops for all. This move highlights
                our project’s commitment to value and reward those who join us
                early, thereby fostering a sense of shared accomplishment and
                unity within our community.
              </p>
            </div>
          </div>
        </Parallax>
        <Parallax className="parallax h100" speed={3} translateY={[0, 22]}>
          <div className=" w100 bg-grad2 border roadmap-layer">
            <div className="roadmap-item flex-col w100 h100 border">
              <StakeIcon />
              <h2 className="w100">Lock </h2>
              <h4 className="w100">Staking</h4>

              <p className="finfo">
                We are launching our staking platform to promote the retention
                of BaseRock NFTs among holders. This system will enable holders
                to accumulate our generative tokens by staking their NFTs,
                thereby fostering an ecosystem that continues to produce value
                over time.
              </p>
            </div>
          </div>
        </Parallax>
        <Parallax className="parallax h100" speed={3} translateY={[0, 30]}>
          <div className=" w100 bg-grad2 border roadmap-layer">
            <div className="roadmap-item flex-col w100 h100 border">
              <RiseIcon />
              <h2 className="w100">Community </h2>
              <h4 className="w100">Rise</h4>

              <p className="finfo">
                The second phase of our BaseRock roadmap, titled “Rise”, will
                offer rich experiences to its owners and will be constantly
                updated.
              </p>
            </div>
          </div>
        </Parallax>
      </div>
    </div>
  );
};
export default Roadmap;
