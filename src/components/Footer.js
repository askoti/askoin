import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const yellowColor = "#FFD700";

  return (
    <footer className="relative w-full overflow-hidden mt-20">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 z-0 bg-contain bg-center bg-fixed"
        style={{ backgroundImage: "url('/ddd.jpeg')" }}
      >
        {/* Dark Overlay to ensure text visibility and brand consistency */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter" style={{ color: yellowColor }}>
              ASKOIN
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs uppercase tracking-widest font-light">
              Redefining liquidity for the digital era. Secure, private, and instantaneous.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em]">Navigation</h4>
            <ul className="space-y-2 text-gray-500 text-sm uppercase tracking-widest">
              <li className="hover:text-[#FFD700] transition-colors cursor-pointer">Lending</li>
              <li className="hover:text-[#FFD700] transition-colors cursor-pointer">Security</li>
              <li className="hover:text-[#FFD700] transition-colors cursor-pointer">Rates</li>
              <li className="hover:text-[#FFD700] transition-colors cursor-pointer">Institutional</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em]">Inquiries</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#FFD700]" strokeWidth={1.5} />
                <span className="tracking-widest">kastriootaliiu@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#FFD700]" strokeWidth={1.5} />
                <span className="tracking-widest">+38345396947</span>
              </div>
            </div>
          </div>

          {/* Social & Legal */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em]">Social</h4>
            <div className="flex gap-6 text-gray-400">
              <Instagram size={20} className="hover:text-[#FFD700] cursor-pointer transition-all" />
              <Twitter size={20} className="hover:text-[#FFD700] cursor-pointer transition-all" />
              <Linkedin size={20} className="hover:text-[#FFD700] cursor-pointer transition-all" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:row justify-between items-center gap-4 text-[10px] text-gray-600 tracking-[0.4em] uppercase">
          <p>© 2026 ASKOIN GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}