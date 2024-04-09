import { API_ROUTES } from "./constants";
import { ApiResponse } from "./types";
import { base64ToUint8Array } from "./utils/protocol-utils";

export async function initPublisher(serializedTx: string) {
  const serTx = base64ToUint8Array(serializedTx!);

  const publisher = await fetch(API_ROUTES.publishers, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ serializedTx: serTx }),
  });

  const result = (await publisher.json()) as unknown as ApiResponse<{
    publisherPubKey: string;
  }>;

  return result;
}
