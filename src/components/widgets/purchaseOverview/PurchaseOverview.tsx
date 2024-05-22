/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */

import { PurchaseOverview as PurchaseOverviewReactKit } from "@bosonprotocol/react-kit";
import { useEffect, useMemo, useState } from "react";
import * as yup from "yup";

import { GlobalStyle } from "../styles";
export const purchaseOverviewPath = "/purchase-overview";
export const PurchaseOverview = () => {
  const [props, setProps] = useState(window.xprops ?? {});
  useEffect(() => {
    if ("xprops" in window && typeof window.xprops.onProps === "function") {
      window.xprops.onProps((newProps: typeof props) => {
        setProps({ ...newProps });
      });
    }
  }, []);
  const validatedProps = useMemo(() => {
    return yup
      .object({
        modalMargin: yup.string().optional(),
        bodyOverflow: yup.string().optional().nullable(true)
      })
      .validateSync(props);
  }, [props]);
  return (
    <>
      <GlobalStyle $bodyOverflow={validatedProps.bodyOverflow} />
      <PurchaseOverviewReactKit
        lookAndFeel="modal"
        modalMargin={validatedProps.modalMargin}
        hideModal={() => {
          if (
            "close" in window.xprops &&
            typeof window.xprops.close === "function"
          ) {
            window.xprops.close();
          }
        }}
      />
    </>
  );
};
