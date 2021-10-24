import React, { useEffect } from "react";
import wheel from "../styles/assets/wheel.png";
import spinRightGirl from "../styles/assets/R_ldyspin.gif";
import Image from "next/image";
import "../styles/Home.module.css";
import { useSpring, animated, Controller } from "react-spring";
import * as easings from "d3-ease";

interface Props {
  type: string;
}

function Spinner(props: Props) {
  const animations = useSpring({
    from: { rotateZ: 0 },
    to: { rotateZ: -4400 },
    duration: 15000,
    easing: easings.easeQuadOut,
    loop: true,
  });

  return (
    <>
      {props.type === "wheel" && (
        <animated.div
          style={{
            width: 240,
            height: 240,
            borderRadius: 0,
            ...animations,
          }}
        >
          <Image className="wheel" height="240px" width="240px" src={wheel} />
        </animated.div>
      )}
      {props.type === "demonBabe" && (
        <Image
          className="wheel"
          height="240px"
          width="120px"
          src={spinRightGirl}
        />
      )}
    </>
  );
}

export default Spinner;
