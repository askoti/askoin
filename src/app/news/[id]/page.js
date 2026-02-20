import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getSingleArticle(id) {
  try {
    const res = await fetch(`https://cryptocurrency.cv/api/news`, {
      next: { revalidate: 3600 }
    });

    // Handle rate limiting
    if (res.status === 429) {
      console.warn('News API rate limit hit.');
      return { rateLimited: true };
    }

    if (!res.ok) return null;

    const data = await res.json();
    const articles = data.articles || data.data || data;

    // Ensure id is numeric and valid
    const index = Number(id);
    if (isNaN(index) || index < 0 || index >= articles.length) {
      return null;
    }

    return articles[index];
  } catch (e) {
    console.error('News fetch failed:', e);
    return null;
  }
}

export default async function ArticlePage({ params }) {
  const { id } = await params;

  if (!id) notFound();

  const article = await getSingleArticle(id);

  // If API rate limit
  if (article?.rateLimited) {
    return (
      <div className="min-h-screen mt-26 flex items-center justify-center text-white text-center px-6">
        <div className="max-w-lg space-y-6">
          <h1 className="text-4xl font-black text-gold uppercase">
            Data Temporarily Unavailable
          </h1>
          <p className="text-gray-400">
            The news API free tier limit has been reached.
            Live feed will resume automatically.
          </p>
          <Link
            href="/news"
            className="inline-block px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition"
          >
            Return to Feed
          </Link>
        </div>
      </div>
    );
  }

  if (!article) notFound();

  return (
    <div className="min-h-screen mt-26 text-white font-sans selection:bg-gold selection:text-black">
      
      {/* HEADER GRID */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-x border-white/10">
          
          <Link href="/news" className="group p-6 flex flex-col justify-center hover:bg-gold transition-colors duration-300">
            <span className="text-gold group-hover:text-black text-[10px] font-black uppercase tracking-tighter">
              ← Return to
            </span>
            <span className="text-white group-hover:text-black font-black text-xl tracking-tighter uppercase">
              Main Feed
            </span>
          </Link>

          <div className="p-6 hidden md:flex flex-col justify-center">
            <span className="text-gray-500 text-[10px] font-black uppercase">Source Node</span>
            <span className="text-gold font-mono text-sm truncate uppercase">
              {article.source?.name || 'External'}
            </span>
          </div>

          <div className="p-6 hidden md:flex flex-col justify-center">
            <span className="text-gray-500 text-[10px] font-black uppercase">Transmission</span>
            <span className="text-white font-mono text-sm">
              SEC_{id}_INTEL
            </span>
          </div>

          <div className="p-6 flex flex-col justify-center bg-white/[0.03]">
            <span className="text-gray-500 text-[10px] font-black uppercase">Timestamp</span>
            <span className="text-white font-mono text-sm">
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleTimeString()
                : 'LIVE'}
            </span>
          </div>

        </div>
      </div>

      <main className="max-w-7xl mx-auto border-x border-white/10 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 p-6 md:p-12 space-y-12 border-b lg:border-b-0 lg:border-r border-white/10">
            
            <header className="space-y-6">
              <div className="inline-block bg-gold text-black px-2 py-1 text-[10px] font-black uppercase tracking-widest">
                Priority Briefing
              </div>
              <h1 className="text-2xl bg-black/75 p-4 md:text-5xl font-black uppercase leading-[0.9] tracking-tighter">
                {article.title}
              </h1>
            </header>

            {article.urlToImage && (
              <div className="relative border-4 border-white/5 bg-white/24 p-2">
                <img 
                  src={article.urlToImage} 
                  alt={article.title}
                  className="w-full grayscale h-auto contrast-125"
                />
              </div>
            )}

            <div className="space-y-8">
              <p className="text-2xl md:text-2xl bg-black/75 p-4 font-bold text-gold leading-tight uppercase">
                {article.description}
              </p>

              <div className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium space-y-6">
                {article.content ? (
                  <p>
                    {article.content.split('[+')[0]}
                  </p>
                ) : (
                  <div className="bg-white/10 p-8 border-l-4 border-gold italic text-gray-100">
                    Full payload truncated. Decryption key required at origin.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-4 p-6 md:p-12 space-y-12 bg-white/[0.01]">
            
            <a 
              href={article.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white text-black text-center py-6 font-black uppercase tracking-widest hover:bg-gold transition"
            >
              Source File →
            </a>

          </aside>

        </div>
      </main>
    </div>
  );
}
