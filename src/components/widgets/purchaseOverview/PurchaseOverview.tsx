/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */

import { PurchaseOverview as PurchaseOverviewReactKit } from "@bosonprotocol/react-kit";
import { useMemo } from "react";
import * as yup from "yup";
export const purchaseOverviewPath = "/purchase-overview";
const emptyObject = {};
export const PurchaseOverview = () => {
  const props = window.xprops ?? emptyObject;
  const validatedProps = useMemo(() => {
    return yup
      .object({
        close: yup.mixed<() => any>().test({
          test: (value) => {
            return value === undefined || typeof value === "function";
          }
        })
      })
      .validateSync(props);
  }, [props]);
  return (
    <PurchaseOverviewReactKit
      lookAndFeel="modal"
      hideModal={
        validatedProps.close ||
        (() => console.log("close purchase overview modal"))
      }
    />
  );
};
