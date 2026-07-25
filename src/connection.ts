import type { Provider } from "@ethersproject/abstract-provider";
import { Networkish, getNetwork } from "@ethersproject/networks";
import { InfuraProvider, JsonRpcProvider } from "@ethersproject/providers";

import { AlchemyProvider } from "./AlchemyProvider";
import { BatchedProvider } from "./BatchedProvider";
import { PUBLIC_NODE_URLS } from "./constants";

export interface LiquityConnectionOptions {
  provider?: "publicnode" | "alchemy" | "infura"; // defaults to Alchemy
  alchemyApiKey?: string;
  infuraApiKey?: string;
}

export const getProvider = (
  networkish: Networkish,
  options?: LiquityConnectionOptions
): Provider => {
  const network = getNetwork(networkish);
  const underlyingProvider =
    options?.provider === "infura"
      ? new InfuraProvider(network, options?.infuraApiKey)
      : options?.provider === "alchemy"
      ? new AlchemyProvider(network, options?.alchemyApiKey)
      : new JsonRpcProvider(PUBLIC_NODE_URLS[network.chainId as keyof typeof PUBLIC_NODE_URLS]);

  return new BatchedProvider(underlyingProvider, network);
};
