import { useNetwork, useSwitchNetwork } from "wagmi";

import { ReactComponent as LoadingIcon } from "../assets/Icons/loading-icon.svg";

import config from "../../config.json";

const ChangeChains = () => {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  const changeChain = () => {
    if (chain?.id !== config.preferredChainId && chain) {
      switchNetwork(config.preferredChainId);
    }
  };

  return (
    <>
      {isLoading ? (
        <button disabled={true} className="mint-button">
          <LoadingIcon />
        </button>
      ) : (
        <button className="mint-button" onClick={() => changeChain()}>
          Switch To Base
        </button>
      )}
    </>
  );
};

export default ChangeChains;
