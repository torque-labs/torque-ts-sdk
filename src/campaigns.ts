import { TorqueClient } from "./client";
import { TORQUE_API_ROUTES } from "./constants";
import { ApiCampaign, ApiResponse } from "./types";
import { CreateCampaignInput } from "./types";
import { dateToUnixTimestamp, base64ToUint8Array } from "./utils";

/**
 * Creates a new campaign using the Torque API.
 *
 * This function prepares and sends a request to create a campaign with the provided details.
 * It formats the input data, converts the serialized transaction from base64 to Uint8Array,
 * and constructs the request body to be sent. Upon successful creation, it returns the campaign ID
 * and signature. If the operation fails, it throws an error with a descriptive message.
 *
 * @param client - The TorqueClient instance used to perform the API request.
 * @param data - The input data for creating the campaign, including campaign details and event type information.
 * @param serializedTx - The serialized transaction as a base64 string, related to the campaign creation.
 * @returns A Promise resolving to an object containing the `campaignId` and `signature` if the creation is successful.
 * @throws An error if the campaign creation fails or if the API returns a status other than "SUCCESS".
 */
export async function createCampaign(
  client: TorqueClient,
  data: CreateCampaignInput,
  serializedTx: string,
) {
  const formattedData = {
    publisherRewardType: data.publisherRewardType?.toUpperCase(),
    eventTokenAddress: data.eventType?.tokenAddress,
    eventProgramAddress:
      data.eventType?.poolAddress || data.eventType?.programAddress,
    eventType: data.campaignType === "Click" ? "CLICK" : data.eventType?.type,
    minAmount: data.eventType?.minAmount || 0,
    proposal: data.eventType?.proposal || "",
  };

  try {
    const serTx = base64ToUint8Array(serializedTx);

    const requestBody = {
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
      proposal: formattedData.proposal,
      audience: data.audiance || null,
      serializedTx: serTx,
    };

    const campaign = await client.apiFetch(TORQUE_API_ROUTES.campaigns, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    const result = (await campaign.json()) as unknown as ApiResponse<{
      campaignId: string;
      signature: string;
    }>;

    if (result.status === "SUCCESS") {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error("There was an error creating the campaign.");
  }
}

/**
 * Ends an existing campaign using the Torque API.
 *
 * This function sends a DELETE request to the Torque API to end a campaign identified by its `campaignId`.
 * It requires the `serializedTx` string, which is related to the campaign ending transaction. Upon successful
 * operation, it returns the signature of the transaction as confirmation. If the operation fails or the API
 * returns a status other than "SUCCESS", it throws an error with a descriptive message.
 *
 * @param client - The TorqueClient instance used to perform the API request.
 * @param campaignId - The unique identifier of the campaign to be ended.
 * @param serializedTx - The serialized transaction as a base64 string, related to the campaign ending.
 * @returns A Promise resolving to an object containing the `signature` of the transaction if the ending is successful.
 * @throws An error if the campaign ending fails or if the API returns a status other than "SUCCESS".
 */
export async function endCampaign(
  client: TorqueClient,
  campaignId: string,
  serializedTx: string,
) {
  try {
    const params = new URLSearchParams({ campaignId, serializedTx });

    const campaign = await client.apiFetch(
      `${TORQUE_API_ROUTES.campaigns}?${params}`,
      {
        method: "DELETE",
      },
    );

    const result = (await campaign.json()) as unknown as ApiResponse<{
      signature: string;
    }>;

    if (result.status === "SUCCESS") {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error("There was an error ending the campaign.");
  }
}

/**
 * Retrieves a list of active campaigns from the Torque API.
 *
 * This function sends a GET request to the Torque API to fetch all campaigns that are currently marked as "ACTIVE".
 * It constructs a query with the status parameter set to "ACTIVE" and sends the request. Upon receiving a response,
 * it parses the JSON and checks the status of the response. If the status is "SUCCESS", it returns the list of active
 * campaigns. Otherwise, it throws an error with the message received from the API.
 *
 * @returns A Promise resolving to an array of `ApiCampaign` objects representing the active campaigns.
 * @throws An error if the fetch operation fails, or if the API returns a status other than "SUCCESS".
 */
export async function getCampaigns() {
  const params = new URLSearchParams({ status: "ACTIVE" });

  const campaigns = await fetch(
    `${TORQUE_API_ROUTES.campaigns}?${params.toString()}`,
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

  if (result.status === "SUCCESS") {
    return result.data.campaigns;
  } else {
    throw new Error(result.message);
  }
}

/**
 * Creates a campaign share link using the Torque API.
 *
 * This function sends a POST request to the Torque API to create a new share link for a specific campaign
 * identified by its `campaignId`. The function constructs the request body with the `campaignId` and
 * sends the request. Upon successful creation, it returns the URL of the newly created campaign link.
 * If the operation fails or the API returns a status other than "SUCCESS", it throws an error with a
 * descriptive message.
 *
 * @param client - The TorqueClient instance used to perform the API request.
 * @param campaignId - The unique identifier of the campaign for which the link is to be created.
 * @returns A Promise resolving to the URL of the newly created campaign share link.
 * @throws An error if the link creation fails or if the API returns a status other than "SUCCESS".
 */
export async function createCampaignLink(
  client: TorqueClient,
  campaignId: string,
) {
  const link = await client.apiFetch(TORQUE_API_ROUTES.links, {
    method: "POST",
    body: JSON.stringify({ campaignId }),
  });

  const result = (await link.json()) as unknown as ApiResponse<{
    url: string;
  }>;

  if (result.status === "SUCCESS") {
    return result.data.url;
  } else {
    throw new Error(result.message);
  }
}

/**
 * Creates a campaign link using the Torque API.
 *
 * This function sends a POST request to the Torque API to create a new link for a specific campaign
 * identified by its `campaignId`. The function constructs the request body with the `campaignId` and
 * sends the request. Upon successful creation, it returns the URL of the newly created campaign link.
 * If the operation fails or the API returns a status other than "SUCCESS", it throws an error with a
 * descriptive message.
 *
 * @param client - The TorqueClient instance used to perform the API request.
 * @param campaignId - The unique identifier of the campaign for which the link is to be created.
 * @returns A Promise resolving to the URL of the newly created campaign link.
 * @throws An error if the link creation fails or if the API returns a status other than "SUCCESS".
 */
export async function getLinks(client: TorqueClient) {
  const links = await client.apiFetch(TORQUE_API_ROUTES.links, {
    method: "GET",
  });

  const result = (await links.json()) as unknown as ApiResponse<{
    links: {
      campaignId: string;
      url: string;
    }[];
  }>;

  if (result.status === "SUCCESS") {
    return result.data.links;
  } else {
    throw new Error(result.message);
  }
}
