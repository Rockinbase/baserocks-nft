import { useEffect } from "react";
import { useAccount, useNetwork, useContractRead } from "wagmi";

import Connect from "./Connect";
import ChangeChains from "./ChangeChains";
import Mint from "./Mint";

import AppConfig from "../../config.json";

import { ReactComponent as LoadingIcon } from "../assets/Icons/loading-icon.svg";

const MintBox = () => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { chain } = useNetwork();
  // Get Total Supply
  const {
    data: totalSupply,
    isError: isTotalSupplyError,
    isLoading: isTotalSupplyLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `totalSupply`,
    watch: true,
  });

  const renderChangeChains = () => {
    return <ChangeChains />;
  };

  const renderMint = () => {
    return <Mint />;
  };

  const renderConnectWallet = () => {
    return <Connect />;
  };

  const renderResult = () => {
    if (!isConnected) return <>{renderConnectWallet()}</>;
    if (chain.id !== AppConfig.preferredChainId)
      return <>{renderChangeChains()}</>;
    return <>{renderMint()}</>;
  };

  return (
    <>
      {renderResult()}

      {isConnected ? (
        isTotalSupplyLoading || isTotalSupplyError ? (
          <>
            <LoadingIcon className="icon-white" />
          </>
        ) : (
          <div className="fbig">{`${totalSupply} / 1000 Rocks Minted !`}</div>
        )
      ) : (
        <div className="fbig ">Connect Your Wallet to Mint Your Rock !</div>
      )}
    </>
  );
};

export default MintBox;
