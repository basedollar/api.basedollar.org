import { z } from "zod";
import { duneFetch, zDuneResponse, zTypeGuard } from "./duneFetch";

const zDuneBdUsdcAerodromeYieldResponse = zDuneResponse(
  z.object({
    time: z.string(),
    yield_name: z.string(),
    apr: z.number().nullable(),
    daily_apr: z.number().nullable(),
    weekly_apr: z.number().nullable(),
    _30d_apr: z.number().nullable(),
    _90d_apr: z.number().nullable(),
    tvl: z.number().nullable()
  })
);

const isDuneBdUsdcAerodromeYieldResponse = zTypeGuard(zDuneBdUsdcAerodromeYieldResponse);

export const fetchBdUsdcAerodromeYieldFromDune = async ({
  apiKey,
  url
}: {
  apiKey: string;
  url: string | null;
}) => {
  if (!url) return null;

  const {
    result: { rows }
  } = await duneFetch({
    apiKey,
    url,
    validate: isDuneBdUsdcAerodromeYieldResponse
  });

  return rows.map(row => ({
    time: row.time,
    yield_name: row.yield_name,
    apr: row.apr,
    daily_apr: row.daily_apr,
    weekly_apr: row.weekly_apr,
    _30d_apr: row._30d_apr,
    _90d_apr: row._90d_apr,
    tvl: row.tvl
  }));
};
