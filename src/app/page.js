import { 
  ShieldCheck, Zap, Percent, BarChart3, RefreshCw, 
  Lock, Globe, TrendingUp, Receipt, Smartphone 
} from 'lucide-react';

export default function HomePage() {
  const yellowColor = "#FFD700"; // Pure Yellow Gold

  const advantages = [
    { icon: <ShieldCheck size={32} strokeWidth={1.2} />, title: '100% Secure', desc: 'Trezor segregated' },
    { icon: <Zap size={32} strokeWidth={1.2} />, title: 'Fast', desc: 'Same-day payout' },
    { icon: <Percent size={32} strokeWidth={1.2} />, title: 'Low Rates', desc: 'From 0.35%' },
    { icon: <BarChart3 size={32} strokeWidth={1.2} />, title: 'No Credit', desc: 'Collateral only' },
    { icon: <RefreshCw size={32} strokeWidth={1.2} />, title: 'Flexible', desc: 'Early repay' },
    { icon: <Lock size={32} strokeWidth={1.2} />, title: 'Privacy', desc: 'Minimal KYC' },
    { icon: <Globe size={32} strokeWidth={1.2} />, title: 'Global', desc: 'Any country' },
    { icon: <TrendingUp size={32} strokeWidth={1.2} />, title: 'Upside', desc: 'Keep crypto' },
    { icon: <Receipt size={32} strokeWidth={1.2} />, title: 'Transparent', desc: 'No hidden fees' },
    { icon: <Smartphone size={32} strokeWidth={1.2} />, title: 'Mobile', desc: 'Easy access' }
  ];

  return (
    <div className="text-white min-h-screen font-sans selection:bg-[#FFD700] selection:text-black">
      {/* Background Ambient Glows for Visibility */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFD700]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFD700]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-5 pt-24 pb-20">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-8 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]" style={{ color: yellowColor }}>
              ASKOIN
            </h1>

            <div className="flex justify-center mb-10">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl border-[0.5px] border-[#FFD700]/30 flex items-center justify-center bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_-15px_rgba(255,215,0,0.2)]">
                  <img src='/logo.png' className='w-2/3 object-contain filter brightness-110' alt="Logo"/>
              </div>
            </div>

            <p className="text-lg md:text-2xl bg-black/80 p-4 text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Secure crypto-backed loans store your assets safely and get instant liquidity 
              to grow your <span style={{ color: yellowColor }}>Bitcoin</span> holdings without selling.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-[#FFD700] text-black px-10 py-4 rounded-sm text-lg font-bold hover:scale-105 transition-all shadow-lg shadow-[#FFD700]/20 uppercase tracking-widest">
                Enter Cabinet
              </button>
              <button className="border-[0.5px] border-[#FFD700]/50 text-[#FFD700] px-10 py-4 rounded-sm text-lg font-bold hover:bg-[#FFD700]/5 transition-all uppercase tracking-widest">
                Get Started
              </button>
            </div>
          </div>
        </section>

        {/* INFO CARDS (What is ASKOIN) */}
        <section className="py-24 bg-white/[0.01] border-y border-white/5">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-center text-4xl md:text-5xl font-bold mb-16 tracking-tight" style={{ color: yellowColor }}>
              The Lending Standard
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Loan Size', value: '$50 – $20,000+', desc: 'Tailored to your collateral' },
                { title: 'Daily Rates', value: '0.35% – 0.8%', desc: 'Optimized for long-term growth' },
                { title: 'Custody', value: 'Trezor Hardware', desc: 'Deep cold storage security' }
              ].map((item, i) => (
                <div key={i} className="bg-black/75 from-white/[0.05] to-transparent border-[0.5px] border-white/10 p-10 rounded-sm hover:border-[#FFD700]/40 transition-all group">
                  <div className="text-3xl font-black mb-4 transition-colors group-hover:text-[#FFD700]" style={{ color: yellowColor }}>{item.value}</div>
                  <div className="text-white font-bold tracking-widest uppercase text-sm mb-2">{item.title}</div>
                  <p className="text-gray-200 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REFINED ADVANTAGES GRID */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-center text-sm font-bold tracking-[0.4em] uppercase mb-16 opacity-60 bg-black/80 p-4">Why Professionals Choose Us</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 border border-white/5 overflow-hidden">
              {advantages.map((adv, i) => (
                <div
                  key={i}
                  className="bg-black p-12 text-center flex flex-col items-center group transition-all duration-500 hover:bg-[#FFD700]/[0.02]"
                >
                  <div className="mb-6 transition-all duration-500 group-hover:scale-110" style={{ color: yellowColor }}>
                    <div className="p-3 rounded-full bg-white/[0.02] group-hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] group-hover:bg-[#FFD700]/10 transition-all">
                      {adv.icon}
                    </div>
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-3">{adv.title}</h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FORM */}
        <section className="py-24 border-t border-white/5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.02] to-transparent">
          <div className="max-w-lg mx-auto px-5 text-center">
            <h2 className="text-4xl font-bold mb-6" style={{ color: yellowColor }}>Start Today</h2>
            <p className="text-gray-200 mb-10 font-light">Secure your liquidity. No credit checks. No paperwork.</p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="NAME"
                className="w-full bg-white/[0.03] border-[0.5px] border-white/10 rounded-sm px-6 py-4 text-sm tracking-widest outline-none focus:border-[#FFD700]/50 transition-all placeholder:text-gray-400"
              />
              <input
                type="tel"
                placeholder="PHONE"
                className="w-full bg-white/[0.03] border-[0.5px] border-white/10 rounded-sm px-6 py-4 text-sm tracking-widest outline-none focus:border-[#FFD700]/50 transition-all placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="w-full bg-[#FFD700] text-black py-5 rounded-sm text-sm font-black uppercase tracking-[0.3em] hover:brightness-110 transition-all shadow-lg shadow-[#FFD700]/10"
              >
                Request Call
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}