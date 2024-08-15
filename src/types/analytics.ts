/**
 * Conversion time type for analytics.
 */
export type ConversionTime = {
  time: string;
  count: number;
};

/**
 * Campaign analytics type retrieved from the API.
 */
export type CampaignAnalytics = {
  totals: {
    converted: number;
    started: number;
  };
  payouts: {
    amount: number;
    count: number;
  };
  volume?: number | null;
  conversions: {
    '15min': ConversionTime[];
    '1hr': ConversionTime[];
    '1d': ConversionTime[];
  };
};
