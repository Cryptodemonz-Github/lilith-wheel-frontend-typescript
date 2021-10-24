import React, { useContext, useEffect } from "react";
import wheelImg from "../styles/assets/wheel.png";

import { Stack, Box } from "grommet";
import Image from "next/image";
import "../styles/Home.module.css";
import { useSpring, animated } from "react-spring";
import * as easings from "d3-ease";
import { useState } from "react";
import styled, { css } from "styled-components";
import { Container } from "react-bootstrap";
import { AppCtx } from "../contexts/appContext";
import {
  LeftLadyIdle,
  LeftLadySpin,
  LeftLadyWin,
  LeftLadyLose,
  RightLadyIdle,
  RightLadySpin,
  RightLadyWin,
  RightLadyLose,
  Marker,
  Wheel,
} from "../demonzUIKit/elements";

/*
const WheelImage = styled(Image)<{ value: boolean }>`
  filter: ${(props) => (props.value ? "blur(1px)" : "blur(0px)")};
`;*/

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
const wait = async (sec: number) => {
  await timeout(sec);
};

interface Props {
  size: any;
  reset: any;
  /*
  setIsSpinning: (value: boolean) => void;
  isSpinning: boolean;
  startSpin: boolean;*/
}

enum States {
  IDLE,
  SPIN,
  WIN,
  LOSE,
}

function WheelComponent(props: Props) {
  const [wheelState, setWheelState] = useState(States.IDLE);
  const [leftSpriteState, setLeftSpriteState] = useState(States.IDLE);
  const [rightSpriteState, setRightSpriteState] = useState(States.IDLE);
  const { startSpin } = useContext(AppCtx);
  const { rotateValue, won, setIsEnded, reset } = useContext(AppCtx);

  const animations = useSpring(
    wheelState === States.SPIN
      ? {
          from: { rotateZ: 0 },
          to: { rotateZ: -1 * rotateValue },
          config: {
            mass: 10000,
            duration: 15000,
            easing: easings.easeQuadOut,
          },
          reset: true,
          onRest: () => {
            setWheelState(States.IDLE);
            if (won) {
              setLeftSpriteState(States.WIN);
              setRightSpriteState(States.WIN);
            } else {
              setRightSpriteState(States.LOSE);
              setLeftSpriteState(States.LOSE);
            }
            wait(5000);
            setIsEnded(true);
          },
        }
      : {}
  );

  useEffect(() => {
    if (startSpin) {
      console.log("rotateVal:", rotateValue);
      setRightSpriteState(States.SPIN);
      setLeftSpriteState(States.SPIN);
      wait(900).then(() => setWheelState(States.SPIN));
      wait(3000).then(() => {
        setLeftSpriteState(States.IDLE);
        setRightSpriteState(States.IDLE);
      });
    }
  }, [startSpin]);

  useEffect(() => {
    setLeftSpriteState(States.IDLE);
    setRightSpriteState(States.IDLE);
  }, [reset]);

  return (
    <>
      <>
        {props.size === "large" && (
          <Stack>
            <Stack anchor="top">
              <Wheel width={475} height={475} animations={animations} />
              <Marker />
            </Stack>
            {leftSpriteState === States.IDLE && (
              <LeftLadyIdle
                height="480px"
                width="240px"
                marginLeft="-205px"
                marginTop="125px"
              />
            )}
            {leftSpriteState === States.SPIN && (
              <LeftLadySpin
                height="480px"
                width="240px"
                marginLeft="-205px"
                marginTop="125px"
              />
            )}
            {leftSpriteState === States.WIN && (
              <LeftLadyWin
                height="480px"
                width="240px"
                marginLeft="-205px"
                marginTop="125px"
              />
            )}
            {leftSpriteState === States.LOSE && (
              <LeftLadyLose
                height="480px"
                width="240px"
                marginLeft="-205px"
                marginTop="125px"
              />
            )}
            {rightSpriteState === States.IDLE && (
              <RightLadyIdle
                height="500px"
                width="260px"
                marginLeft="400px"
                marginTop="105px"
              />
            )}
            {rightSpriteState === States.SPIN && (
              <RightLadySpin
                height="500px"
                width="260px"
                marginLeft="400px"
                marginTop="105px"
              />
            )}
            {rightSpriteState === States.WIN && (
              <RightLadyWin
                height="500px"
                width="260px"
                marginLeft="400px"
                marginTop="105px"
              />
            )}
            {rightSpriteState === States.LOSE && (
              <RightLadyLose
                height="500px"
                width="260px"
                marginLeft="400px"
                marginTop="105px"
              />
            )}
          </Stack>
        )}
      </>
      <>
        {props.size === "medium" && (
          <Wheel width={250} height={250} animations={animations} />
        )}
      </>
      <>
        {props.size === "small" && (
          <Wheel width={250} height={250} animations={animations} />
        )}
      </>
    </>
  );
}
export default WheelComponent;
