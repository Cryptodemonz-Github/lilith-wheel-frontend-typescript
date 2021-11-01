import {
  Box,
  RangeInput,
  TextInput,
  FormField,
  Text,
  Heading,
  CheckBox,
} from "grommet";
import React, { useContext, useEffect, useState } from "react";
import "../styles/Home.module.css";
import { SpinButton } from "../demonzUIKit/elements";
import { AppCtx } from "../contexts/appContext";
import { DemonzWeb3Ctx } from "../contexts/demonzWeb3Context";
import Constants from "../constants/constants";
import { web3Socket } from "../utils/demonzWeb3";

function PlaceBet(props: any) {
  const {
    setValueBet,
    valueBet,
    setMultiplier,
    multiplier,
    setTxStarted,
    setPlacedBet,
    setTxIsDone,
    setCurrency,
    currency,
  } = useContext(AppCtx);
  const { accounts, contractWheel, contractLLTH } = useContext(DemonzWeb3Ctx);
  const [checkedETH, setCheckedETH] = useState(false);
  const [checkedLLTH, setCheckedLLTH] = useState(true);

  const suggestionsBetLLTH: Array<string> = [
    "1k LLTH",
    "10k LLTH",
    "100k LLTH",
  ];

  const onSuggestionSelectBetLLTH = (event: any) => {
    switch (event.suggestion) {
      case "1k LLTH":
        setValueBet(1000);
        break;
      case "10k LLTH":
        setValueBet(10000);
        break;
      case "100k LLTH":
        setValueBet(100000);
        break;
      default:
        setValueBet(Number(""));
    }
  };

  const placeBet = async () => {
    setTxStarted(true);

    if (
      (await contractLLTH.methods
        .allowance(accounts[0], Constants.GAME_ADDRESS)
        .call()) < web3Socket.utils.toWei(valueBet.toString(), "ether")
    ) {
      await contractLLTH.methods
        .approve(
          Constants.GAME_ADDRESS,
          web3Socket.utils.toWei(web3Socket.utils.toBN(100000000000), "ether")
        )
        .send({ from: accounts[0], gas: 3000000 });
    }
    await contractWheel.methods
      .placeBet(
        web3Socket.utils.toWei(valueBet.toString(), "ether"),
        multiplier,
        0
      )
      .send({ from: accounts[0], gas: 3000000 });

    setTxIsDone(true);
    setPlacedBet(true);
  };

  return (
    <>
      <Box
        direction="column"
        animation={{ type: "zoomIn", duration: 500, size: "xlarge" }}
        gap="medium"
      >
        <FormField name="betAmount">
          <TextInput
            required={true}
            suggestions={suggestionsBetLLTH}
            onSuggestionSelect={onSuggestionSelectBetLLTH}
            size="small"
            name="betAmount"
            placeholder="Bet Amount"
            value={valueBet}
            onChange={(event) => setValueBet(Number(event.target.value))}
            icon={
              <Text color="#562B76" size="medium">
                {currency}
              </Text>
            }
            reverse
          />
        </FormField>
        <FormField name="autoCashOut">
          <RangeInput
            min="2"
            max="13"
            value={multiplier}
            onChange={(value) => {
              setMultiplier(Number(value.target.value));
            }}
          />
          <Heading color="#fff" textAlign="center">
            {multiplier}
          </Heading>
        </FormField>
        <SpinButton onClick={() => placeBet()} />
      </Box>
    </>
  );
}

export default PlaceBet;
