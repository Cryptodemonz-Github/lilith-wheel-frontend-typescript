import Web3 from "web3";
import Constants from "../constants/constants";
import Wheel from "../src/contracts/Wheel.json";
import LLTH from "../src/contracts/LLTH.json";
import Spawn1 from "../src/contracts/MockDemonzv1.json";
import Spawn2 from "../src/contracts/MockDemonzv1.json";

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

export const getSpawnVersion: any = async (account: string) => {
  let tokenContractSpawn1 = await web3Socket.eth.IERC721.at(
    "0xae16529ed90fafc927d774ea7be1b95d826664e3"
  );
  let tokenContractSpawn2 = await web3Socket.eth.IERC721.at(
    "0x3148e680b34f007156e624256986d8ba59ee82ee"
  );
  let result = 0;
  for (let i = 0; i < tokenContractSpawn1.totalSupply(); i++) {
    if (account === (await tokenContractSpawn1.ownerOf(i))) {
      result = 1;
    }
  }
  for (let i = 0; i < tokenContractSpawn2.totalSupply(); i++) {
    if (account === (await tokenContractSpawn2.ownerOf(i))) {
      return 2;
    }
  }
  return result;
};

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
