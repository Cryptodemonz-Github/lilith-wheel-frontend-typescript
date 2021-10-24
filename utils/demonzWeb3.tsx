import Web3 from "web3";
import Constants from "../constants/constants";
import Wheel from "../src/contracts/Wheel.json";
import LLTH from "../src/contracts/LLTH.json";

declare let window: any;
declare let ethereum: any;

/*
if (typeof window !== "undefined") {
    web3 = new Web3(window.ethereum);
  }*/

export const web3Socket: any = new Web3(
  new Web3.providers.WebsocketProvider(Constants.WEBSOCKET_ADDRESS)
);

export const contractWheelWS: any = new web3Socket.eth.Contract(
  Wheel.abi,
  Constants.GAME_ADDRESS
);

export const contractLLTHWS: any = new web3Socket.eth.Contract(
  LLTH.abi,
  Constants.TOKEN_ADDRESS
);

export const send = async (web3: any, account: any, transaction: any) => {
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
};
