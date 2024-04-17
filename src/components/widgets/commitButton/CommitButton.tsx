/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */

import { CommitButtonView } from "@bosonprotocol/react-kit";
import { ElementRef, useCallback, useEffect, useMemo, useRef } from "react";
import { createGlobalStyle } from "styled-components";
import * as yup from "yup";
export const commitButtonPath = "/commit-button";

declare const CommitWidgetModal: (props: Record<string, unknown>) => any;
declare const PurchaseOverviewModal: (props: Record<string, unknown>) => any;

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;

    font-family: "Plus Jakarta Sans", sans-serif;

    margin: 0;
    padding: 0;
    font-style: normal;

    height: unset;
  }
  #root{
    display: flex;
  }
`;
const emptyObject = {};
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
  const props = window.xprops ?? emptyObject;
  const { renderToSelector, buttonStyle, ...commitWidgetProps } = props;
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
            "iframe"
          );
        }}
        onTaglineClick={() => {
          PurchaseOverviewModal({
            modalMargin
          }).renderTo(window.parent, renderToSelector || "body", "iframe");
        }}
      />
    </>
  );
}
