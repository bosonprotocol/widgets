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
        close: yup.mixed<() => any>().test({
          test: (value) => {
            return value === undefined || typeof value === "function";
          }
        }),
        modalMargin: yup.string().optional()
      })
      .validateSync(props);
  }, [props]);
  return (
    <>
      <GlobalStyle />
      <PurchaseOverviewReactKit
        lookAndFeel="modal"
        modalMargin={validatedProps.modalMargin}
        hideModal={
          validatedProps.close ||
          (() => console.log("close purchase overview modal"))
        }
      />
    </>
  );
};
