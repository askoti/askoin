export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="relative w-full max-w-2xl space-y-12 mt-56">
        
        {/* 1. CENTRAL ANIMATED ICON */}
        <div className="flex justify-center">
          <div className="relative h-24 w-24">
            {/* Spinning Outer Ring */}
            <div className="absolute inset-0 border-t-2 border-b-2 border-gold rounded-full animate-spin duration-1000" />
            
            {/* Pulsing Inner Core */}
            <div className="absolute inset-4 bg-gold/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="h-4 w-4 bg-gold rounded-full shadow-[0_0_15px_#FFD700]" />
            </div>

            {/* Orbiting Particles */}
            <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
              <div className="h-2 w-2 bg-gold rounded-full absolute -top-1 left-1/2" />
            </div>
          </div>
        </div>

        {/* 2. LOADING TEXT */}
        <div className="text-center space-y-3">
          <h2 className="text-gold font-black text-xl tracking-[0.5em] uppercase animate-pulse">
            Establishing Link
          </h2>
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            <span>Sector_Scan</span>
            <span className="w-12 h-[1px] bg-white/10" />
            <span>Auth_Pending</span>
          </div>
        </div>

        {/* 3. SKELETON CONTENT PREVIEW */}
        <div className="space-y-6 opacity-40">
          {/* Mock Title */}
          <div className="h-8 w-3/4 bg-white/5 rounded-sm mx-auto overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
          
          {/* Mock Image Box */}
          <div className="aspect-video w-full bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]" />
             
             {/* Tactical Crosshair Overlay */}
             <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="h-[1px] w-10 bg-gold" />
                <div className="h-10 w-[1px] bg-gold" />
             </div>
          </div>

          {/* Mock Text Lines */}
          <div className="space-y-3 px-4">
            <div className="h-2 w-full bg-white/5 rounded-full" />
            <div className="h-2 w-5/6 bg-white/5 rounded-full" />
            <div className="h-2 w-4/6 bg-white/5 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}