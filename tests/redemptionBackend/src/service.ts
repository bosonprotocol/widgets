import { verifyMessage } from "ethers/lib/utils";

export async function deliveryInfo(body: { [key: string]: string }) {
  if (!body.message) {
    throw `'message' field missing in request body`;
  }
  if (!body.signature) {
    throw `'signature' field missing in request body`;
  }
  try {
    console.log(JSON.stringify(body.message));
    const signerAddr = await verifyMessage(
      JSON.stringify(body.message),
      body.signature
    );
    console.log("Redemption message has been signed by", signerAddr);
  } catch (e) {
    throw `Unable to verify message signature: ${e}`;
  }
}

export async function submitted(body: { [key: string]: string }) {
  try {
    console.log("Redemption tx has been submitted", body);
  } catch (e) {
    throw `Unable to verify message signature: ${e}`;
  }
}

export async function confirmed(body: { [key: string]: string }) {
  try {
    console.log("Redemption tx has been confirmed", body);
  } catch (e) {
    throw `Unable to verify message signature: ${e}`;
  }
}
