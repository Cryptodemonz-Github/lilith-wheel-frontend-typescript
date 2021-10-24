import React, { useContext, useEffect } from "react";
import "../styles/Home.module.css";
import { Button, Text, Box } from "grommet";
import Constants from "../constants/constants";
import Image from "next/image";

import { AppCtx } from "../contexts/appContext";
import { DemonzWeb3Ctx } from "../contexts/demonzWeb3Context";

import { ConnectButton, SpinButton } from "../demonzUIKit/elements";

declare let window: any;
declare let ethereum: any;

interface Window {
  ethereum: any;
}

function BottomButtons() {
  const {
    placedBet,
    isSpinning,
    isEnded,
    setIsTxModalOpen,
    setStartSpin,
    startSpin,
  } = useContext(AppCtx);
  const { connected, setAccounts, setConnected } = useContext(DemonzWeb3Ctx);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Constants.CHAIN_ID }],
        });
      } catch (error) {
        console.error(error);
      }
      setAccounts(accounts);
      setConnected(true);
    } else {
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
      return 0;
    }
  };

  return (
    <>
      {placedBet ? (
        <>
          {!startSpin /* && !isEnded */ ? (
            <SpinButton height="80px" onClick={() => setStartSpin(true)} />
          ) : (
            <SpinButton height="80px" />
          )}
        </>
      ) : (
        <>
          {connected ? (
            <>
              <SpinButton
                height="80px"
                onClick={() => setIsTxModalOpen(true)}
              />
            </>
          ) : (
            <ConnectButton height="80px" onClick={connectMetaMask} />
          )}
        </>
      )}
    </>
  );
}

export default BottomButtons;
