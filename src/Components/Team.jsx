import { Parallax } from "react-scroll-parallax";
import TeamMember1 from "../assets/team-member-1.webp";
import TeamMember2 from "../assets/team-member-2.webp";
import TeamMember3 from "../assets/team-member-3.webp";
import TeamMember4 from "../assets/team-member-4.webp";
import { ReactComponent as TwitterLogo } from "../assets/Icons/twitter-icon.svg";
const Team = () => {
  return (
    <div className="team-container flex jc-center">
      <div className="bg-grad2 flex  h100 w100">
        <div className="team-member flex-col   fstandard h100 ">
          <Parallax speed={5} translateY={[15, -15]} className="bg-grad2  w100">
            <img src={TeamMember1} />
          </Parallax>
          <h2>Beacon Akhenaton</h2>
          <h4>Community Head</h4>
          <div className="finfo">
            A web 3.0 expert and consultant. Project manager for over 10 years.
            A passionate investor.
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/etheroin"
          >
            <TwitterLogo className="fill-white" />
          </a>
        </div>
      </div>
      <div className="bg-grad2 flex h100 w100">
        <div className="team-member flex-col fstandard h100 ">
          <Parallax speed={5} translateY={[15, -15]} className="bg-grad2  w100">
            <img src={TeamMember2} />
          </Parallax>
          <h2>Holy-Ghost</h2>
          <h4>Head of Operations</h4>
          <div className="finfo">
            He has worked as an art director in various TV Series/Film projects,
            and he has led many projects in WEB 3.0 technology.
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/holygh0st2"
          >
            <TwitterLogo className="fill-white" />
          </a>
        </div>
      </div>
      <div className="bg-grad2 flex h100 w100">
        <div className="team-member flex-col fstandard h100 ">
          <Parallax speed={5} translateY={[15, -15]} className="bg-grad2 w100">
            <img src={TeamMember3} />
          </Parallax>
          <h2>Bazinga</h2>
          <h4>3D Art Director</h4>
          <div className="finfo">
            He produced characters and accessories for animation, games,
            series/movies. An unrivaled designer. WEB 3.0 enthusiast.
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/bazingacall"
          >
            <TwitterLogo className="fill-white" />
          </a>
        </div>
      </div>
      <div className="bg-grad2 flex h100 w100">
        <div className="team-member flex-col fstandard h100 ">
          <Parallax speed={5} translateY={[15, -15]} className="bg-grad2 w100">
            <img src={TeamMember4} />
          </Parallax>
          <h2>0xOliver</h2>
          <h4>Blockchain Developer</h4>
          <div className="finfo">
            A Developer who specializes in Blockchain. He is an expert who gains
            his expertise from the projects he has worked on before.
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/0xOliveer"
          >
            <TwitterLogo className="fill-white" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Team;
