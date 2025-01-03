import { RobloxWidget } from "@bosonprotocol/react-kit";
import { useMemo } from "react";
import { css } from "styled-components";
import * as yup from "yup";

import { useProps } from "../../../hooks/useProps";
import { GlobalStyle } from "../styles";

export const robloxPath = "/roblox";

const roundnessObj = {
  min: "min",
  mid: "mid",
  high: "high"
} as const;
const roundnessValues = Object.values(roundnessObj);
const colorObj = {
  green: "green",
  white: "white",
  black: "black"
} as const;
const colorValues = Object.values(colorObj);
const showProductsPreloginObj = {
  true: "true",
  false: "false"
} as const;
const showProductsPreloginValues = Object.values(showProductsPreloginObj);

export function Roblox() {
  const { props } = useProps();
  console.log("props", props);
  const { roundness, color, configProps, showProductsPrelogin } = props;
  const validatedRoundness = useMemo(() => {
    const validatedRoundness = yup
      .mixed<(typeof roundnessValues)[number]>()
      .oneOf(roundnessValues)
      .validateSync(roundness);
    if (!validatedRoundness) {
      throw new Error(
        `roundness should be one of ${JSON.stringify(roundnessValues)}`
      );
    }
    return validatedRoundness;
  }, [roundness]);
  const validatedColor = useMemo(() => {
    const validatedColor = yup
      .mixed<(typeof colorValues)[number]>()
      .oneOf(colorValues)
      .validateSync(color);
    if (!validatedColor) {
      throw new Error(
        `color should be one of ${JSON.stringify(
          colorValues
        )}. Received: ${color}`
      );
    }
    return validatedColor;
  }, [color]);
  const validatedShowProductsPrelogin = useMemo(() => {
    const validatedShowProductsPrelogin = yup
      .mixed<(typeof showProductsPreloginValues)[number]>()
      .oneOf(showProductsPreloginValues)
      .validateSync(showProductsPrelogin);
    if (!validatedShowProductsPrelogin) {
      throw new Error(
        `showProductsPrelogin should be one of ${JSON.stringify(
          showProductsPreloginValues
        )}. Received: ${showProductsPrelogin}`
      );
    }
    return validatedShowProductsPrelogin;
  }, [showProductsPrelogin]);
  return (
    <>
      <GlobalStyle
        $htmlStyle={css`
          display: flex;
          height: 100%;
        `}
        $bodyStyle={css`
          display: flex;
          flex: 1;
        `}
        $rootStyle={css`
          display: flex;
          flex: 1;
        `}
      />
      <RobloxWidget
        configProps={{
          // ...configProps,
          configId: "testing-80002-0",
          envName: "testing",
          sellerId: "6",
          walletConnectProjectId:
            process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID ?? "",
          backendOrigin: "http://localhost:3336",
          ipfsGateway: process.env.STORYBOOK_DATA_IPFS_GATEWAY,
          ipfsProjectId: process.env.STORYBOOK_DATA_IPFS_PROJECT_ID,
          ipfsProjectSecret: process.env.STORYBOOK_DATA_IPFS_PROJECT_SECRET,
          sendDeliveryInfoThroughXMTP: true,
          raiseDisputeForExchangeUrl:
            "https://drcenter-staging.on-fleek.app/#/exchange/{id}/raise-dispute",
          showProductsPreLogin: validatedShowProductsPrelogin === "true",
          roundness: validatedRoundness,
          theme:
            validatedColor === "green"
              ? "light"
              : validatedColor === "white"
              ? "blackAndWhite"
              : "dark"
        }}
        connectProps={{ brand: "GYMSHARK" }}
      />
    </>
  );
}
