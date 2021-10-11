import { VoidSigner } from "@ethersproject/abstract-signer";
import {
  Box,
  RangeInput,
  Button,
  TextInput,
  FormField,
  Text,
  Heading,
} from "grommet";
import React from "react";
import "../styles/Home.module.css";
import WheelComponent from "./wheelComponent";

interface Props {
  valueBet: number;
  setValueBet: (value: number) => void;
  multiplier: number;
  setMultiplier: (value: number) => void;
  connected: boolean;
  setConnected: (value: boolean) => void;
  placeBet: () => void;
  setTxStarted: (value: boolean) => void;
  txStarted: boolean;
}

class PlaceBet extends React.Component<Props> {
  private suggestionsBet: Array<string> = [
    "1k $LLTH",
    "10k $LLTH",
    "100k $LLTH",
  ];

  constructor(props: Props) {
    super(props);
  }

  onSuggestionSelectBet = (event: any) => {
    switch (event.suggestion) {
      case "1k $LLTH":
        this.props.setValueBet(1000);
        break;
      case "10k $LLTH":
        this.props.setValueBet(10000);
        break;
      case "100k $LLTH":
        this.props.setValueBet(100000);
        break;
      default:
        this.props.setValueBet(Number(""));
    }
  };

  render() {
    return (
      <>
        <Box
          direction="column"
          animation={{ type: "zoomIn", duration: 500, size: "xlarge" }}
        >
          <FormField name="betAmount">
            <TextInput
              required={true}
              suggestions={this.suggestionsBet}
              onSuggestionSelect={this.onSuggestionSelectBet}
              size="small"
              name="betAmount"
              placeholder="Bet Amount"
              value={this.props.valueBet}
              onChange={(event) =>
                this.props.setValueBet(Number(event.target.value))
              }
              icon={
                <Text color="#9933FF" size="medium">
                  $LLTH
                </Text>
              }
              reverse
            />
          </FormField>
          <FormField name="autoCashOut">
            <RangeInput
              min="2"
              max="13"
              value={this.props.multiplier}
              onChange={(value) => {
                this.props.setMultiplier(Number(value.target.value));
              }}
            />
            <Heading color="#fff" textAlign="center">
              {this.props.multiplier + "x"}
            </Heading>
          </FormField>

          <Button
            alignSelf="center"
            secondary
            type="submit"
            label={
              <Text textAlign="center" size="xlarge" color="#fff">
                PLACE BET
              </Text>
            }
            color="#9933FF"
            onClick={() => this.props.placeBet()}
          />
        </Box>
      </>
    );
  }
}

export default PlaceBet;
