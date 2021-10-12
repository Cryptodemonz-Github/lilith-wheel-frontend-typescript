import { Box, GridSizeType } from "grommet";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { grommet } from "grommet/themes";
import { Grommet, Grid, ResponsiveContext } from "grommet";
import "../styles/Home.module.css";
import { deepMerge } from "grommet/utils";
import Web3 from "web3";
import Wheel from "../src/contracts/Wheel.json";
import WheelComponent from "./wheelComponent";
import styled, { css } from "styled-components";
import TxModal from "./txModal";
import UnderHeaderText from "./underHeaderText";
import BottomButtons from "./bottomButtons";
import ResultModal from "./resultModal";
import React from "react";
import customTheme from "../constants/style";
import Constants from "../constants/constants";
import logo from "../styles/assets/logo.png";
import Image from "next/image";
import wheelImg from "../styles/assets/wheel.png";

declare let window: any;
declare let ethereum: any;

interface Window {
  ethereum: any;
}

interface Props {}

interface State {
  valueBet: number;
  multiplier: number;
  winningMultiplier: number;
  connected: boolean;
  accounts: Array<string>;
  contract: any;
  token: any;
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
}

class Home extends React.Component<Props, State> {
  web3: any;
  web3Socket: any = new Web3(
    new Web3.providers.WebsocketProvider(Constants.WEBSOCKET_ADDRESS)
  );
  contracWeb3Socket: any = new this.web3Socket.eth.Contract(
    Wheel.abi,
    Constants.GAME_ADDRESS
  );
  rotateValues = new Map([
    [2, 4700], // segment: rotation
    [3, 3950],
    [4, 3550],
    [5, 4250],
    [6, 3500],
    [7, 3820],
    [8, 3800],
    [9, 3400],
    [10, 4100],
    [11, 3700],
    [12, 4400],
    [13, 3650],
  ]);

  constructor(props: Props) {
    super(props);
    this.state = {
      valueBet: 0,
      multiplier: 2,
      winningMultiplier: 0,
      connected: false,
      accounts: [],
      contract: undefined,
      token: undefined,
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
    };
    this.setIsSpinning = this.setIsSpinning.bind(this);
    this.setIsEnded = this.setIsEnded.bind(this);
    this.setAccounts = this.setAccounts.bind(this);
    this.setIsTxModalOpen = this.setIsTxModalOpen.bind(this);
    this.setValueBet = this.setValueBet.bind(this);
    this.setMultiplier = this.setMultiplier.bind(this);
    this.setConnected = this.setConnected.bind(this);
    this.setTxStarted = this.setTxStarted.bind(this);
    this.setWinningMultiplier = this.setWinningMultiplier.bind(this);
    this.setPlacedBet = this.setPlacedBet.bind(this);
    this.setWon = this.setWon.bind(this);
    this.setReset = this.setReset.bind(this);
  }

  componentDidMount() {
    this.requestMetaMask();

    if (this.web3Socket) {
      this.contracWeb3Socket.events
        .RequestIdIsCreated({})
        .on("data", (event: any) => {
          if (
            this.state.accounts[0] &&
            event.returnValues.player.toUpperCase() ===
              this.state.accounts[0].toUpperCase()
          ) {
            this.setState({ requestId: event.returnValues.requestId });
          }
        });
      this.contracWeb3Socket.events
        .RandomIsArrived({})
        .on("data", (event: any) => {
          if (
            this.state.requestId &&
            event.returnValues.requestId === this.state.requestId
          ) {
            this.setState({
              winningMultiplier: event.returnValues.randomNumber,
            });
          }
        });
    }
    if (this.state.accounts !== undefined && this.state.accounts.length > 0) {
      this.setState({ connected: true });
    } else {
      this.setState({ connected: false });
    }

    this.init();

    if (this.state.winningMultiplier) {
      this.setState({
        rotateValue: this.rotateValues.get(this.state.winningMultiplier),
      });
      if (this.state.multiplier === this.state.winningMultiplier) {
        this.setState({ won: true });
      } else {
        this.setState({ won: false });
      }
    }

    if (this.state.rotateValue) {
      this.setState({ txStarted: false });
      this.setState({ isTxModalOpen: false });
    }
  }

