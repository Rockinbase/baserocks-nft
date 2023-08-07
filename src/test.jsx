import { useAccount } from "wagmi";
import { useNetwork } from "wagmi";

const Test = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const { chain, chains } = useNetwork();

  console.log(chains);
  return <div>{address}</div>;
};
export default Test;
