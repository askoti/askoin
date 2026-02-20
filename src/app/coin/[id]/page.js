// src/app/coin/[id]/page.js
// SERVER COMPONENT – no 'use client'

import CoinDetailClient from './CoinDetailClient';
import { notFound } from 'next/navigation';

export const metadata = {
  title: "Coin Details | CryptoPulse",
  description: "Detailed cryptocurrency analytics",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// Fetch coin details
async function getCoinDetails(id) {
  if (!id) return null;

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`,
      {
        headers: {
          'User-Agent': 'ASKOIN-App/1.0 (contact: support@askoin.com)',
          'Accept': 'application/json',
        },
        next: { revalidate: 60 },
      }
    );

    if (res.status === 429) {
      console.warn(`CoinGecko rate limit hit for "${id}"`);
      // Return a fallback minimal coin object so the UI still renders
      return {
        id,
        symbol: id.slice(0, 3),
        name: `Coin ${id}`,
        image: { large: '/placeholder-coin.png' },
        market_data: {
          current_price: { usd: 0 },
          price_change_percentage_24h: 0,
          market_cap: 0,
          high_24h: { usd: 0 },
          low_24h: { usd: 0 },
          circulating_supply: 0,
        },
      };
    }

    if (!res.ok) {
      console.log(`CoinGecko failed for "${id}": ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error('Coin details fetch failed:', err);
    return null;
  }
}

// Fetch OHLC chart
async function getOhlcData(id, days = '30') {
  if (!id) return [];

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${days}`,
      {
        headers: {
          'User-Agent': 'ASKOIN-App/1.0 (contact: support@askoin.com)',
        },
        next: { revalidate: 60 },
      }
    );

    if (res.status === 429) {
      console.warn(`OHLC rate limit hit for "${id}"`);
      return [];
    }

    if (!res.ok) return [];

    const raw = await res.json();
    return raw.map(([time, open, high, low, close]) => ({
      time: time / 1000,
      open,
      high,
      low,
      close,
    }));
  } catch (err) {
    console.error('OHLC fetch failed:', err);
    return [];
  }
}

export default async function CoinPage({ params, searchParams }) {
  // Await params/searchParams for Next.js App Router
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const resolvedSearchParams = (await searchParams) || {};
  const range = resolvedSearchParams.range || '30';

  if (!id) {
    notFound();
  }

  const [coin, chartData] = await Promise.all([
    getCoinDetails(id),
    getOhlcData(id, range),
  ]);

  // If coin fetch completely fails → show Next.js 404
  if (!coin) {
    notFound();
  }

  return (
    <CoinDetailClient
      coin={coin}
      chartData={chartData}
      currentRange={range}
      id={id}
    />
  );
}
