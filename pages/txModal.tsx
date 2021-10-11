import React, { useEffect } from "react";
import demonzface from "../styles/assets/demonzface.png";
import demonzface_b from "../styles/assets/demonzface_b.png";
import won from "../styles/assets/won.png";
import Image from "next/image";
import "../styles/Home.module.css";
import { Box, Button, Text } from "grommet";
import styled, { css } from "styled-components";
import PlaceBet from "./placeBet";
import Spinner from "./spinner";

interface Props {
  txStarted: boolean;
  valueBet: number;
  setValueBet: (value: number) => void;
  multiplier: number;
  setMultiplier: (value: number) => void;
  connected: boolean;
  setConnected: (value: boolean) => void;
  placeBet: () => void;
  setTxStarted: (value: boolean) => void;
}

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
`;

class TxModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ModalContainer>
        <Box
          height="medium"
          width="medium"
          pad="medium"
          background="#000"
          justify="center"
          animation={{ type: "fadeIn", duration: 750, size: "xlarge" }}
        >
          {this.props.txStarted ? (
            <Box
              direction="column"
              gap="medium"
              align="center"
              animation={{ type: "fadeIn", duration: 500, size: "xlarge" }}
            >
              <Text textAlign="center" size="xxlarge">
                Waiting for transaction...
              </Text>
              <Spinner />
            </Box>
          ) : (
            <>
              <PlaceBet
                valueBet={this.props.valueBet}
                setValueBet={this.props.setValueBet}
                multiplier={this.props.multiplier}
                setMultiplier={this.props.setMultiplier}
                connected={this.props.connected}
                setConnected={this.props.setConnected}
                placeBet={this.props.placeBet}
                setTxStarted={this.props.setTxStarted}
                txStarted={this.props.txStarted}
              />
            </>
          )}
        </Box>
      </ModalContainer>
    );
  }
}

export default TxModal;
