import { RobloxWidget, RobloxWidgetProps } from "@bosonprotocol/react-kit";
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

export function Roblox() {
  const { props } = useProps();
  const { roundness, color, configProps } = props;
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
      throw new Error(`color should be one of ${JSON.stringify(colorValues)}`);
    }
    return validatedColor;
  }, [color]);
  const productsGridProps = useMemo(() => {
    return {
      theme: {
        commitButton: {
          color: validatedColor === "green" ? "green" : "white",
          layout: "horizontal",
          shape:
            validatedRoundness === "min"
              ? "sharp"
              : validatedRoundness === "mid"
              ? "rounded"
              : "pill"
        }
      }
    } satisfies RobloxWidgetProps["productsGridProps"];
  }, [validatedRoundness, validatedColor]);
  return (
    <>
      <GlobalStyle
        $htmlBodyRootStyle={css`
          height: 100%;
        `}
      />
      <RobloxWidget
        productsGridProps={productsGridProps}
        configProps={{
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
            "https://drcenter-staging.on.fleek.co/#/exchange/{id}/raise-dispute",
          showProductsPreLogin: true,
          withGlobalStyle: true
        }}
        connectProps={{ brand: "GYMSHARK" }}
      />
    </>
  );
}
