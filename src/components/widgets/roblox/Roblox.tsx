import {
  ConfigId,
  EnvironmentType,
  RobloxWidget,
  RobloxWidgetProps
} from "@bosonprotocol/react-kit";
import { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
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
const layoutObj = {
  vertical: "vertical",
  horizontal: "horizontal"
} as const;
const layoutValues = Object.values(layoutObj);
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
type ConfigProps = Omit<
  RobloxWidgetProps["configProps"],
  | "roundness"
  | "theme"
  | "layout"
  | "showProductsPreLogin"
  | "backendOrigin"
  | "walletConnectProjectId"
  | "withMagicLink"
  | "sendDeliveryInfoThroughXMTP"
  | "raiseDisputeForExchangeUrl"
> & {
  sendDeliveryInfoThroughXMTP?: NonNullable<
    RobloxWidgetProps["configProps"]["sendDeliveryInfoThroughXMTP"]
  >;
  raiseDisputeForExchangeUrl?: NonNullable<
    RobloxWidgetProps["configProps"]["raiseDisputeForExchangeUrl"]
  >;
};
const getTestThatItsAFunction = (field: string) =>
  [
    "is-function",
    `'${field}' must be a function`,
    (value: unknown) => {
      return value === undefined ? true : typeof value === "function";
    }
  ] as const;
export function Roblox() {
  const { props } = useProps();
  const { roundness, color, configProps, showProductsPrelogin, step3, layout } =
    props;
  const validatedConfigProps = useMemo(() => {
    const configPropsSchema: yup.ObjectSchema<ConfigProps> = yup.object({
      sellerId: yup.string().required(),
      raiseDisputeForExchangeUrl: yup.string().optional(),
      configId: yup.mixed<ConfigId>().required(),
      envName: yup.mixed<EnvironmentType>().required(),
      sendDeliveryInfoThroughXMTP: yup.boolean().optional(),
      ipfsGateway: yup.string().optional(),
      defaultCurrencyTicker: yup.string().optional(),
      defaultCurrencySymbol: yup.string().optional(),
      deliveryInfoHandler: yup
        .mixed<NonNullable<ConfigProps["deliveryInfoHandler"]>>()
        .test(...getTestThatItsAFunction("deliveryInfoHandler")),
      redemptionSubmittedHandler: yup
        .mixed<NonNullable<ConfigProps["redemptionSubmittedHandler"]>>()
        .test(...getTestThatItsAFunction("redemptionSubmittedHandler")),
      redemptionConfirmedHandler: yup
        .mixed<NonNullable<ConfigProps["redemptionConfirmedHandler"]>>()
        .test(...getTestThatItsAFunction("redemptionConfirmedHandler")),
      postDeliveryInfoUrl: yup.string().optional(),
      postRedemptionSubmittedUrl: yup.string().optional(),
      metaTx: yup
        .object({
          apiKey: yup.string().required(),
          apiIds: yup.string().required()
        })
        .optional()
        .default(undefined),
      deliveryInfo: yup
        .object({
          name: yup.string().required(),
          streetNameAndNumber: yup.string().required(),
          city: yup.string().required(),
          state: yup.string().required(),
          zip: yup.string().required(),
          country: yup.string().required(),
          email: yup.string().required(),
          walletAddress: yup.string().required(),
          phone: yup.string().required()
        })
        .optional()
        .default(undefined),
      ipfsImageGateway: yup.string().optional(),
      minimumDisputePeriodInDays: yup.number().optional(),
      minimumDisputeResolutionPeriodDays: yup.number().optional(),
      postRedemptionConfirmedUrl: yup.string().optional(),
      commitProxyAddress: yup.string().optional(),
      openseaLinkToOriginalMainnetCollection: yup.string().optional(),
      fairExchangePolicyRules: yup.string().optional(),
      externalConnectedChainId: yup.number().optional(),
      buyerSellerAgreementTemplate: yup.string().optional(),
      sellerCurationListBetweenCommas: yup.string().optional(),
      offerCurationListBetweenCommas: yup.string().optional(),
      licenseTemplate: yup.string().optional(),
      externalConnectedAccount: yup.string().optional(),
      forcedAccount: yup.string().optional(),
      parentOrigin: yup.string().optional(),
      signatures: yup.array(yup.string().required()).optional(),
      contactSellerForExchangeUrl: yup.string().optional(),
      withOwnProducts: yup.mixed<"all" | "mine" | "custom">().optional(),
      postDeliveryInfoHeaders: yup.object().optional(),
      postRedemptionConfirmedHeaders: yup.object().optional(),
      postRedemptionSubmittedHeaders: yup.object().optional(),
      externalConnectedSigner: yup
        .mixed<NonNullable<ConfigProps["externalConnectedSigner"]>>()
        .optional(),
      usePendingTransactions: yup.boolean().optional(),
      enableCurationLists: yup.boolean().optional(),
      withExternalConnectionProps: yup.boolean().optional(),
      dateFormat: yup.string().optional(),
      shortDateFormat: yup.string().optional(),
      ipfsMetadataStorageUrl: yup.string().optional(),
      ipfsProjectId: yup.string().optional(),
      ipfsProjectSecret: yup.string().optional()
    });
    const validatedConfigProps = configPropsSchema.validateSync(configProps);
    if (!validatedConfigProps) {
      throw new Error(
        `configProps is falsy ${JSON.stringify(roundnessValues)}`
      );
    }
    return validatedConfigProps;
  }, [configProps]);
  const validatedStep3 = useMemo(() => {
    const step3Schema: yup.ObjectSchema<RobloxWidgetProps["connectProps"]> =
      yup.object({
        step3: yup.object({
          title: yup.string().required(),
          subtitle: yup.string().required(),
          buttonText: yup.string().required(),
          callback: yup
            .mixed<RobloxWidgetProps["connectProps"]["step3"]["callback"]>()
            .test(...getTestThatItsAFunction("step3.callback"))
            .required()
        })
      });
    const validatedStep3 = step3Schema.validateSync({ step3 });
    if (!validatedStep3) {
      throw new Error(`step3 should is falsy ${JSON.stringify(step3)}`);
    }
    return validatedStep3;
  }, [step3]);
  const validatedRoundness = useMemo(() => {
    const validatedRoundness = yup
      .mixed<(typeof roundnessValues)[number]>()
      .oneOf(roundnessValues)
      .validateSync(roundness);
    if (!validatedRoundness) {
      throw new Error(
        `roundness should be one of ${JSON.stringify(
          roundnessValues
        )}. Received: ${roundness}`
      );
    }
    return validatedRoundness;
  }, [roundness]);
  const validatedLayout = useMemo(() => {
    const validatedLayout = yup
      .mixed<(typeof layoutValues)[number]>()
      .oneOf(layoutValues)
      .validateSync(layout);
    if (!validatedLayout) {
      throw new Error(
        `layout should be one of ${JSON.stringify(
          layoutValues
        )}. Received: ${layout}`
      );
    }
    return validatedLayout;
  }, [layout]);
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
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <>
          <p>something went wrong</p>
          <pre>{error.message}</pre>
        </>
      )}
      onError={(error) => {
        console.error("error in Roblox widget", error);
      }}
    >
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
          ...validatedConfigProps,
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
              : "dark",
          layout: validatedLayout
        }}
        connectProps={validatedStep3}
      />
    </ErrorBoundary>
  );
}
