import * as React from "react";
import Image from "next/image";
import "../styles/Home.module.css";
import { Text } from "grommet";
import connectYourWalletToPlay from "../styles/assets/connect_your_wallet_to_play.png";

import { AppCtx } from "../contexts/appContext";

interface Props {}

class UnderHeaderText extends React.Component<Props> {
  static contextType = AppCtx;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.context.connected ? (
          <>
            {this.context.placedBet ? (
              <>
                <Text size="large">
                  BET AMOUNT:
                  <Text color="#9933FF" size="large">
                    {" "}
                    {this.context.valueBet} $LLTH
                  </Text>
                  <Text size="large">
                    {" "}
                    MULTIPLIER:{" "}
                    <Text color="#9933FF" size="large">
                      {" "}
                      {this.context.multiplier}x
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
