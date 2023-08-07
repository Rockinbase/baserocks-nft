import { Parallax } from "react-scroll-parallax";
import TeamMember1 from "../assets/team-member-1.png";
import TeamMember2 from "../assets/team-member-2.png";
const Team = () => {
  return (
    <div className="team-container flex jc-center">
      <div className="bg-grad2 flex  w100">
        <div className="team-member flex-col   fstandard h100 w100">
          <Parallax speed={5} translateY={[15, -15]} className="bg-grad2  w100">
            <img src={TeamMember1} />
          </Parallax>
          <h2>BEACON AKHENATON</h2>
          <h4>Community Head</h4>
          <div className="finfo">
            A web 3.0 expert and consultant. Project manager for over 10 years.
            A passionate investor.
          </div>
        </div>
      </div>
      <div className="bg-grad2 flex w100">
        <div className="team-member flex-col  fstandard h100 w100">
          <Parallax
            speed={5}
            translateY={[15, -15]}
            className="bg-grad2 h100 w100"
          >
            <img src={TeamMember2} />
          </Parallax>
          <h2>HOLY-GHOST</h2>
          <h4>Head of Operations</h4>
          <div className="finfo">
            He has worked as an art director in various TV Series/Film projects,
            and he has led many projects in WEB 3.0 technology.
          </div>
        </div>
      </div>
      <div className="bg-grad2 flex w100">
        <div className="team-member flex-col  fstandard h100 w100">
          <Parallax
            speed={5}
            translateY={[15, -15]}
            className="bg-grad2 h100 w100"
          >
            <img src={TeamMember2} />
          </Parallax>
          <h2>BAZINGA</h2>
          <h4>3D Art Director</h4>
          <div className="finfo">
            He produced characters and accessories for animation, games,
            series/movies. An unrivaled designer. WEB 3.0 enthusiast.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Team;
