'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useState, useEffect } from 'react';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [term, setTerm] = useState(searchParams.get('query') || '');

  useEffect(() => {
    setTerm(searchParams.get('query') || '');
  }, [searchParams]);

  function handleSearch(value) {
    setTerm(value);
    const params = new URLSearchParams(searchParams);
    if (value) params.set('query', value);
    else params.delete('query');
    params.set('page', '1');

    console.log("Navigating to:", `/crypto?${params.toString()}`);

    startTransition(() => {
      router.replace(`/crypto?${params.toString()}`);
    });
  }

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search symbols (btc, eth...)"
        className="w-full bg-[#0a0a0a] border border-gray-800 text-white px-5 py-3 rounded-2xl focus:outline-none focus:border-emerald-500 transition-all font-mono text-sm"
        value={term}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {isPending && (
        <div className="absolute right-4 top-3.5">
          <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
