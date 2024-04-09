import { API_ROUTES } from "./constants";
import { ApiResponse, ApiAudience } from "./types";

export async function getAudiences() {
  const audiences = await fetch(
    API_ROUTES.audiences +
      "?" +
      new URLSearchParams({
        pubKey: "all",
      }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const result = (await audiences.json()) as unknown as ApiResponse<{
    audiences: ApiAudience[];
  }>;

  return result;
}
