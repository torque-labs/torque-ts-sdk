import { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import { TorqueClient } from "./client";
import { TORQUE_API_ROUTES } from "./constants";
import { transaction } from "./transactions";
import {
  ApiCampaign,
  ApiResponse,
  ApiTxnTypes,
  CampaignCreateInput,
  CampaignEndInput,
} from "./types";

/**
 * Retrieves a list of active campaigns from the Torque API.
 *
 * This function sends a GET request to the Torque API to fetch all campaigns that are currently marked as "ACTIVE".
 * It constructs a query with the status parameter set to "ACTIVE" and sends the request. Upon receiving a response,
 * it parses the JSON and checks the status of the response. If the status is "SUCCESS", it returns the list of active
 * campaigns. Otherwise, it throws an error with the message received from the API.
 *
 * @returns {Promise<ApiCampaign[]>} A Promise resolving to an array of `ApiCampaign` objects representing the active campaigns.
 * @throws {Error} An error if the fetch operation fails, or if the API returns a status other than "SUCCESS".
 */
export async function getCampaigns(this: TorqueClient) {
  if (!this.publisherHandle) {
    throw new Error("No publisher handle provided.");
  }

  const params = new URLSearchParams({ publisher: this.publisherHandle });

  const campaigns = await this.apiFetch(
    `${TORQUE_API_ROUTES.userCampaigns}?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
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
 * Fetches all of the user's share links using the Torque API.
 *
 * This function sends a GET request to the Torque API to fetch all share links for a for the
 * current user. Upon success, it returns an array of URLs and campaign IDs of the user's share links.
 * If the operation fails or the API returns a status other than "SUCCESS", it throws an error with a
 * descriptive message.
 *
 * @returns {Promise<ApiLinks>} A Promise resolving to the URLs of the user's share links.
 * @throws {Error} An error if the link fetch fails or if the API returns a status other than "SUCCESS".
 */
export async function getLinks(this: TorqueClient) {
  const links = await this.apiFetch(TORQUE_API_ROUTES.links, {
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

/**
 * Create a campaign using the passed wallet and campaign creation data.
 *
 * This function creates a new campaign using the provided wallet and campaign data.
 * It constructs an input object with the transaction type and campaign data, and then
 * calls a function to prepare and execute the transaction.
 *
 * @param {SignerWalletAdapter} wallet - The wallet used to sign the transaction.
 * @param {CampaignCreateInput} data - The data required to create a new campaign.
 * @returns {Promise<string>} The signature of the transaction.
 * @throws {Error} If there is an error creating the campaign.
 */
export async function createCampaign(
  this: TorqueClient,
  wallet: SignerWalletAdapter,
  data: CampaignCreateInput
) {
  try {
    const input = {
      txnType: ApiTxnTypes.CampaignCreate,
      data,
    } as const;

    const signature = await transaction(this, wallet, input);

    return signature;
  } catch (error) {
    console.error(error);
    throw new Error("There was an error creating the campaign.");
  }
}

/**
 * Ends a campaign using the provided wallet and campaign campaignId.
 *
 * This function will prepare and execute the end campaign function. If the transaction
 * is successful, the function returns the signature of the transaction. If an error occurs
 * during the process, it is logged and a new error with a user-friendly message is thrown.
 *
 * @param {SignerWalletAdapter} wallet - The wallet used to sign the transaction.
 * @param {string} campaignId - The data required to end the campaign.
 * @returns {Promise<string>} The signature of the transaction.
 * @throws {Error} If there is an error ending the campaign.
 */
export async function endCampaign(
  this: TorqueClient,
  wallet: SignerWalletAdapter,
  campaignId: CampaignEndInput["campaignId"]
) {
  try {
    const input = {
      txnType: ApiTxnTypes.CampaignEnd,
      data: {
        campaignId,
      },
    } as const;

    const signature = await transaction(this, wallet, input);

    return signature;
  } catch (error) {
    console.error(error);
    throw new Error("There was an error ending the campaign.");
  }
}
