/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */

import { CommitButtonView } from "@bosonprotocol/react-kit";
import { ElementRef, useCallback, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import * as yup from "yup";

import { GlobalStyle } from "../styles";
export const commitButtonPath = "/commit-button";

declare const CommitWidgetModal: (props: Record<string, unknown>) => any;
declare const PurchaseOverviewModal: (props: Record<string, unknown>) => any;

const yupStringOrNumber = yup
  .mixed<string | number>()
  .test(
    "is-string-or-number",
    "The field must be either a string or a number",
    (value) =>
      value === undefined
        ? true
        : typeof value === "string" || typeof value === "number"
  );
export function CommitButton() {
  const ref = useRef<ElementRef<"div">>(null);
  const [props, setProps] = useState(window.xprops ?? {});
  const { renderToSelector, buttonStyle, context, ...commitWidgetProps } =
    props;
  useEffect(() => {
    if ("xprops" in window && typeof window.xprops.onProps === "function") {
      window.xprops.onProps((newProps: typeof props) => {
        setProps({ ...newProps });
      });
    }
  }, []);
  const modalMargin = props.modalMargin || "2%";
  const sendDimensions = useCallback(() => {
    if (
      ref.current &&
      typeof props.onGetDimensions === "function" &&
      props.onGetDimensions
    ) {
      const dimensionProps = {
        offsetHeight: ref.current.offsetHeight,
        offsetWidth: ref.current.offsetWidth,
        boundingClientRect: JSON.parse(
          JSON.stringify(ref.current.getBoundingClientRect())
        )
      };
      props.onGetDimensions?.(dimensionProps);
    }
  }, [props]);
  useEffect(() => {
    let resizeObserver: ResizeObserver;
    if (ref.current) {
      const resizeObserver = new ResizeObserver(() => {
        sendDimensions();
      });

      resizeObserver.observe(ref.current);
    }
    return () => {
      resizeObserver?.disconnect();
    };
  }, [sendDimensions]);
  const buttonStyleObj = useMemo(() => {
    const buttonStyleValidated = yup
      .object({
        minWidth: yupStringOrNumber,
        minHeight: yupStringOrNumber,
        shape: yup.mixed().oneOf(["sharp", "rounded", "pill"]).optional(),
        color: yup.mixed().oneOf(["green", "black", "white"]).optional()
      })
      .validateSync(buttonStyle);
    if (typeof buttonStyle === "object") {
      return buttonStyleValidated;
    }
    return {} as typeof buttonStyleValidated;
  }, [buttonStyle]);
  const validatedContext = useMemo(() => {
    if (!context) {
      return "iframe";
    }

    if (yup.mixed().oneOf(["iframe", "popup"]).isValidSync(context)) {
      return context;
    }
    throw new Error(
      `"context" must be either "iframe" or "popup", "${context}" given`
    );
  }, [context]);
  return (
    <>
      <GlobalStyle />
      <CommitButtonView
        minWidth={buttonStyleObj.minWidth}
        minHeight={buttonStyleObj.minHeight}
        shape={buttonStyleObj.shape}
        color={buttonStyleObj.color}
        ref={ref}
        disabled={"disabled" in props && !!props.disabled}
        onClick={() => {
          CommitWidgetModal({ ...commitWidgetProps, modalMargin }).renderTo(
            window.parent,
            renderToSelector || "body",
            validatedContext
          );
        }}
        onTaglineClick={() => {
          PurchaseOverviewModal({
            modalMargin
          }).renderTo(
            window.parent,
            renderToSelector || "body",
            validatedContext
          );
        }}
      />
    </>
  );
}
