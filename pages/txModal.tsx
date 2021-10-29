import React, { useEffect, useContext } from "react";
import demonzface from "../styles/assets/demonzface.png";
import demonzface_b from "../styles/assets/demonzface_b.png";
import won from "../styles/assets/won.png";
import Image from "next/image";
import "../styles/Home.module.css";
import { Box, Button, Text } from "grommet";
import styled, { css } from "styled-components";
import PlaceBet from "./placeBet";
import Spinner from "./spinner";
import { AppCtx } from "../contexts/appContext";

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

function TxModal(props: any) {
  const { txStarted, requestId, txIsDone } = useContext(AppCtx);

  return (
    <ModalContainer>
      {props.size === "large" ? (
        <Box
          height="medium"
          width="medium"
          pad="medium"
          background="#000"
          justify="center"
          animation={{ type: "fadeIn", duration: 750, size: "xlarge" }}
        >
          {txStarted ? (
            <>
              <Box
                direction="column"
                gap="medium"
                align="center"
                animation={{ type: "fadeIn", duration: 500, size: "xlarge" }}
              >
                {!txIsDone ? (
                  <>
                    <Text textAlign="center" size="xxlarge">
                      Waiting For Transaction...
                    </Text>
                    <Spinner type="wheel" />
                  </>
                ) : (
                  <>
                    <Text textAlign="center" size="xxlarge">
                      Loading...
                    </Text>
                    <Spinner type="demonBabe" />
                  </>
                )}
              </Box>
            </>
          ) : (
            <>
              <PlaceBet size={props.size} />
            </>
          )}
        </Box>
      ) : (
        <Box
          height="250px"
          width="250px"
          pad="medium"
          background="#000"
          justify="center"
          animation={{ type: "fadeIn", duration: 750, size: "xlarge" }}
        >
          {txStarted ? (
            <>
              <Box
                direction="column"
                gap="medium"
                align="center"
                animation={{ type: "fadeIn", duration: 500, size: "xlarge" }}
              >
                {!txIsDone ? (
                  <>
                    <Text textAlign="center" size="xlarge">
                      Waiting For Transaction...
                    </Text>
                    <Spinner type="wheel" />
                  </>
                ) : (
                  <>
                    <Text textAlign="center" size="xlarge">
                      Loading...
                    </Text>
                    <Spinner type="demonBabe" />
                  </>
                )}
              </Box>
            </>
          ) : (
            <>
              <PlaceBet size={props.size} />
            </>
          )}
        </Box>
      )}
    </ModalContainer>
  );
}

export default TxModal;
