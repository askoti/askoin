'use client';

import Link from 'next/link';
import CandleChart from '@/components/CandleChart';

const timeframes = [
  { label: '24H', value: '1' },
  { label: '7D', value: '7' },
  { label: '30D', value: '30' },
  { label: '90D', value: '90' },
  { label: '1Y', value: '365' },
];

export default function CoinDetailClient({ coin, chartData = [], currentRange, id }) {
  if (!coin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black text-white">
        <h1 className="text-4xl md:text-5xl font-black text-gold mb-6">
          Coin Not Found
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-md">
          We couldn't load "{id}". It may not exist or the API is temporarily unavailable.
        </p>
        <Link
          href="/crypto"
          className="px-8 py-4 bg-gold text-black rounded-full font-bold hover:bg-yellow-300 transition shadow-xl"
        >
          Back to Market
        </Link>
      </div>
    );
  }

  const isPositive =
    (coin.market_data?.price_change_percentage_24h || 0) > 0;

  return (
    <div className="relative min-h-screen text-white pt-24">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16 animate-fade-in">

        {/* Sticky Navigation */}
        <nav className="sticky top-2 md:top-4 z-40 flex justify-between items-center mb-12 bg-black/70 backdrop-blur-xl border border-gold/20 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-xl shadow-gold/10">
          <Link
            href="/crypto"
            className="group flex items-center gap-3 text-gray-300 hover:text-gold transition-all duration-300"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-gold/40 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all">
              ←
            </div>
            <span className="text-sm sm:text-base font-medium uppercase tracking-wider">
              Back to Market
            </span>
          </Link>

          <span className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-gold/20 to-yellow-500/20 text-gold border border-gold/30">
            LIVE DATA
          </span>
        </nav>

        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">

          {/* Coin Info */}
          <div className="lg:col-span-2 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl border border-gold/40 bg-black/50 backdrop-blur flex items-center justify-center shadow-lg shadow-gold/10">
              <img
                src={
                  coin.image?.large ||
                  coin.image?.small ||
                  '/placeholder-coin.png'
                }
                alt={coin.name || 'Coin'}
                className="w-16 h-16 md:w-20 md:h-20"
              />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gold uppercase tracking-tight">
                {coin.symbol?.toUpperCase() || '—'}
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mt-1 font-medium">
                {coin.name || 'Unknown Asset'}
              </p>
            </div>
          </div>

          {/* Price + Change */}
          <div className="text-center lg:text-right space-y-3">
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
              Current Price (USD)
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              {coin.market_data?.current_price?.usd
                ? `$${coin.market_data.current_price.usd.toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}`
                : '—'}
            </p>

            <div
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base font-medium ${
                isPositive
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-950/60 text-rose-400 border border-rose-500/20'
              }`}
            >
              {isPositive ? '▲' : '▼'}
              {Math.abs(
                coin.market_data?.price_change_percentage_24h || 0
              ).toFixed(2)}
              % (24h)
            </div>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex flex-wrap gap-3 justify-center">
          {timeframes.map((tf) => (
            <Link
              key={tf.value}
              href={`/coin/${id}?range=${tf.value}`}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                currentRange === tf.value
                  ? 'bg-gold text-black shadow-lg shadow-gold/40 scale-105'
                  : 'bg-black/40 border border-gold/30 text-gray-300 hover:border-gold hover:text-gold hover:scale-105'
              }`}
            >
              {tf.label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent my-10" />

        {/* Chart */}
        <div className="bg-black/50 backdrop-blur-xl border border-gold/20 rounded-3xl overflow-hidden shadow-2xl shadow-gold/10">
          <div className="p-4 sm:p-6 border-b border-gold/10 flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gold">
              Price History
            </h2>
            <div className="text-sm sm:text-base text-gray-500">
              {currentRange === '1'
                ? '30-minute candles'
                : `${currentRange}-day OHLC`}
            </div>
          </div>

          <div className="h-[320px] sm:h-[400px] md:h-[680px] w-full">
            {chartData.length > 0 ? (
              <CandleChart data={chartData} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-base">
                No chart data available for this timeframe
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              label: 'Market Cap',
              value: coin.market_data?.market_cap?.usd
                ? `$${(coin.market_data.market_cap.usd / 1e9).toFixed(2)}B`
                : '—',
            },
            {
              label: '24h High',
              value: coin.market_data?.high_24h?.usd
                ? `$${coin.market_data.high_24h.usd.toLocaleString()}`
                : '—',
              color: 'text-emerald-400',
            },
            {
              label: '24h Low',
              value: coin.market_data?.low_24h?.usd
                ? `$${coin.market_data.low_24h.usd.toLocaleString()}`
                : '—',
              color: 'text-rose-400',
            },
            {
              label: 'Circulating Supply',
              value: coin.market_data?.circulating_supply
                ? coin.market_data.circulating_supply.toLocaleString()
                : '—',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-black/50 border border-gold/20 rounded-xl p-4 sm:p-5 text-center hover:border-gold/50 transition hover:shadow-gold/10 hover:scale-[1.02]"
            >
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <p className={`text-lg sm:text-xl font-bold ${stat.color || 'text-white'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
