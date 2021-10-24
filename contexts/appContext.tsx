import { createContext } from "react";

interface AppContextInterface {
  valueBet: number;
  multiplier: number;
  winningMultiplier: number;

  placedBet: boolean;
  owner: string;
  isTxModalOpen: boolean;
  txStarted: boolean;
  isSpinning: boolean;
  isEnded: boolean;
  won: boolean;
  reset: boolean;
  rotateValue: any;
  requestId: string;
  startSpin: boolean;
  txIsDone: boolean;
  currency: any;
  setTxIsDone: (value: boolean) => void;
  setIsSpinning: (value: boolean) => void;
  setIsEnded: (value: boolean) => void;

  setIsTxModalOpen: (value: boolean) => void;
  setValueBet: (value: number) => void;
  setMultiplier: (value: number) => void;

  setTxStarted: (value: boolean) => void;
  setWinningMultiplier: (value: number) => void;
  setPlacedBet: (value: boolean) => void;
  setWon: (value: boolean) => void;
  setReset: (value: boolean) => void;
  setStartSpin: (value: boolean) => void;
  setCurrency: (value: any) => void;
}

export const AppCtx = createContext<AppContextInterface>({
  valueBet: 0,
  multiplier: 2,
  winningMultiplier: 0,

  placedBet: false,
  owner: "",
  isTxModalOpen: false,
  txStarted: false,
  isSpinning: false,
  isEnded: false,
  won: false,
  reset: false,
  rotateValue: undefined,
  requestId: "",
  startSpin: false,
  txIsDone: false,
  currency: undefined,
  setCurrency: () => undefined,
  setTxIsDone: () => undefined,
  setIsSpinning: () => undefined,
  setIsEnded: () => undefined,
  setIsTxModalOpen: () => undefined,
  setValueBet: () => undefined,
  setMultiplier: () => undefined,
  setTxStarted: () => undefined,
  setWinningMultiplier: () => undefined,
  setPlacedBet: () => undefined,
  setWon: () => undefined,
  setReset: () => undefined,
  setStartSpin: () => undefined,
});
