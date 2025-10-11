import { NextRequest, NextResponse } from 'next/server';

// ✅ Force dynamic behavior across all layers
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

// Your validator endpoint
const METAL_EXPLORER_API =
  'https://explorer.metalblockchain.org/api/v1/validators/NodeID-eLiuwZsfPBud7FKK6zDfwDwU7Utwn3tH';

// Helper for consistent no-cache headers
function setNoCacheHeaders(response: NextResponse) {
  const noCacheHeaders = {
    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
    Pragma: 'no-cache',
    Expires: '0',
    'Surrogate-Control': 'no-store',
    'CDN-Cache-Control': 'no-cache',
    'Vercel-CDN-Cache-Control': 'no-cache',
  };
  for (const [k, v] of Object.entries(noCacheHeaders)) response.headers.set(k, v);
  return response;
}

export async function GET(_request: NextRequest) {
  const requestId = Math.random().toString(36).slice(2);
  const startTime = Date.now();

  try {
    console.log(`[${requestId}] Fetching Metal Explorer validator metrics...`);

    const cacheBuster = `?t=${Date.now()}&r=${Math.random()}`;
    const apiUrl = `${METAL_EXPLORER_API}${cacheBuster}`;

    // 🕓 Timeout-controlled fetch
    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'ChainInfra-Dashboard/1.0',
        'Cache-Control': 'no-cache',
        'X-Request-ID': requestId,
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });

    if (!apiResponse.ok) throw new Error(`HTTP ${apiResponse.status}: ${apiResponse.statusText}`);

    const validatorData = await apiResponse.json();
    const durationMs = Date.now() - startTime;
    console.log(`[${requestId}] ✅ Explorer response received in ${durationMs}ms`);

    // ---- Data extraction & normalization ----
    const now = new Date().toISOString();
    const uptime = validatorData.uptime ?? 0;
    const delegators = validatorData.delegators?.length ?? 0;
    const delegationFee = validatorData.delegationFee ?? 0;
    const connected = validatorData.connected ?? false;
    const version = validatorData.version ?? '';
    const name = validatorData.name ?? 'ChainInfra';
    const potentialReward = validatorData.potentialReward ?? 0;

    const ownedStake = validatorData.stakeAmount ?? 0;
    const delegatorStake =
      validatorData.delegators?.reduce(
        (sum: number, d: any) => sum + (d.stakeAmount ?? 0),
        0
      ) ?? 0;
    const totalStake = ownedStake + delegatorStake;

    // ---- Time calculations ----
    const startTimeSec = validatorData.startTime ?? 0;
    const endTimeSec = validatorData.endTime ?? 0;
    const durationSec = endTimeSec - startTimeSec;
    const nowSec = Date.now() / 1000;
    const elapsed = nowSec - startTimeSec;
    const progress =
      durationSec > 0 ? Math.min(100, (elapsed / durationSec) * 100) : 0;
    const durationDays = durationSec > 0 ? Math.floor(durationSec / 86400) : 0;

    const formatDate = (sec: number) =>
      new Date(sec * 1000).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

    // ---- Unit conversions ----
    const div = 1e9;
    const fmt = (val: number, fraction = 0) =>
      (val / div).toLocaleString('en-US', {
        minimumFractionDigits: fraction,
        maximumFractionDigits: fraction,
      });

    // ---- Metric object assembly ----
    const validatorMetrics = {
      uptime: {
        value: `${uptime.toFixed(3)}%`,
        label: 'Uptime',
        status: uptime >= 98 ? 'good' : uptime >= 90 ? 'warning' : 'error',
        lastUpdated: now,
      },
      delegators: {
        value: delegators.toString(),
        label: 'Delegators',
        status: 'good',
        lastUpdated: now,
      },
      totalStake: {
        value: `${fmt(totalStake)} $METAL`,
        label: 'Total Stake',
        status: 'good',
        lastUpdated: now,
      },
      ownedStake: {
        value: `${fmt(ownedStake)} $METAL`,
        label: 'Owned Stake',
        status: 'good',
        lastUpdated: now,
      },
      delegatorStake: {
        value: `${fmt(delegatorStake)} $METAL`,
        label: 'Delegator Stake',
        status: 'good',
        lastUpdated: now,
      },
      delegationFee: {
        value: `${delegationFee}%`,
        label: 'Delegation Fee',
        status: 'good',
        lastUpdated: now,
      },
    };

    const validatorInfo = {
      name,
      version,
      status: connected ? 'Active' : 'Inactive',
      duration: `${durationDays} days`,
      startDate: formatDate(startTimeSec),
      endDate: formatDate(endTimeSec),
      progress: `${progress.toFixed(2)}%`,
      connected,
      potentialReward: `${fmt(potentialReward, 2)} $METAL`,
    };

    // ✅ Final response
    const response = NextResponse.json({
      success: true,
      data: { validatorMetrics, validatorInfo, lastUpdated: now },
      note: 'Live data fetched from Metal Explorer API',
    });
    return setNoCacheHeaders(response);
  } catch (error) {
    console.error('❌ Metal Explorer API fetch failed:', error);
    const now = new Date().toISOString();

    // Fallback static snapshot
    const fallbackOwned = 296_099_000_000_000;
    const fallbackDelegators = 11;
    const fallbackDelegator = 1_183_396_000_000_000;
    const fallbackTotal = fallbackOwned + fallbackDelegator;

    const metrics = {
      uptime: { value: '99.999%', label: 'Uptime', status: 'good', lastUpdated: now },
      delegators: {
        value: fallbackDelegators.toString(),
        label: 'Delegators',
        status: 'good',
        lastUpdated: now,
      },
      totalStake: {
        value: `${(fallbackTotal / 1e9).toLocaleString()} $METAL`,
        label: 'Total Stake',
        status: 'good',
        lastUpdated: now,
      },
      ownedStake: {
        value: `${(fallbackOwned / 1e9).toLocaleString()} $METAL`,
        label: 'Owned Stake',
        status: 'good',
        lastUpdated: now,
      },
      delegatorStake: {
        value: `${(fallbackDelegator / 1e9).toLocaleString()} $METAL`,
        label: 'Delegator Stake',
        status: 'good',
        lastUpdated: now,
      },
      delegationFee: {
        value: '8%',
        label: 'Delegation Fee',
        status: 'good',
        lastUpdated: now,
      },
    };

    const errorResponse = NextResponse.json({
      success: false,
      data: {
        validatorMetrics: metrics,
        lastUpdated: now,
        note: 'Fallback static data due to API error',
      },
      error:
        error instanceof Error
          ? error.message
          : 'Unknown Metal Explorer error',
    });
    return setNoCacheHeaders(errorResponse);
  }
}
