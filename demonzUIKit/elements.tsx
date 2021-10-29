import idleLeftGirl from "../styles/assets/L_ldyidle.gif";
import spinLeftGirl from "../styles/assets/L_ldyspin.gif";
import loseLeftGirl from "../styles/assets/L_ldylose.gif";
import winLeftGirl from "../styles/assets/L_ldywin.gif";
import idleRightGirl from "../styles/assets/R_ldyidle.gif";
import spinRightGirl from "../styles/assets/R_ldyspin.gif";
import winRightGirl from "../styles/assets/R_ldywin.gif";
import loseRightGirl from "../styles/assets/R_ldylose.gif";
import markerImg from "../styles/assets/marker.png";
import wheelImg from "../styles/assets/wheel.png";
import connectButton from "../styles/assets/connect_button.png";
import spinButton from "../styles/assets/spin.png";

import { Box } from "grommet";
import Image from "next/image";
import { animated } from "react-spring";

export const LeftLadyIdle = (props: any) => {
  return (
    <Box
      height={props.height}
      width={props.width}
      margin={{ left: props.marginLeft, top: props.marginTop }}
    >
      <Image
        loading="eager"
        priority={true}
        src={idleLeftGirl}
        height={props.height}
        width={props.width}
      />
    </Box>
  );
};

export const LeftLadySpin = (props: any) => {
  return (
    <Box
      height={props.height}
      width={props.width}
      margin={{ left: props.marginLeft, top: props.marginTop }}
    >
      <Image
        loading="eager"
        priority={true}
        src={spinLeftGirl}
        height={props.height}
        width={props.width}
      />
    </Box>
  );
};

export const LeftLadyWin = (props: any) => {
  return (
    <Box
      height={props.height}
      width={props.width}
      margin={{ left: props.marginLeft, top: props.marginTop }}
    >
      <Image
        loading="eager"
        priority={true}
        src={winLeftGirl}
        height={props.height}
        width={props.width}
      />
    </Box>
  );
};

export const LeftLadyLose = (props: any) => {
  return (
    <Box
      height={props.height}
      width={props.width}
      margin={{ left: props.marginLeft, top: props.marginTop }}
    >
      <Image
        loading="eager"
        priority={true}
        src={loseLeftGirl}
        height={props.height}
        width={props.width}
      />
    </Box>
  );
};

export const RightLadyIdle = (props: any) => {
  return (
    <Box
      height={props.height}
      width={props.width}
      margin={{ left: props.marginLeft, top: props.marginTop }}
    >
      <Image
        loading="eager"
        priority={true}
        src={idleRightGirl}
        height={props.height}
        width={props.width}
      />
    </Box>
  );
};

export const RightLadySpin = (props: any) => {
  return (
    <Box
      height={props.height}
      width={props.width}
      margin={{ left: props.marginLeft, top: props.marginTop }}
    >
      <Image
        loading="eager"
        priority={true}
        src={spinRightGirl}
        height={props.height}
        width={props.width}
      />
    </Box>
  );
};

export const RightLadyWin = (props: any) => {
  return (
    <Box
      height={props.height}
      width={props.width}
      margin={{ left: props.marginLeft, top: props.marginTop }}
    >
      <Image
        loading="eager"
        priority={true}
        src={winRightGirl}
        height={props.height}
        width={props.width}
      />
    </Box>
  );
};

export const RightLadyLose = (props: any) => {
  return (
    <Box
      height={props.height}
      width={props.width}
      margin={{ left: props.marginLeft, top: props.marginTop }}
    >
      <Image
        loading="eager"
        priority={true}
        src={loseRightGirl}
        height={props.height}
        width={props.width}
      />
    </Box>
  );
};

export const Marker = (props: any) => {
  return (
    <Box
      height={props.height}
      width={props.width}
      margin={{ top: "-20px", left: "10px" }}
    >
      <Image src={markerImg} height={props.height} width={props.width} />
    </Box>
  );
};

export const Wheel = (props: any) => {
  return (
    <animated.div
      style={{
        width: props.width,
        height: props.height,
        borderRadius: 16,
        ...props.animations,
      }}
    >
      <Image
        src={wheelImg}
        height={String(props.height) + "px"}
        width={String(props.width) + "px"}
      />
    </animated.div>
  );
};

export const ConnectButton = (props: any) => {
  return (
    <Image src={connectButton} height={props.height} onClick={props.onClick} />
  );
};

export const SpinButton = (props: any) => {
  return (
    <Image src={spinButton} height={props.height} onClick={props.onClick} />
  );
};
