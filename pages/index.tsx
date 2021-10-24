import { Box } from "grommet";
import { grommet } from "grommet/themes";
import { Grommet, Grid, ResponsiveContext } from "grommet";
import "../styles/Home.module.css";
import { deepMerge } from "grommet/utils";
import WheelComponent from "./wheelComponent";
import styled from "styled-components";
import TxModal from "./txModal";
import UnderHeaderText from "./underHeaderText";
import BottomButtons from "./bottomButtons";
import React from "react";
import customTheme from "../constants/style";
import logo from "../styles/assets/logo.png";
import Image from "next/image";
import { AppCtx } from "../contexts/appContext";
import { DemonzWeb3Ctx } from "../contexts/demonzWeb3Context";
import { web3Socket, send } from "../utils/demonzWeb3";
import Wheel from "../src/contracts/Wheel.json";
import LLTH from "../src/contracts/LLTH.json";
import Constants from "../constants/constants";
import Web3 from "web3";
import { contractWheelWS } from "../utils/demonzWeb3";
import ResultModal from "./resultModal";

declare let window: any;
declare let ethereum: any;

interface Window {
  ethereum: any;
}

interface Props {}

interface State {
  contractWheel: any;
  contractLLTH: any;
  valueBet: number;
  multiplier: number;
  winningMultiplier: number;
  connected: boolean;
  accounts: Array<string>;
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
  currency: string;
}

class Home extends React.Component<Props, State> {
  web3: any;

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
    if (typeof window !== "undefined") {
      this.web3 = new Web3(window.ethereum);
    }
    this.state = {
      contractWheel: undefined,
      contractLLTH: undefined,
      valueBet: 0,
      multiplier: 2,
      winningMultiplier: 0,
      connected: false,
      accounts: [],
      placedBet: false,
      owner: "",
      isTxModalOpen: false,
      txStarted: false,
      isSpinning: false,
      isEnded: false,
      won: true,
      reset: false,
      rotateValue: undefined,
      requestId: "",
      startSpin: false,
      txIsDone: false,
      currency: "LLTH",
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
    this.setStartSpin = this.setStartSpin.bind(this);
    this.setTxIsDone = this.setTxIsDone.bind(this);
    this.setCurrency = this.setCurrency.bind(this);
  }

  requestAccounts = async () => {
    const accounts = await window.ethereum
      .request({
        method: "eth_accounts",
      })
      .catch((err: Error) => {
        console.error(err);
      });

    this.setState({ accounts: accounts });

    if (accounts.length > 0) this.setState({ connected: true });
    else this.setState({ connected: false });
  };

  componentDidMount() {
    this.requestAccounts();
    this.setState({
      contractWheel: new this.web3.eth.Contract(
        Wheel.abi,
        Constants.GAME_ADDRESS
      ),
      contractLLTH: new this.web3.eth.Contract(
        LLTH.abi,
        Constants.TOKEN_ADDRESS
      ),
    });
    if (web3Socket) {
      contractWheelWS.events.RequestIdIsCreated({}).on("data", (event: any) => {
        if (
          this.state.accounts[0] &&
          event.returnValues.player.toUpperCase() ===
            this.state.accounts[0].toUpperCase()
        ) {
          console.log("requestId: ", event.returnValues.requestId);
          this.setState({ requestId: event.returnValues.requestId });
        }
      });
      contractWheelWS.events.RandomIsArrived({}).on("data", (event: any) => {
        if (
          this.state.requestId &&
          event.returnValues.requestId === this.state.requestId
        ) {
          console.log("randomNumberIndex: ", event.returnValues.randomNumber);
          console.log(
            "rotateValueIndex: ",
            this.rotateValues.get(Number(event.returnValues.randomNumber))
          );
          this.setState({
            winningMultiplier: event.returnValues.randomNumber,
            rotateValue: this.rotateValues.get(
              Number(event.returnValues.randomNumber)
            ),
            isTxModalOpen: false,
          });
          if (this.state.multiplier === event.returnValues.randomNumber) {
            this.setState({ won: true });
          } else {
            this.setState({ won: false });
          }
        }
      });
    }
    if (this.state.accounts !== undefined && this.state.accounts.length > 0) {
      this.setState({ connected: true });
    } else {
      this.setState({ connected: false });
    }

    this.init();
  }

  closeRound = async () => {
    const tx = await this.state.contractWheel.methods.closeRound(
      this.state.accounts[0]
    );
    await send(web3Socket, this.state.owner, tx);
  };

  init = async () => {
    if (this.state.placedBet) {
    } else if (this.state.isSpinning) {
      await this.closeRound();
    }
  };

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

  setStartSpin(value: boolean) {
    this.setState({ startSpin: value });
  }

  setTxIsDone(value: boolean) {
    this.setState({ txIsDone: value });
  }

  setCurrency(value: any) {
    this.setState({ currency: value });
  }

  render() {
    return (
      <>
        <DemonzWeb3Ctx.Provider
          value={{
            connected: this.state.connected,
            accounts: this.state.accounts,
            contractWheel: this.state.contractWheel,
            contractLLTH: this.state.contractLLTH,
            setAccounts: this.setAccounts,
            setConnected: this.setConnected,
          }}
        >
          <AppCtx.Provider
            value={{
              valueBet: this.state.valueBet,
              multiplier: this.state.multiplier,
              winningMultiplier: this.state.winningMultiplier,
              placedBet: this.state.placedBet,
              owner: this.state.owner,
              isTxModalOpen: this.state.isTxModalOpen,
              txStarted: this.state.txStarted,
              isSpinning: this.state.isSpinning,
              isEnded: this.state.isEnded,
              won: this.state.won,
              reset: this.state.reset,
              rotateValue: this.state.rotateValue,
              requestId: this.state.requestId,
              startSpin: this.state.startSpin,
              setIsSpinning: this.setIsSpinning,
              setIsEnded: this.setIsEnded,
              setIsTxModalOpen: this.setIsTxModalOpen,
              setValueBet: this.setValueBet,
              setMultiplier: this.setMultiplier,
              setTxStarted: this.setTxStarted,
              setWinningMultiplier: this.setWinningMultiplier,
              setPlacedBet: this.setPlacedBet,
              setWon: this.setWon,
              setReset: this.setReset,
              setStartSpin: this.setStartSpin,
              txIsDone: this.state.txIsDone,
              setTxIsDone: this.setTxIsDone,
              setCurrency: this.setCurrency,
              currency: this.state.currency,
            }}
          >
            <Grommet
              theme={deepMerge(grommet, customTheme)}
              style={{
                backgroundImage: "url('background.png')",
              }}
              full
            >
              <ResponsiveContext.Consumer>
                {(size: any) => (
                  <>
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
                          <UnderHeaderText />
                        </Box>
                        <Box>
                          <WheelComponent
                            size={size}
                            reset={this.state.reset}
                          />
                        </Box>
                        <Box>
                          <BottomButtons />
                        </Box>
                      </Box>
                      <Box gridArea="right" />
                    </Grid>
                    {this.state.isTxModalOpen && <TxModal />}
                    {this.state.isEnded && <ResultModal />}
                  </>
                )}
              </ResponsiveContext.Consumer>
            </Grommet>
          </AppCtx.Provider>
        </DemonzWeb3Ctx.Provider>
      </>
    );
  }
}

export default Home;
