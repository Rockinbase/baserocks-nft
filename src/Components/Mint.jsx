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
  const [proofOg, setProofOg] = useState("");
  const [proofWl, setProofWl] = useState("");
  const [error, setError] = useState("");

  const [mintCount, setMintCount] = useState(1);

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  const firebaseOg = (address) => {
    const db = getDatabase();

    const reference = ref(db, `/ogProofs/${address}`);
    onValue(reference, (snapshot) => {
      const data = snapshot.val();

      if (data) setProofOg(data);
    });
  };
  const firebaseWl = (address) => {
    const db = getDatabase();

    const reference = ref(db, `/whitelistProofs/${address}`);
    onValue(reference, (snapshot) => {
      const data = snapshot.val();

      if (data) setProofWl(data);
    });
  };
  //   track address change and get proofs
  useEffect(() => {
    firebaseOg(address);
    firebaseWl(address);
  }, [address]);

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

  //   Read If wl minting active
  const {
    data: mintingStatusWl,
    isError: isWlMintingStatusError,
    isLoading: isWlMintingStatusLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `whitelistEnabled`,
    watch: true,
  });
  //   Read If og minting active
  const {
    data: mintingStatusOg,
    isError: isOgMintingStatusError,
    isLoading: isOgMintingStatusLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `ogEnabled`,
    watch: true,
  });
  //   Read If public minting active
  const {
    data: mintingStatusPublic,
    isError: isPublicMintingStatusError,
    isLoading: isPublicMintingStatusLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `publicEnabled`,
    watch: true,
  });
  // max Per Wl user
  const {
    data: maxPerWl,
    isError: isMaxPerWlError,
    isLoading: isMaxPerWlLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `maxPerWl`,
  });

  // max Per OG user
  const {
    data: maxPerOg,
    isError: isMaxPerOgError,
    isLoading: isMaxPerOgLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `maxPerOg`,
  });
  // max Per pub user
  const {
    data: maxPerPublic,
    isError: isMaxPerPublicError,
    isLoading: isMaxPerPublicLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `maxPerPublic`,
  });

  //   Read Mint Price wl
  const {
    data: priceWl,
    isError: isPriceWlError,
    isLoading: isPriceWlLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `whitelistPrice`,
  });
  //   read mint price OG
  const {
    data: priceOg,
    isError: isPriceOgError,
    isLoading: isPriceOgLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `ogPrice`,
  });
  //   read mint price PUBLIC
  const {
    data: pricePublic,
    isError: isPricePublicError,
    isLoading: isPricePublicLoading,
  } = useContractRead({
    address: AppConfig.contractAddress,
    abi: AppConfig.abi,
    functionName: `publicPrice`,
  });

  // -------------------------------------------------
  // minting tx OG
  const ogMint = () => {
    const { config: config } = usePrepareContractWrite({
      address: AppConfig.contractAddress,
      abi: AppConfig.abi,
      functionName: "ogMint",
      args: [[...proofOg], mintCount],
      value: BigInt(isPriceOgLoading ? 0 : priceOg) * BigInt(mintCount),
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

    if (!mintingStatusOg) {
      return (
        <button disabled={true} className="mint-button">
          Soon !
        </button>
      );
    }
    if (
      isLoading ||
      isOgMintingStatusLoading ||
      isPriceOgLoading ||
      isWaitTxLoading
    ) {
      return (
        <button disabled={true} className="mint-button">
          <LoadingIcon />
        </button>
      );
    }
    if (!proofOg) {
      return (
        <button disabled={true} className="mint-button">
          {` Not OG`}
        </button>
      );
    } else {
      return (
        <>
          <button onClick={() => write?.()} className="mint-button">
            Mint
          </button>
          <div className="error-box fstandard">
            {error ? `${cutString(error)}` : ""}
            {watchTx?.status == "reverted"
              ? "⚠️ Error While Minting !"
              : ""}{" "}
            {isSuccess ? ` Transaction Succesful !` : ""}
          </div>
        </>
      );
    }
  };

  const whitelistMint = () => {
    const { config: config } = usePrepareContractWrite({
      address: AppConfig.contractAddress,
      abi: AppConfig.abi,
      functionName: "whitelistMint",
      args: [[...proofWl], mintCount],
      value: BigInt(isPriceWlLoading ? 0 : priceWl) * BigInt(mintCount),
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

    if (!mintingStatusWl) {
      return (
        <button disabled={true} className="mint-button">
          Soon !
        </button>
      );
    }
    if (
      isLoading ||
      isWlMintingStatusLoading ||
      isPriceWlLoading ||
      isWaitTxLoading
    ) {
      return (
        <button disabled={true} className="mint-button">
          <LoadingIcon />
        </button>
      );
    }
    if (!proofWl) {
      return (
        <button disabled={true} className="mint-button">
          {` Not WL`}
        </button>
      );
    } else {
      return (
        <>
          <button onClick={() => write?.()} className="mint-button">
            Mint
          </button>
          <div className="error-box fstandard">
            {error ? `${cutString(error)}` : ""}
            {watchTx?.status == "reverted"
              ? "⚠️ Error While Minting !"
              : ""}{" "}
            {isSuccess ? ` Transaction Succesful !` : ""}
          </div>
        </>
      );
    }
  };

  // PUBLIC MINT TX
  const publicMint = () => {
    const { config: config } = usePrepareContractWrite({
      address: AppConfig.contractAddress,
      abi: AppConfig.abi,
      functionName: "publicMint",
      args: [mintCount],
      value: BigInt(isPricePublicLoading ? 0 : pricePublic) * BigInt(mintCount),
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

    if (!mintingStatusPublic) {
      return (
        <button disabled={true} className="mint-button">
          Soon !
        </button>
      );
    }
    if (
      isLoading ||
      isPublicMintingStatusLoading ||
      isPricePublicLoading ||
      isWaitTxLoading
    ) {
      return (
        <button disabled={true} className="mint-button">
          <LoadingIcon />
        </button>
      );
    } else {
      return (
        <>
          <button onClick={() => write?.()} className="mint-button">
            Mint
          </button>
          <div className="error-box fstandard">
            {error ? `${cutString(error)}` : ""}
            {watchTx?.status == "reverted"
              ? "⚠️ Error While Minting !"
              : ""}{" "}
            {isSuccess ? ` Transaction Succesful !` : ""}
          </div>
        </>
      );
    }
  };

  const handleMintCount = (newMintCount) => {
    const max = proofOg ? maxPerOg : proofWl ? maxPerWl : 100;

    if (newMintCount > 0 && newMintCount <= max) {
      setMintCount(newMintCount);
    }
  };

  return (
    <>
      {mintingStatusPublic ? (
        <>{publicMint()}</>
      ) : proofOg ? (
        <>{ogMint()}</>
      ) : proofWl ? (
        <>{whitelistMint()}</>
      ) : (
        <>{publicMint()}</>
      )}
      <div
        className="flex mint-button-container
      "
      >
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
      {mintingStatusPublic ? (
        ""
      ) : proofOg || proofWl ? (
        <div className="color-green">{`You are ${
          proofOg ? "OG" : proofWl ? "Whitelisted" : "Not whitelisted or OG :/"
        }`}</div>
      ) : (
        ""
      )}
    </>
  );
};

export default Mint;
