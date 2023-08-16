import { verifyMessage } from "ethers/lib/utils";

export async function receive(body: { [key: string]: string }) {
  if (!body.message) {
    throw `'message' field missing in request body`;
  }
  if (!body.signature) {
    throw `'signature' field missing in request body`;
  }
  try {
    const signerAddr = await verifyMessage(
      JSON.stringify(body.message),
      body.signature
    );
    console.log("Redemption message has been signed by", signerAddr);
  } catch (e) {
    throw `Unable to verify message signature: ${e}`;
  }
}
