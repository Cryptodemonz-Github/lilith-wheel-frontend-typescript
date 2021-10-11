import React from "react";
import Image from "next/image";
import "../styles/Home.module.css";
import { Text } from "grommet";
import connectYourWalletToPlay from "../styles/assets/connect_your_wallet_to_play.png";

interface Props {
  connected: boolean;
  placedBet: boolean;
  valueBet: number;
  multiplier: number;
}

class UnderHeaderText extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <br />
        {this.props.connected ? (
          <>
            {this.props.placedBet ? (
              <>
                <Text size="large">
                  BET AMOUNT:
                  <Text color="#9933FF" size="large">
                    {" "}
                    {this.props.valueBet} $LLTH
                  </Text>
                  <Text size="large">
                    {" "}
                    MULTIPLIER:{" "}
                    <Text color="#9933FF" size="large">
                      {" "}
                      {this.props.multiplier}x
                    </Text>{" "}
                  </Text>
                </Text>
              </>
            ) : (
              <Text size="large">PLACE BET!</Text>
            )}
          </>
        ) : (
          <Image src={connectYourWalletToPlay} />
        )}
      </>
    );
  }
}

export default UnderHeaderText;
