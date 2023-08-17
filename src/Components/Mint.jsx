import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
import { useAccount } from "wagmi";

import { useState, useEffect } from "react";

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

  const { config } = usePrepareContractWrite({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: AppConfig.activeFunctionName,
    args: [[...proof], 1],
    value: price,
    onError(error) {
      //   if (proof.length == 0) return;
      //   console.log("Error", error);
      setError(error.message);
    },
  });
  //   console.log("mesage->", error);
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const renderMintButton = () => {
    if (!mintingStatus) {
      return (
        <button disabled={true} className="mint-button">
          Soon !
        </button>
      );
    }
    if (isLoading || isMintingStatusLoading) {
      return (
        <button disabled={true} className="mint-button">
          <LoadingIcon />
        </button>
      );
    }
    if (!proof) {
      return (
        <button disabled={true} className="mint-button">
          {` Not ${AppConfig.activeMintingClass}`}
        </button>
      );
    } else {
      return (
        <button onClick={() => write?.()} className="mint-button">
          Mint
        </button>
      );
    }
  };

  //   useEffect(() => {}), [isLoading];

  return <>{renderMintButton()}</>;
};

export default Mint;
