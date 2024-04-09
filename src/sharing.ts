import { API_ROUTES } from "./constants";
import { ApiResponse, ApiShare } from "./types";

export async function getSharedCampaign(campaignId: string, handle: string) {
  const params = new URLSearchParams({ campaignId, handle });

  const share = await fetch(`${API_ROUTES.share}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = (await share.json()) as unknown as ApiResponse<ApiShare>;

  return result;
}

export async function createCampaignLink(campaignId: string) {
  const link = await fetch(API_ROUTES.links, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ campaignId }),
  });

  const result = (await link.json()) as unknown as ApiResponse<{
    url: string;
  }>;

  return result;
}

export async function getLinks() {
  const links = await fetch(API_ROUTES.links, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = (await links.json()) as unknown as ApiResponse<{
    links: {
      campaignId: string;
      url: string;
    }[];
  }>;

  return result;
}
