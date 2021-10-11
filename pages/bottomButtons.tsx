import React from "react";
import "../styles/Home.module.css";
import { Button, Text, Box } from "grommet";
import Constants from "../constants/constants";
import Image from "next/image";
import designedConnectButton from "../styles/assets/connect_button.png";
declare let window: any;
declare let ethereum: any;

interface Window {
  ethereum: any;
}

interface Props {
  placedBet: boolean;
  connected: boolean;
  setAccounts: (accounts: Array<string>) => void;
  setIsSpinning: (value: boolean) => void;
  setIsTxModalOpen: (value: boolean) => void;
  isSpinning: boolean;
  isEnded: boolean;
}

class BottomButtons extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  async connectMetaMask() {
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
      this.props.setAccounts(accounts);
    } else {
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
      return 0;
    }
  }

  render() {
    return (
      <>
        {this.props.placedBet ? (
          <>
            {!this.props.isSpinning && !this.props.isEnded ? (
              <Box animation="pulse">
                <Button
                  alignSelf="center"
                  secondary
                  type="submit"
                  label={
                    <Text textAlign="center" size="xlarge" color="#fff">
                      SPIN
                    </Text>
                  }
                  color="#9933FF"
                  onClick={() => this.props.setIsSpinning(true)}
                />
              </Box>
            ) : (
              <Button
                alignSelf="center"
                secondary
                type="submit"
                label={
                  <Text textAlign="center" size="xlarge" color="#fff">
                    SPIN
                  </Text>
                }
                color="#9933FF"
                onClick={() => this.props.setIsSpinning(true)}
              />
            )}
          </>
        ) : (
          <>
            {this.props.connected ? (
              <Button
                alignSelf="center"
                secondary
                type="submit"
                label={
                  <Text textAlign="center" size="xlarge" color="#fff">
                    START
                  </Text>
                }
                color="#9933FF"
                onClick={() => this.props.setIsTxModalOpen(true)}
              />
            ) : (
              <Image
                src={designedConnectButton}
                height={80}
                onClick={() => this.connectMetaMask()}
              />
            )}
          </>
        )}
      </>
    );
  }
}

export default BottomButtons;
