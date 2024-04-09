import { API_ROUTES } from "./constants";
import { ApiCampaign, ApiResponse, CreateCampaignData } from "./types";
import { dateToUnixTimestamp } from "./utils/api-utils";
import { base64ToUint8Array } from "./utils/protocol-utils";

export async function getCampaigns() {
  const params = new URLSearchParams({ status: "ACTIVE" });

  const campaigns = await fetch(
    `${API_ROUTES.campaigns}?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const result = (await campaigns.json()) as unknown as ApiResponse<{
    campaigns: ApiCampaign[];
  }>;

  return result;
}

export async function createCampaign(
  data: Partial<CreateCampaignData>,
  pubKey: string,
  serializedTx: string | null,
) {
  if (!pubKey) {
    throw new Error("No pubKey provided.");
  }

  const formattedData = {
    publisherRewardType: data.publisherRewardType?.toUpperCase(),
    eventTokenAddress: data.eventType?.tokenAddress,
    eventProgramAddress:
      data.eventType?.poolAddress || data.eventType?.programAddress,
    eventType: data.campaignType === "Click" ? "CLICK" : data.eventType?.type,
    minAmount: data.eventType?.minAmount || 0,
    proposal: data.eventType?.proposal || "",
  };

  const serTx = base64ToUint8Array(serializedTx!);

  const requestBody = {
    pubKey,
    campaignName: data.campaignName,
    campaignType: data.campaignType,
    landingPage: data.landingPage,
    eventType: data.eventType?.type || "CLICK",
    eventProgramAddress: formattedData.eventProgramAddress,
    eventTokenAddress: formattedData.eventTokenAddress,
    publisherRewardType: formattedData.publisherRewardType,
    publisherTokenAddress: data.publisherTokenAddress,
    publisherPayoutPerConversion: data.publisherPayoutPerConversion,
    conversionCount: data.conversionCount ?? 0,
    startTime: dateToUnixTimestamp(data.startDate!),
    endTime: dateToUnixTimestamp(data.endDate!),
    minAmount: formattedData.minAmount,
    proposal: null,
    audience: data.audience && data.audience !== "none" ? data.audience : null,
    serializedTx: serTx,
  };

  const campaign = await fetch(API_ROUTES.campaigns, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const result = (await campaign.json()) as unknown as ApiResponse<{
    campaignId: string;
  }>;

  return result;
}

export async function startCampaign(
  campaignId: string,
  publisherHandle: string,
) {
  const journey = await fetch(API_ROUTES.journey, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ campaignId, publisherHandle }),
  });

  const result = (await journey.json()) as unknown as ApiResponse<{
    campaignId: string;
    status: string;
  }>;

  return result;
}
