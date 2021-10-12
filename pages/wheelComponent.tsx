/// <reference path='../global.d.ts'/>
import React, { useEffect } from "react";
import wheelImg from "../styles/assets/wheel.png";
import markerImg from "../styles/assets/marker.png";
import { Stack, Box } from "grommet";
import Image from "next/image";
import "../styles/Home.module.css";
import { useSpring, animated } from "react-spring";
import * as easings from "d3-ease";
import { useState } from "react";
import styled, { css } from "styled-components";
import { Container } from "react-bootstrap";

/*
const WheelImage = styled(Image)<{ value: boolean }>`
  filter: ${(props) => (props.value ? "blur(1px)" : "blur(0px)")};
`;*/

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
const wait = async (props: any) => {
  await timeout(1500);
  props.setIsEnded(true);
};

interface Props {
  size: any;
}

function WheelComponent(props: any) {
  const animations = useSpring(
    props.isSpinning
      ? {
          from: { rotateZ: 0 },
          to: { rotateZ: props.rotateValue },
          config: {
            mass: 10000,
            duration: 15000,
            easing: easings.easeQuadOut,
          },
          reset: true,
          onRest: () => {
            props.setIsSpinning(false);
            wait(props);
          },
        }
      : {}
  );

  useEffect(() => {
    console.log("winningMulti in wheelc: ", props.winningMultiplier);
  }, []);

  return (
    <>
      <>
        {props.size === "large" && (
          <animated.div
            style={{
              width: 400,
              height: 400,
              borderRadius: 16,
              ...animations,
            }}
          >
            <Image src={wheelImg} height="400px" width="400px" />
          </animated.div>
        )}
      </>
      <>
        {props.size === "medium" && (
          <animated.div
            style={{
              width: 250,
              height: 250,
              borderRadius: 16,
              ...animations,
            }}
          >
            <Image src={wheelImg} height="250px" width="250px" />
          </animated.div>
        )}
      </>
      <>
        {props.size === "small" && (
          <animated.div
            style={{
              borderRadius: 16,
              ...animations,
            }}
          >
            <Image src={wheelImg} height="300px" width="300px" />
          </animated.div>
        )}
      </>
    </>
  );
}
export default WheelComponent;
