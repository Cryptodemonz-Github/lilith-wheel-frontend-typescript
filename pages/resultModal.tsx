import React, { useContext } from "react";
import demonzface from "../styles/assets/demonzface.png";
import demonzface_b from "../styles/assets/demonzface_b.png";
import wonPic from "../styles/assets/won.png";
import Image from "next/image";
import "../styles/Home.module.css";
import { Box, Button, Text } from "grommet";
import styled, { css } from "styled-components";
import { AppCtx } from "../contexts/appContext";
import laughing_devil from "../styles/assets/laughing_devilwindow4x.gif";

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

function ResultModal() {
  const {
    setValueBet,
    won,
    setMultiplier,
    setWinningMultiplier,
    setPlacedBet,
    setTxStarted,
    setIsEnded,
    setWon,
    setReset,
    reset,
    valueBet,
    winningMultiplier,
    setIsSpinning,
    setIsTxModalOpen,
    setStartSpin,
    setTxIsDone,
  } = useContext(AppCtx);

  const newGame = () => {
    setValueBet(0);
    setMultiplier(2);
    setWinningMultiplier(0);
    setPlacedBet(false);
    setTxStarted(false);
    setIsEnded(false);
    setWon(false);
    setReset(!reset);
    setIsSpinning(false);
    setIsTxModalOpen(false);
    setStartSpin(false);
    setTxIsDone(false);
  };

  return (
    <>
      <ModalContainer>
        {!won ? (
          <Box
            height="medium"
            width="medium"
            pad="medium"
            background={{ image: "url(you_lost.png)" }}
            justify="center"
            animation={{ type: "fadeIn", duration: 750, size: "xlarge" }}
            onClick={() => newGame()}
          >
            <Box
              direction="column"
              gap="medium"
              align="center"
              animation={{ type: "zoomIn", duration: 500, size: "xlarge" }}
            >
              <Image
                className="wheel"
                height="200px"
                width="200px"
                src={laughing_devil}
              />
            </Box>
          </Box>
        ) : (
          <Box
            height="medium"
            width="medium"
            pad="medium"
            background={{ image: "url(you_won.png)" }}
            justify="center"
            animation={{ type: "fadeIn", duration: 750, size: "xlarge" }}
            onClick={() => newGame()}
          >
            <Box
              direction="column"
              gap="medium"
              align="center"
              animation={{ type: "zoomIn", duration: 500, size: "xlarge" }}
            >
              <Text size="large">
                {valueBet * winningMultiplier}{" "}
                <Text color="#fff" size="large">
                  $LLTH
                </Text>
              </Text>
              <Text textAlign="center" size="small">
                YOU WILL RECEIVE YOUR PRIZE WITHIN A FEW SECONDS.
              </Text>
            </Box>
          </Box>
        )}
      </ModalContainer>
    </>
  );
}

export default ResultModal;
