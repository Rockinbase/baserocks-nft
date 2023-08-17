import "./index.css";
import Plexus from "./assets/bg-plexus.webp";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Roadmap from "./Components/Roadmap";
import Team from "./Components/Team";
import Partners from "./Components/Partners";
import Gallery from "./Components/Gallery";
import Footer from "./Components/Footer";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base, baseGoerli } from "wagmi/chains";

function App() {
  const chains = [base, baseGoerli];
  const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
  console.log(projectId);
  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Header />
        <ParallaxProvider>
          <div className="app-container">
            <Hero />
            <Gallery />
            <Roadmap />
            <Team />
          </div>

          <Partners />
          <Footer />
        </ParallaxProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
