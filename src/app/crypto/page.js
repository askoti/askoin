// src/app/crypto/page.js
import Link from "next/link";
import Search from "@/components/Search";

/* ===============================
   FETCH TOP COINS
================================ */
async function getCoins(page = 1) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false`,
      { headers: { Accept: "application/json" }, next: { revalidate: 60 } }
    );
    if (!res.ok) return { rateLimited: false, coins: [] };
    const data = await res.json();
    return { rateLimited: false, coins: data };
  } catch (err) {
    console.error("Fetch error:", err);
    return { rateLimited: false, coins: [] };
  }
}

/* ===============================
   SEARCH COINS
================================ */
async function searchCoins(query) {
  if (!query) return [];
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`,
      { headers: { Accept: "application/json" }, next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.coins || []).map((c) => ({
      id: c.id,
      symbol: c.symbol.toUpperCase(),
      name: c.name,
      image: c.large,
      current_price: 0,
      price_change_percentage_24h: 0,
      market_cap: 0,
    }));
  } catch (err) {
    console.error("Search fetch error:", err);
    return [];
  }
}

/* ===============================
   PAGE COMPONENT
================================ */
export default async function CryptoMarketPage({ searchParams: rawSearchParams }) {
  const searchParams = await rawSearchParams;

  const currentPage = Number(searchParams?.page) || 1;
  const searchQuery = searchParams?.query?.toLowerCase().trim() || "";

  let coins = [];
  let rateLimited = false;

  if (searchQuery) {
    coins = await searchCoins(searchQuery);

    // If clearing search yields empty array, fallback to top coins
    if (coins.length === 0) {
      const result = await getCoins(currentPage);
      coins = result.coins;
      rateLimited = result.rateLimited;
    }
  } else {
    const result = await getCoins(currentPage);
    coins = result.coins;
    rateLimited = result.rateLimited;
  }

  if (rateLimited) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="bg-black/50 border border-gold/30 backdrop-blur-xl rounded-3xl p-12 max-w-xl shadow-2xl shadow-gold/10">
          <h1 className="text-3xl font-black text-gold mb-4">Live Market Data Paused</h1>
          <p className="text-gray-400 mb-6 leading-relaxed">
            CoinGecko temporarily limited requests. Refresh in a few minutes.
          </p>
          <button
            onClick={() => location.reload()}
            className="px-6 py-3 bg-gold text-black font-bold rounded-full hover:bg-yellow-400 transition"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              <span className="text-gold">Crypto</span>
              <span className="text-gray-500 font-normal ml-2">Market</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Live • Showing {(currentPage - 1) * 50 + 1}–{(currentPage - 1) * 50 + coins.length}
            </p>
          </div>
          <div className="w-full lg:w-80">
            <Search />
          </div>
        </header>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block rounded-2xl border border-gold/20 bg-black/40 backdrop-blur-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/60 text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-center">#</th>
                  <th className="px-6 py-4">Asset</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-right">24h</th>
                  <th className="px-6 py-4 text-right">Market Cap</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/5">
                {coins.map((coin, index) => {
                  const rank = (currentPage - 1) * 50 + index + 1;
                  const isPositive = coin.price_change_percentage_24h > 0;
                  return (
                    <tr key={coin.id} className="hover:bg-gold/5 transition">
                      <td className="px-6 py-5 text-center text-gray-500 font-mono text-sm">{rank}</td>
                      <td className="px-6 py-5">
                        <Link href={`/coin/${coin.id}`} className="flex items-center gap-4">
                          <img src={coin.image} alt={coin.name} className="w-9 h-9" />
                          <div>
                            <div className="font-bold uppercase">{coin.symbol}</div>
                            <div className="text-sm text-gray-500">{coin.name}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-5 text-right font-mono font-semibold">
                        ${coin.current_price?.toLocaleString() || "N/A"}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isPositive
                              ? "bg-emerald-900/40 text-emerald-400"
                              : "bg-rose-900/40 text-rose-400"
                          }`}
                        >
                          {isPositive ? "+" : ""}
                          {coin.price_change_percentage_24h?.toFixed(2) || "0"}%
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right text-gray-400 font-mono">
                        {coin.market_cap ? `$${(coin.market_cap / 1e9).toFixed(2)}B` : "N/A"}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <Link
                          href={`/coin/${coin.id}`}
                          className="px-4 py-2 text-sm border border-gold/40 text-gold rounded-lg hover:bg-gold/10 transition"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4">
          {coins.map((coin, index) => {
            const rank = (currentPage - 1) * 50 + index + 1;
            const isPositive = coin.price_change_percentage_24h > 0;

            return (
              <Link
                key={coin.id}
                href={`/coin/${coin.id}`}
                className="block p-4 rounded-xl border border-gold/20 bg-black/40 backdrop-blur hover:bg-gold/5 transition"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                    <div>
                      <div className="font-bold uppercase text-sm">{coin.symbol}</div>
                      <div className="text-xs text-gray-500">{coin.name}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">#{rank}</span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="font-mono text-sm">${coin.current_price?.toLocaleString() || "N/A"}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      isPositive ? "bg-emerald-900/40 text-emerald-400" : "bg-rose-900/40 text-rose-400"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {coin.price_change_percentage_24h?.toFixed(2) || "0"}%
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
