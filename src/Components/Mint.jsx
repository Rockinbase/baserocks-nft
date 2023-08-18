import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useWaitForTransaction,
  useAccount,
} from "wagmi";

import { useState, useEffect, useRef } from "react";

import AppConfig from "../../config.json";

import { ReactComponent as LoadingIcon } from "../assets/Icons/loading-icon.svg";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "baserock-e46d1.firebaseapp.com",
  databaseURL:
    "https://baserock-e46d1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "baserock-e46d1",
  storageBucket: "baserock-e46d1.appspot.com",
  messagingSenderId: "927958596039",
  appId: "1:927958596039:web:d49ca0a33dd533fa7101e2",
  measurementId: "G-5ZD4ENPXYL",
};
const app = initializeApp(firebaseConfig);

const Mint = () => {
  const [proof, setProof] = useState("");
  const [error, setError] = useState("");
  const [mintCount, setMintCount] = useState(1);

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  const firebase = (address) => {
    const db = getDatabase();

    const reference = ref(
      db,
      `/${AppConfig.activeMintingClass}Proofs/${address}`
    );
    onValue(reference, (snapshot) => {
      const data = snapshot.val();

      if (data) setProof(data);
    });
  };

  //   track address change and get proofs
  useEffect(() => {
    firebase(address);
  }, [address]);

  //   Read If minting active
  const {
    data: mintingStatus,
    isError: isMintingStatusError,
    isLoading: isMintingStatusLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `${AppConfig.activeMintingClass}Enabled`,
    watch: true,
  });
  const {
    data: maxPerClass,
    isError: isMaxPerClassError,
    isLoading: isMaxPerClassLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `maxPer${
      AppConfig.activeMintingClass == "whitelist"
        ? "Wl"
        : AppConfig.activeMintingClass.charAt(0).toUpperCase() +
          AppConfig.activeMintingClass.slice(1)
    }`,
  });

  //   Read Mint Price
  const {
    data: price,
    isError: isPriceError,
    isLoading: isPriceLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `${AppConfig.activeMintingClass}Price`,
  });

  // minting tx
  const { config } = usePrepareContractWrite({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: AppConfig.activeFunctionName,
    args:
      AppConfig.activeMintingClass == "public"
        ? [mintCount]
        : [[...proof], mintCount],
    value: BigInt(isPriceLoading ? "" : price) * BigInt(mintCount),
    onError(error) {
      setError(error.message);
    },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  // Track tx
  const {
    data: watchTx,
    isError: isWaitTxError,
    isLoading: isWaitTxLoading,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  //   Cut error message string
  function cutString(inputString) {
    const dotIndex = inputString.indexOf(".");
    const regex =
      /The contract function "[^"]+" reverted with the following reason:\n(.*?)\n/;
    const match = inputString.match(regex);
    if (match && match[1]) {
      const extractedString = match[1];
      return extractedString;
    }
    if (dotIndex !== -1) {
      return inputString.substring(0, dotIndex);
    } else {
      return inputString;
    }
  }
  const renderMintButton = () => {
    if (!mintingStatus) {
      return (
        <button disabled={true} className="mint-button">
          Soon !
        </button>
      );
    }
    if (
      isLoading ||
      isMintingStatusLoading ||
      isPriceLoading ||
      isWaitTxLoading
    ) {
      return (
        <button disabled={true} className="mint-button">
          <LoadingIcon />
        </button>
      );
    }
    if (!proof && AppConfig.activeMintingClass != "public") {
      return (
        <button disabled={true} className="mint-button">
          {` Not ${AppConfig.activeMintingClass.toUpperCase()}`}
        </button>
      );
    } else {
      return (
        <>
          <button onClick={() => write?.()} className="mint-button">
            Mint
          </button>
        </>
      );
    }
  };

  //   useEffect(() => {}), [isLoading];
  const handleMintCount = (newMintCount) => {
    if (newMintCount > 0 && newMintCount <= maxPerClass) {
      setMintCount(newMintCount);
    }
  };

  return (
    <>
      <div
        className="flex mint-button-container
    "
      >
        {renderMintButton()}
        <button
          onClick={() => handleMintCount(mintCount + 1)}
          className="counter-button"
        >
          +
        </button>
        <div className="fstandard jc-center">{mintCount}</div>
        <button
          onClick={() => handleMintCount(mintCount - 1)}
          className="counter-button"
        >
          -
        </button>
      </div>
      {proof ? (
        <div className="color-green">{`You are the ${AppConfig.activeMintingClass.toUpperCase()}`}</div>
      ) : (
        <div className="color-red">{`You are not on ${AppConfig.activeMintingClass.toUpperCase()} :/`}</div>
      )}
      <div className="error-box fstandard">
        <span className="color-red">⚠️</span>
        {error ? `${cutString(error)}` : ""}
        {watchTx?.status == "reverted" ? "⚠️ Error While Minting !" : ""}{" "}
        {isSuccess ? ` Transaction Succesful !` : ""}
      </div>
    </>
  );
};

export default Mint;
