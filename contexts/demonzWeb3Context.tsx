import { createContext } from "react";

interface DemonzWeb3Interface {
  accounts: Array<string>;
  connected: boolean;
  contractWheel: any;
  contractLLTH: any;
  setAccounts: (accounts: Array<string>) => void;
  setConnected: (connected: boolean) => void;
  spawn: number;
}

export const DemonzWeb3Ctx = createContext<DemonzWeb3Interface>({
  accounts: [],
  connected: false,
  contractWheel: undefined,
  contractLLTH: undefined,
  setAccounts: () => undefined,
  setConnected: () => undefined,
  spawn: 0,
});
