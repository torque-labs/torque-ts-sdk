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
  conversions: {
    '15min': ConversionTime[];
    '1hr': ConversionTime[];
    '1d': ConversionTime[];
  };
};
