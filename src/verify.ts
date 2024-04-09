import { API_ROUTES } from "./constants";
import { ApiInputVerify, ApiResponse } from "./types";

export async function getIdentifyPayload() {
  const identify = await fetch(API_ROUTES.identify, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = (await identify.json()) as unknown as ApiResponse<{
    payload: {
      statement: string;
      issuedAt: string;
      expirationTime: string;
    };
  }>;

  return result;
}

export async function verify(body: ApiInputVerify) {
  const verify = await fetch(API_ROUTES.verify, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = (await verify.json()) as unknown as ApiResponse<{
    token: string;
    pubKey: string;
    verified: boolean;
    username?: string;
    twitter?: string;
    profileImage?: string;
    isPublisher: boolean;
  }>;

  return result;
}
