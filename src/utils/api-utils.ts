import { ApiInputVerify } from "../types";

export function dateToUnixTimestamp(date: Date) {
  return Math.floor(date.getTime());
}

export function getVerifyBody({ payload, authType, pubKey }: ApiInputVerify) {
  const body =
    authType === "siws"
      ? {
          authType,
          pubKey,
          payload: {
            input: payload.input,
            output: {
              account: {
                ...payload.output.account,
                publicKey: Array.from(
                  new Uint8Array(payload.output.account.publicKey),
                ),
              },
              signature: new Uint8Array(payload.output.signature),
              signedMessage: new Uint8Array(payload.output.signedMessage),
            },
          },
        }
      : {
          authType,
          pubKey,
          payload: {
            input: payload.input,
            output: payload.output,
          },
        };

  return body;
}

export function getRequestHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
