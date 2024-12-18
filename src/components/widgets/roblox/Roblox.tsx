import {
  bosonButtonThemes,
  RobloxWidget,
  RobloxWidgetProps,
  theme
} from "@bosonprotocol/react-kit";
import { useMemo } from "react";
import { css } from "styled-components";
import * as yup from "yup";

import { useProps } from "../../../hooks/useProps";
import { GlobalStyle } from "../styles";

const colors = theme.colors.light;

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
    const productsStyle = {
      title: {
        style: {
          margin: 0
        }
      },
      subtitle: {
        style: {
          color: validatedColor === "black" ? "inherit" : colors.darkGrey
        }
      }
    } satisfies NonNullable<
      RobloxWidgetProps["productsGridProps"]["theme"]
    >["unavailabeProducts"];
    return {
      theme: {
        style: {
          background: validatedColor === "black" ? "black" : colors.white,
          paddingTop: "5rem",
          paddingBottom: "5rem"
        },
        currencyColor: validatedColor === "black" ? "inherit" : undefined,
        commitButton: {
          color: validatedColor,
          layout: "horizontal",
          shape:
            validatedRoundness === "min"
              ? "sharp"
              : validatedRoundness === "mid"
              ? "rounded"
              : "pill"
        },
        purchasedProducts: {
          title: productsStyle["title"]
        },
        availableProducts: {
          ...productsStyle
        },
        unavailabeProducts: {
          ...productsStyle
        }
      }
    } satisfies RobloxWidgetProps["productsGridProps"];
  }, [validatedRoundness, validatedColor]);
  const connectProps = useMemo(() => {
    const borderRadius =
      validatedRoundness === "min"
        ? "0px"
        : validatedRoundness === "mid"
        ? "4px"
        : "9999px";
    type CardThemeProps =
      RobloxWidgetProps["connectProps"]["theme"]["signUpCard"];
    const cardThemeProps = {
      title: {
        color: validatedColor === "black" ? colors.white : "#1e1e1e"
      },
      subtitle: {
        color: validatedColor === "black" ? colors.white : colors.darkGrey
      },
      check: {
        color:
          validatedColor === "green"
            ? colors.green
            : validatedColor === "white"
            ? "#1e1e1e"
            : colors.white
      },
      number: {
        active: {
          backgroundColor:
            validatedColor === "green"
              ? colors.green
              : validatedColor === "white"
              ? "#1e1e1e"
              : colors.white,
          stroke:
            validatedColor === "green"
              ? "#1e1e1e"
              : validatedColor === "white"
              ? colors.white
              : "#1e1e1e"
        },
        inactive: {
          backgroundColor:
            validatedColor === "green"
              ? colors.lightGrey
              : validatedColor === "white"
              ? colors.lightGrey
              : "black",
          stroke:
            validatedColor === "green"
              ? "#1e1e1e"
              : validatedColor === "white"
              ? "#1e1e1e"
              : colors.white
        }
      },
      button: {
        active: {
          ...(validatedColor === "black"
            ? {
                color: "#1e1e1e",
                background: colors.white,
                borderWidth: 1,
                borderColor: "#1e1e1e",
                hover: {
                  color: colors.white,
                  background: "#1e1e1e",
                  borderColor: colors.white
                }
              }
            : validatedColor === "white"
            ? {
                color: colors.white,
                background: "#1e1e1e",
                borderWidth: 1,
                borderColor: colors.white,
                hover: {
                  color: "#1e1e1e",
                  borderColor: "#1e1e1e",
                  background: colors.white
                }
              }
            : {
                ...bosonButtonThemes({ withBosonStyle: true })["bosonPrimary"],
                borderWidth: 1
              }),
          borderRadius: borderRadius
        },
        inactive: {
          ...(validatedColor === "black"
            ? {
                color: colors.white,
                background: "#1e1e1e",
                borderWidth: 1,
                borderColor: colors.white,
                hover: {
                  color: "#1e1e1e",
                  borderColor: "#1e1e1e",
                  background: colors.white
                }
              }
            : validatedColor === "white"
            ? {
                color: "#1e1e1e",
                background: colors.white,
                borderWidth: 1,
                borderColor: "#1e1e1e",
                hover: {
                  color: colors.white,
                  background: "#1e1e1e",
                  borderColor: colors.white
                }
              }
            : {
                color: colors.black,
                background: colors.white,
                borderWidth: 1,
                borderColor: "#1e1e1e",
                hover: {
                  color: colors.white,
                  background: colors.black
                }
              }),
          borderRadius: borderRadius
        }
      },
      padding: "24px"
    } satisfies CardThemeProps;
    return {
      brand: "GYMSHARK",
      theme: {
        backgroundColor: validatedColor === "black" ? "#1e1e1e" : colors.white,
        lineBetweenStepsColor:
          validatedColor === "black" ? "black" : colors.lightGrey,
        stepsBackgroundSides:
          validatedColor === "black" ? "#1e1e1e" : colors.white,
        robloxCard: cardThemeProps,
        walletCard: cardThemeProps,
        walletPanel: {
          backgroundColor: "white",
          buyCryptoTheme: bosonButtonThemes({ withBosonStyle: true })[
            "bosonPrimary"
          ],
          disconnectBorderRadius: borderRadius,
          disconnectBackgroundColor: colors.green,
          disconnectColor: "black",
          optionProps: {
            backgroundColor: colors.accent,
            borderRadius: borderRadius,
            color: colors.white,
            hoverColor: colors.white,
            hoverFocusBackgroundColor: "#1e1e1e",
            iconBorderRadius: borderRadius
          },
          connectionErrorProps: {
            backToWalletSelectionTheme: bosonButtonThemes({
              withBosonStyle: true
            })["orangeInverse"],
            tryAgainTheme: bosonButtonThemes({ withBosonStyle: true })[
              "orangeInverse"
            ]
          }
        },
        signUpCard: cardThemeProps
      }
    } satisfies RobloxWidgetProps["connectProps"];
  }, [validatedRoundness, validatedColor]);
  return (
    <>
      <GlobalStyle
        $color={validatedColor === "black" ? "white" : "#1e1e1e"}
        $htmlBodyRootStyle={css`
          height: 100%;
          background-color: ${validatedColor === "black" ? "black" : "white"};
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
          showProductsPreLogin: true
        }}
        connectProps={connectProps}
      />
    </>
  );
}
