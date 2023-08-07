import "./index.css";
import Plexus from "./assets/bg-plexus.webp";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Roadmap from "./Components/Roadmap";
import Team from "./Components/Team";
import Partners from "./Components/Partners";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Header />
      <ParallaxProvider>
        <div className="app-container">
          <Hero />
          <Roadmap />
          <Team />
        </div>

        <Partners />
      </ParallaxProvider>
      <Footer />
    </>
  );
}

export default App;
