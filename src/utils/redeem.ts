/* eslint-disable @typescript-eslint/no-explicit-any */
import { RedemptionWidgetProps } from "@bosonprotocol/react-kit";
import { FormType } from "@bosonprotocol/react-kit/dist/cjs/components/modal/components/Redeem/RedeemFormModel";
import { DeliveryInfoCallbackResponse } from "@bosonprotocol/react-kit/dist/cjs/hooks/callbacks/types";

import { waitForResponse } from "./events";
import { extractBooleanParam } from "./params";

interface DeliveryInfoData {
  deliveryInfoDecoded: FormType;
  sendDeliveryInfoThroughXMTP: boolean;
  targetOrigin?: string;
  shouldWaitForResponse: boolean;
  postDeliveryInfoUrl?: string;
  postDeliveryInfoHeadersDecoded?: any;
  postRedemptionSubmittedUrl?: string;
  postRedemptionSubmittedHeadersDecoded?: any;
  postRedemptionConfirmedUrl?: string;
  postRedemptionConfirmedHeadersDecoded?: any;
  eventTag: string;
}

export function parseDeliveryInfoData(
  searchParams: URLSearchParams
): DeliveryInfoData {
  const deliveryInfo = searchParams.get("deliveryInfo") || undefined;
  let deliveryInfoDecoded = undefined;

  if (deliveryInfo) {
    try {
      deliveryInfoDecoded = JSON.parse(deliveryInfo);
      for (const key of Object.keys(deliveryInfoDecoded)) {
        deliveryInfoDecoded[key] = decodeURIComponent(deliveryInfoDecoded[key]);
      }
    } catch (e) {
      console.error(
        `Unable to parse JSON from deliveryInfo='${deliveryInfo}': ${e}`
      );
    }
  }

  const sendDeliveryInfoThroughXMTP = extractBooleanParam(
    searchParams.get("sendDeliveryInfoThroughXMTP"),
    true
  );
  const targetOrigin = searchParams.get("targetOrigin") || undefined;
  const shouldWaitForResponse = extractBooleanParam(
    searchParams.get("shouldWaitForResponse"),
    false
  );

  const postDeliveryInfoUrl =
    searchParams.get("postDeliveryInfoUrl") || undefined;
  const postDeliveryInfoHeaders =
    searchParams.get("postDeliveryInfoHeaders") || undefined;
  let postDeliveryInfoHeadersDecoded = undefined;

  if (postDeliveryInfoHeaders) {
    try {
      postDeliveryInfoHeadersDecoded = JSON.parse(postDeliveryInfoHeaders);
    } catch (e) {
      console.error(
        `Unable to parse JSON from postDeliveryInfoHeaders='${postDeliveryInfoHeaders}': ${e}`
      );
    }
  }

  const postRedemptionSubmittedUrl =
    searchParams.get("postRedemptionSubmittedUrl") || undefined;
  const postRedemptionSubmittedHeaders =
    searchParams.get("postRedemptionSubmittedHeaders") || undefined;
  let postRedemptionSubmittedHeadersDecoded = undefined;

  if (postRedemptionSubmittedHeaders) {
    try {
      postRedemptionSubmittedHeadersDecoded = JSON.parse(
        postRedemptionSubmittedHeaders
      );
    } catch (e) {
      console.error(
        `Unable to parse JSON from postRedemptionSubmittedHeaders='${postRedemptionSubmittedHeaders}': ${e}`
      );
    }
  }

  const postRedemptionConfirmedUrl =
    searchParams.get("postRedemptionConfirmedUrl") || undefined;
  const postRedemptionConfirmedHeaders =
    searchParams.get("postRedemptionConfirmedHeaders") || undefined;
  let postRedemptionConfirmedHeadersDecoded = undefined;

  if (postRedemptionConfirmedHeaders) {
    try {
      postRedemptionConfirmedHeadersDecoded = JSON.parse(
        postRedemptionConfirmedHeaders
      );
    } catch (e) {
      console.error(
        `Unable to parse JSON from postRedemptionConfirmedHeaders='${postRedemptionConfirmedHeaders}': ${e}`
      );
    }
  }
  const eventTag = searchParams.get("eventTag") as string;

  return {
    deliveryInfoDecoded,
    sendDeliveryInfoThroughXMTP,
    targetOrigin,
    shouldWaitForResponse,
    postDeliveryInfoUrl,
    postDeliveryInfoHeadersDecoded,
    postRedemptionSubmittedUrl,
    postRedemptionSubmittedHeadersDecoded,
    postRedemptionConfirmedUrl,
    postRedemptionConfirmedHeadersDecoded,
    eventTag
  };
}

export function createDeliveryInfoHandler(
  targetOrigin: string | undefined,
  shouldWaitForResponse: boolean,
  eventTag?: string
): RedemptionWidgetProps["deliveryInfoHandler"] {
  if (!targetOrigin) return undefined;

  return async (message, signature) => {
    try {
      const event = {
        type: "boson-delivery-info",
        message,
        signature,
        tag: eventTag
      };
      // precaution: register to the response before posting the message
      const responseType = "boson-delivery-info-response";
      const _waitForResponse = shouldWaitForResponse
        ? (waitForResponse(responseType) as Promise<{
            message: DeliveryInfoCallbackResponse;
            origin: string;
          }>)
        : undefined;
      // post the message
      console.log(`Post '${event.type}' message to '${targetOrigin}'`);
      window.parent.postMessage(event, targetOrigin);
      if (_waitForResponse) {
        console.log(`Wait for response '${responseType}' message`);
        const response = await _waitForResponse;
        console.log(
          `Received response '${responseType}' from '${
            response.origin
          }'. Content: '${JSON.stringify(JSON.stringify(response.message))}'`
        );
        return response.message;
      }
      return {
        accepted: true,
        resume: true,
        reason: ""
      };
    } catch (e) {
      console.error(`Unable to post message ${e}`);
      return {
        accepted: false,
        reason: "",
        resume: false
      };
    }
  };
}

export function createRedemptionSubmittedHandler(
  targetOrigin: string | undefined
): RedemptionWidgetProps["redemptionSubmittedHandler"] {
  if (!targetOrigin) return undefined;

  return async (message) => {
    try {
      const event = {
        type: "boson-redemption-submitted",
        message
      };
      // post the message
      console.log(`Post ${event.type} message to ${targetOrigin}`);
      window.parent.postMessage(event, targetOrigin);
      return {
        accepted: true,
        reason: ""
      };
    } catch (e) {
      console.error(`Unable to post message ${e}`);
      return {
        accepted: false,
        reason: ""
      };
    }
  };
}

export function createRedemptionConfirmedHandler(
  targetOrigin: string | undefined
): RedemptionWidgetProps["redemptionConfirmedHandler"] {
  if (!targetOrigin) return undefined;

  return async (message) => {
    try {
      const event = {
        type: "boson-redemption-confirmed",
        message
      };
      // post the message
      console.log(`Post ${event.type} message to ${targetOrigin}`);
      window.parent.postMessage(event, targetOrigin);
      return {
        accepted: true,
        reason: ""
      };
    } catch (e) {
      console.error(`Unable to post message ${e}`);
      return {
        accepted: false,
        reason: ""
      };
    }
  };
}