  placeBet = async () => {
    this.setState({ txStarted: true });

    if (
      (await this.state.token.methods
        .allowance(this.state.accounts[0], Constants.GAME_ADDRESS)
        .call()) <
      this.web3.utils.toWei(this.state.valueBet.toString(), "ether")
    ) {
      await this.state.token.methods
        .approve(
          Constants.GAME_ADDRESS,
          this.web3.utils.toWei(this.web3.utils.toBN(100000000000), "ether")
        )
        .send({ from: this.state.accounts[0], gas: 3000000 });
    }
    await this.state.contract.methods
      .placeBet(
        this.web3.utils.toWei(this.state.valueBet.toString(), "ether"),
        this.state.multiplier
      )
      .send({ from: this.state.accounts[0], gas: 3000000 });

    this.setState({ placedBet: true });
  };

  closeRound = async () => {
    const tx = await this.state.contract.methods.closeRound(
      this.state.accounts[0]
    );
    await this.send(this.web3, this.state.owner, tx);
  };
  init = async () => {
    if (this.state.placedBet) {
    } else if (this.state.isSpinning) {
      await this.closeRound();
    }
  };

  async requestMetaMask() {
    const accounts = await window.ethereum
      .request({
        method: "eth_accounts",
      })
      .catch((err: Error) => {
        console.error(err);
      });
    this.setState({ accounts: accounts });
  }

  async send(web3: any, account: any, transaction: any) {
    const options = {
      to: transaction._parent._address,
      data: transaction.encodeABI(),
      gas: 3000000,
    };
    const signed = await web3.eth.accounts.signTransaction(
      options,
      account.privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    return receipt;
  }

  setIsSpinning(value: boolean) {
    this.setState({ isSpinning: value });
  }

  setIsEnded(value: boolean) {
    this.setState({ isEnded: value });
  }

  setAccounts(accounts: Array<string>) {
    this.setState({ accounts: accounts });
  }

  setIsTxModalOpen(value: boolean) {
    this.setState({ isTxModalOpen: value });
  }

  setValueBet(value: number) {
    this.setState({ valueBet: value });
  }

  setMultiplier(value: number) {
    this.setState({ multiplier: value });
  }

  setConnected(value: boolean) {
    this.setState({ connected: value });
  }

  setTxStarted(value: boolean) {
    this.setState({ txStarted: value });
  }

  setWinningMultiplier(value: number) {
    this.setState({ winningMultiplier: value });
  }
  setPlacedBet(value: boolean) {
    this.setState({ placedBet: value });
  }

  setWon(value: boolean) {
    this.setState({ won: value });
  }

  setReset(value: boolean) {
    this.setState({ reset: value });
  }

  render() {
    return (
      <>
        <Grommet style={{ backgroundImage: "url('background.png')" }} full>
          <ResponsiveContext.Consumer>
            {(size: any) => (
              <Grid
                fill={true}
                pad="medium"
                rows={["full"]}
                columns={["auto", "flex", "auto"]}
                gap="small"
                areas={[
                  { name: "left", start: [0, 0], end: [0, 0] },
                  { name: "center", start: [1, 0], end: [1, 0] },
                  { name: "right", start: [2, 0], end: [2, 0] },
                ]}
              >
                <Box gridArea="left" />
                <Box
                  className="mainBox"
                  direction="column"
                  align="center"
                  justify="center"
                  alignSelf="center"
                  gridArea="center"
                  gap="medium"
                >
                  <Box>
                    <Image src={logo} />
                  </Box>
                  <Box>
                    <UnderHeaderText
                      connected={this.state.connected}
                      placedBet={this.state.placedBet}
                      valueBet={this.state.valueBet}
                      multiplier={this.state.multiplier}
                    />
                  </Box>
                  <Box>
                    <WheelComponent
                      size={size}
                      key={this.state.reset}
                      isSpinning={this.state.isSpinning}
                      setIsSpinning={this.setIsSpinning}
                      setIsEnded={this.setIsEnded}
                      winningMultiplier={this.state.winningMultiplier}
                      rotateValue={this.state.rotateValue}
                    />
                  </Box>
                  <Box>
                    <BottomButtons
                      placedBet={this.state.placedBet}
                      connected={this.state.connected}
                      setAccounts={this.setAccounts}
                      setIsSpinning={this.setIsSpinning}
                      setIsTxModalOpen={this.setIsTxModalOpen}
                      isSpinning={this.state.isSpinning}
                      isEnded={this.state.isEnded}
                    />
                  </Box>
                </Box>
                <Box gridArea="right" />
              </Grid>
            )}
          </ResponsiveContext.Consumer>
        </Grommet>
      </>
    );
  }
}

const Container = styled.div``;

export default Home;
