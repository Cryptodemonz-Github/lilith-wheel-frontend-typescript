import Web3 from "web3";
import Constants from "../constants/constants";
import Wheel from "../src/contracts/Wheel.json";
import LLTH from "../src/contracts/LLTH.json";
import Spawn1 from "../src/contracts/Demonzv1_production.json";
import Spawn2 from "../src/contracts/Demonzv2_production.json";

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

export const contractSpawn1WS: any = new web3Socket.eth.Contract(
  Spawn1,
  Constants.SPAWN1_ADDRESS
);

export const contractSpawn2WS: any = new web3Socket.eth.Contract(
  Spawn2,
  Constants.SPAWN2_ADDRESS
);

export const getSpawnVersion: any = async (account: any) => {
  // 0 - Non-holder, 1 - Spawn1, 2 - Spawn2
  const spawnV1Cnt = await contractSpawn1WS.methods
    .balanceOf("0x4854Ebc0E6a0e81555d220f2Fc1FD4cc775397D9")
    .call();
  console.log("spawnV1Cnt", spawnV1Cnt);
  const spawnV2Cnt = await contractSpawn2WS.methods
    .balanceOf("0x4854Ebc0E6a0e81555d220f2Fc1FD4cc775397D9")
    .call();
  //console.log("spawnV1Cnt", spawnV1Cnt);

  if (spawnV1Cnt > 0 && spawnV2Cnt > 0) return 2;
  else if (spawnV1Cnt > 0 && spawnV2Cnt === 0) return 1;
  else if (spawnV1Cnt === 0 && spawnV2Cnt > 0) return 2;
  else return 0;
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
