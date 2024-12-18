/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */

import { CommitButtonView } from "@bosonprotocol/react-kit";
import { ElementRef, useCallback, useEffect, useMemo, useRef } from "react";
import { createGlobalStyle, css, CSSProperties } from "styled-components";
import * as yup from "yup";

import { useProps } from "../../../hooks/useProps";
import { GlobalStyle } from "../styles";
export const commitButtonPath = "/commit-button";

declare const CommitWidgetModal: (props: Record<string, unknown>) => any;

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

const CommitButtonGlobalStyle = createGlobalStyle<{
  $alignItems?: CSSProperties["alignItems"];
  $justifyContent?: CSSProperties["justifyContent"];
}>`
    html, body, #root{
      height: 100%
    }
    #root {
      display: flex;
      ${({ $justifyContent }) =>
        $justifyContent &&
        css`
          justify-content: ${$justifyContent};
        `}
        ${({ $alignItems }) =>
          $alignItems &&
          css`
            align-items: ${$alignItems};
          `}
    }
  `;
export function CommitButton() {
  const ref = useRef<ElementRef<"div">>(null);
  const { props } = useProps();
  const {
    renderToSelector,
    buttonStyle,
    containerStyle,
    context,
    ...commitWidgetProps
  } = props;

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
        shape: yup
          .mixed<"sharp" | "rounded" | "pill">()
          .oneOf(["sharp", "rounded", "pill"])
          .optional(),
        color: yup
          .mixed<"green" | "black" | "white">()
          .oneOf(["green", "black", "white"])
          .optional(),
        layout: yup
          .mixed<"vertical" | "horizontal">()
          .oneOf(["vertical", "horizontal"])
          .optional()
      })
      .validateSync(buttonStyle);
    if (typeof buttonStyle === "object") {
      return buttonStyleValidated;
    }
    return {} as typeof buttonStyleValidated;
  }, [buttonStyle]);
  const containerStyleObj = useMemo(() => {
    const containerStyleValidated = yup
      .object({
        justifyContent: yup
          .mixed<
            | "initial"
            | "flex-start"
            | "flex-end"
            | "center"
            | "space-between"
            | "space-around"
            | "space-evenly"
          >()
          .oneOf([
            "initial",
            "flex-start",
            "flex-end",
            "center",
            "space-between",
            "space-around",
            "space-evenly"
          ])
          .optional(),
        alignItems: yup
          .mixed<
            | "initial"
            | "flex-start"
            | "flex-end"
            | "center"
            | "baseline"
            | "stretch"
          >()
          .oneOf([
            "initial",
            "flex-start",
            "flex-end",
            "center",
            "baseline",
            "stretch"
          ])
          .optional()
      })
      .validateSync(containerStyle);
    if (typeof containerStyle === "object") {
      return containerStyleValidated;
    }
    return {} as typeof containerStyleValidated;
  }, [containerStyle]);
  const validatedContext = useMemo(() => {
    if (!context) {
      return "iframe";
    }

    if (
      yup
        .mixed<"iframe" | "popup">()
        .oneOf(["iframe", "popup"])
        .isValidSync(context)
    ) {
      return context;
    }
    throw new Error(
      `"context" must be either "iframe" or "popup", "${context}" given`
    );
  }, [context]);
  const renderToValue = renderToSelector || "body";
  const bodyOverflow = useMemo(() => {
    return renderToValue === "body" ? "hidden" : undefined;
  }, [renderToValue]);
  return (
    <>
      <GlobalStyle />
      <CommitButtonGlobalStyle
        $justifyContent={containerStyleObj.justifyContent}
        $alignItems={containerStyleObj.alignItems}
      />
      <CommitButtonView
        minWidth={buttonStyleObj.minWidth}
        minHeight={buttonStyleObj.minHeight}
        shape={buttonStyleObj.shape}
        color={buttonStyleObj.color}
        layout={buttonStyleObj.layout}
        ref={ref}
        disabled={"disabled" in props && !!props.disabled}
        onClick={() => {
          CommitWidgetModal({
            bodyOverflow,
            ...commitWidgetProps,
            onClose: () => {
              if (
                typeof props.onCloseCommitButton === "function" &&
                props.onCloseCommitButton
              ) {
                props.onCloseCommitButton();
              }
            },
            modalMargin
          }).renderTo(window.parent, renderToValue, validatedContext);
          if (
            typeof props.onClickCommitButton === "function" &&
            props.onClickCommitButton
          ) {
            props.onClickCommitButton();
          }
        }}
      />
    </>
  );
}
