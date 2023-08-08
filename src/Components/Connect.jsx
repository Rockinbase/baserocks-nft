import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, base } from "wagmi/chains";
import { Web3Button } from "@web3modal/react";
const chains = [arbitrum, mainnet, polygon, base];
const projectId = "bcce55517248db169d099e2ed726ce94";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
const Connect = () => {
  return (
    <div className="connect-container jc-center">
      <WagmiConfig config={wagmiConfig}>
        <Web3Button />
      </WagmiConfig>

      <Web3Modal
        themeVariables={{
          "--w3m-font-family":
            "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto",
          "--w3m-accent-color": "#1552f0",
        }}
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </div>
  );
};

export default Connect;
