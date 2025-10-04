import { NextRequest, NextResponse } from 'next/server';

const METAL_EXPLORER_API = 'https://explorer.metalblockchain.org/api/v1/validators/NodeID-eLiuwZsfPBud7FKK6zDfwDwU7Utwn3tH';

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    const requestId = Math.random().toString(36).substring(7);
    console.log(`[${new Date().toISOString()}] [${requestId}] Fetching validator metrics from Metal Explorer API...`);
    
    // Add cache busting parameters
    const cacheBuster = `?t=${Date.now()}&r=${Math.random()}`;
    const apiUrl = `${METAL_EXPLORER_API}${cacheBuster}`;
    
    // Fetch real data from Metal Explorer API
    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ChainInfra-Website/1.0',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'X-Request-ID': requestId
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(15000) // 15 second timeout
    });

    if (!apiResponse.ok) {
      console.error(`Metal Explorer API error: ${apiResponse.status} ${apiResponse.statusText}`);
      throw new Error(`Metal Explorer API responded with status: ${apiResponse.status}`);
    }

    const validatorData = await apiResponse.json();
    const fetchTime = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] [${requestId}] Successfully fetched validator data in ${fetchTime}ms:`, {
      name: validatorData.name,
      uptime: validatorData.uptime,
      delegators: validatorData.delegators?.length,
      stakeAmount: validatorData.stakeAmount,
      connected: validatorData.connected,
      version: validatorData.version
    });
    
    // Log raw API response for debugging
    console.log(`[${new Date().toISOString()}] [${requestId}] Raw API response:`, JSON.stringify(validatorData, null, 2));
    
    const timestamp = new Date().toISOString();

    // Process real validator data from Metal Explorer API
    const uptime = validatorData.uptime || 0;
    const delegators = validatorData.delegators?.length || 0;
    const delegationFee = validatorData.delegationFee || 0;
    const potentialReward = validatorData.potentialReward || 0;
    const connected = validatorData.connected || false;
    const name = validatorData.name || 'ChainInfra';
    const version = validatorData.version || '';
    const validatorStartTime = validatorData.startTime || 0;
    const endTime = validatorData.endTime || 0;

    // Calculate delegator stake (sum of all delegator stakes from API)
    const delegatorStake = validatorData.delegators?.reduce((sum: number, delegator: any) => {
      return sum + (delegator.stakeAmount || 0);
    }, 0) || 0;

    // Owned stake is the validator's own stake (stakeAmount from API)
    const ownedStake = validatorData.stakeAmount || 0;

    // Total stake = owned stake + delegator stake
    const totalStake = ownedStake + delegatorStake;


    // Calculate duration and progress
    // Based on API data: startTime: 1753304912, endTime: 1761945532
    // Duration: 100 days (8640000 seconds)
    // Current progress: 47.09%
    const currentTime = Date.now() / 1000; // Current time in seconds
    const duration = endTime - validatorStartTime; // Total duration in seconds
    const elapsed = currentTime - validatorStartTime; // Elapsed time in seconds
    const progress = duration > 0 ? Math.min(100, Math.max(0, (elapsed / duration) * 100)) : 47.09; // Progress percentage

    // Format dates
    const startDate = new Date(validatorStartTime * 1000);
    const endDate = new Date(endTime * 1000);
    const startDateFormatted = startDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    const endDateFormatted = endDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    // Calculate duration in days
    // Based on API data: duration should be 100 days
    const durationDays = duration > 0 ? Math.floor(duration / (24 * 60 * 60)) : 100;

    // Format stakes (convert from smallest unit to $METAL using 10^9)
    const formattedTotalStake = (totalStake / Math.pow(10, 9)).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    const formattedOwnedStake = (ownedStake / Math.pow(10, 9)).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    const formattedDelegatorStake = (delegatorStake / Math.pow(10, 9)).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });


    // Format potential reward
    const formattedReward = (potentialReward / Math.pow(10, 9)).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    // System health data removed as requested

    // Real validator metrics from Metal Explorer API with improved uptime thresholds
    const validatorMetrics = {
      uptime: { 
        value: `${uptime.toFixed(3)}%`, 
        label: 'Uptime', 
        status: uptime >= 98 ? 'good' : uptime >= 90 ? 'warning' : 'error', // FIXED: More reasonable thresholds
        lastUpdated: timestamp 
      },
      delegators: { 
        value: delegators.toString(), 
        label: 'Delegators', 
        status: 'good', 
        lastUpdated: timestamp 
      },
      totalStake: { 
        value: `${formattedTotalStake} $METAL`, 
        label: 'Total Stake', 
        status: 'good', 
        lastUpdated: timestamp 
      },
      ownedStake: { 
        value: `${formattedOwnedStake} $METAL`, 
        label: 'Owned Stake', 
        status: 'good', 
        lastUpdated: timestamp 
      },
      delegatorStake: { 
        value: `${formattedDelegatorStake} $METAL`, 
        label: 'Delegator Stake', 
        status: 'good', 
        lastUpdated: timestamp 
      },
      delegationFee: { 
        value: `${delegationFee}%`, 
        label: 'Delegation Fee', 
        status: 'good', 
        lastUpdated: timestamp 
      }
    };

    const successResponse = NextResponse.json({
      success: true,
      data: {
        validatorMetrics,
        lastUpdated: timestamp,
        validatorInfo: {
          name,
          version,
          status: connected ? 'Active' : 'Inactive',
          duration: `${durationDays} days`,
          startDate: startDateFormatted,
          endDate: endDateFormatted,
          progress: `${progress.toFixed(2)}%`,
          connected,
          potentialReward: `${formattedReward} $METAL`
        },
        note: "Real-time data from Metal Explorer API"
      }
    });

    // Add headers to prevent caching at all levels
    successResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    successResponse.headers.set('Pragma', 'no-cache');
    successResponse.headers.set('Expires', '0');
    successResponse.headers.set('Surrogate-Control', 'no-store');
    successResponse.headers.set('CDN-Cache-Control', 'no-cache');
    successResponse.headers.set('Vercel-CDN-Cache-Control', 'no-cache');
    
    return successResponse;

  } catch (error) {
    console.error('Error fetching validator metrics from Metal Explorer:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Fallback to static data if API fails
    const fallbackTimestamp = new Date().toISOString();

    // Fallback data with correct calculations
    const fallbackOwnedStake = 296099000000000; // 296,099 $METAL
    const fallbackDelegatorStake = 1183396000000000; // 1,183,396 $METAL
    const fallbackTotalStake = fallbackOwnedStake + fallbackDelegatorStake; // 1,479,495 $METAL

    const validatorMetrics = {
      uptime: { value: '99.999%', label: 'Uptime', status: 'good', lastUpdated: fallbackTimestamp },
      delegators: { value: '11', label: 'Delegators', status: 'good', lastUpdated: fallbackTimestamp },
      totalStake: { 
        value: `${(fallbackTotalStake / Math.pow(10, 9)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} $METAL`, 
        label: 'Total Stake', 
        status: 'good', 
        lastUpdated: fallbackTimestamp 
      },
      ownedStake: { 
        value: `${(fallbackOwnedStake / Math.pow(10, 9)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} $METAL`, 
        label: 'Owned Stake', 
        status: 'good', 
        lastUpdated: fallbackTimestamp 
      },
      delegatorStake: { 
        value: `${(fallbackDelegatorStake / Math.pow(10, 9)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} $METAL`, 
        label: 'Delegator Stake', 
        status: 'good', 
        lastUpdated: fallbackTimestamp 
      },
      delegationFee: { value: '8%', label: 'Delegation Fee', status: 'good', lastUpdated: fallbackTimestamp }
    };

    const errorResponse = NextResponse.json({
      success: false,
      data: {
        validatorMetrics,
        lastUpdated: fallbackTimestamp,
        note: "Using fallback data due to API error"
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    // Add headers to prevent caching at all levels
    errorResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    errorResponse.headers.set('Pragma', 'no-cache');
    errorResponse.headers.set('Expires', '0');
    errorResponse.headers.set('Surrogate-Control', 'no-store');
    errorResponse.headers.set('CDN-Cache-Control', 'no-cache');
    errorResponse.headers.set('Vercel-CDN-Cache-Control', 'no-cache');
    
    return errorResponse;
  }
}

// Future implementation would include:
// 1. Metal Explorer API integration
// 2. Real-time monitoring system connection
// 3. Caching and rate limiting
// 4. Error handling for API failures
// 5. Data validation and sanitization