import { API_ROUTES } from "./constants";
import { ApiResponse } from "./types";

export async function getCurrentUser() {
  const user = await fetch(API_ROUTES.users, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = (await user.json()) as unknown as ApiResponse<{
    id: string;
    pubKey: string;
    twitter?: string;
    profileImage?: string;
    username?: string;
    isPublisher: boolean;
  }>;

  return result;
}
