import Link from 'next/link';

async function getNews(page = 1) {
  try {
    const res = await fetch(
      `https://cryptocurrency.cv/api/news?page=${page}&per_page=12`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
        next: { revalidate: 300 }, // 5 min cache
      }
    );

    // API rate-limit hit
    if (res.status === 429) {
      console.warn('CryptoCV API rate limit reached.');
      return { rateLimited: true };
    }

    if (!res.ok) return [];

    const data = await res.json();
    let articles = data.articles || data.data || data || [];
    return articles.slice(0, 12);
  } catch (error) {
    console.error('News fetch error:', error);
    return [];
  }
}

export default async function NewsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const newsData = await getNews(currentPage);

  // Rate-limit fallback
  if (newsData?.rateLimited) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-4xl font-black text-gold uppercase mb-4">
          Data Temporarily Unavailable
        </h1>
        <p className="text-gray-400 mb-6">
          The news API free tier limit has been reached. Feed will resume automatically.
        </p>
        <Link
          href="/news"
          className="px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition"
        >
          Return to Feed
        </Link>
      </div>
    );
  }

  const articles = Array.isArray(newsData) ? newsData : [];

  return (
    <div className="relative min-h-screen text-white pt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16 animate-fade-in">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4 border-gold/40 pl-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-gold/50" />
              <span className="text-xs font-black text-gold tracking-[0.3em] uppercase">
                Intelligence Feed Active
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gold tracking-tight uppercase">
              ASKOIN SITREP
            </h1>
            <p className="text-sm text-gray-500 font-mono tracking-wider">
              Sector {currentPage} • {articles.length} Signals
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-4xl md:text-5xl font-black text-gold/20 opacity-40 select-none">
              LATEST BRIEFING
            </span>
          </div>
        </header>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {articles.length > 0 ? (
            articles.map((item, index) => (
              <article
                key={item.id || index}
                className="group bg-black/40 backdrop-blur-xl border border-gold/20 rounded-2xl overflow-hidden hover:border-gold/60 transition-all duration-500 hover:shadow-gold/20 hover:scale-[1.02]"
              >
                <Link href={`/news/${index}`} className="block relative aspect-video overflow-hidden">
                  {item.urlToImage ? (
                    <img
                      src={item.urlToImage}
                      alt={item.title || 'Signal'}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
                      <span className="text-6xl text-gold/30 font-black">
                        {item.source?.name?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-60 transition" />
                </Link>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="px-2 py-0.5 bg-gold/10 text-gold rounded font-medium">
                      SIGNAL_{index + 1}
                    </span>
                    <span className="font-mono">
                      {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'REALTIME'}
                    </span>
                  </div>

                  <Link href={`/news/${index}`}>
                    <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-gold transition-colors line-clamp-2">
                      {item.title || 'Untitled Briefing'}
                    </h2>
                  </Link>

                  <p className="text-sm text-gray-400 line-clamp-3">
                    {item.description || "Decrypted intelligence data incoming. Tap source for full briefing."}
                  </p>

                  <Link
                    href={`/news/${index}`}
                    className="inline-flex items-center gap-3 text-gold text-sm font-medium group/link"
                  >
                    <span className="group-hover/link:underline uppercase tracking-widest text-[11px]">View Dossier</span>
                    <span className="w-6 h-[1px] bg-gold group-hover/link:w-10 transition-all" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full h-96 flex flex-col items-center justify-center border border-gold/20 border-dashed rounded-2xl">
              <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-6" />
              <p className="text-gray-500 font-mono text-sm tracking-wider">
                Scanning High-Frequency Bands...
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-12 border-t border-gold/10">
          <div className="flex gap-4">
            <Link
              href={`/news?page=${Math.max(1, currentPage - 1)}`}
              className={`px-8 py-4 rounded-xl border text-sm font-medium transition-all ${
                currentPage <= 1
                  ? 'border-gold/20 text-gray-600 cursor-not-allowed opacity-50'
                  : 'border-gold/40 text-gold hover:bg-gold/10 hover:border-gold'
              }`}
            >
              ← Previous Sector
            </Link>

            <Link
              href={`/news?page=${currentPage + 1}`}
              className="px-8 py-4 rounded-xl border border-gold/40 text-sm font-medium text-gold hover:bg-gold/10 transition-all"
            >
              Next Sector →
            </Link>
          </div>

          <div className="text-sm text-gray-500 font-mono">
            Sector {currentPage} • {articles.length} Signals
          </div>
        </div>
      </div>
    </div>
  );
}
