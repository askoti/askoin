# ASKOIN – Crypto Lending & Market Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js)](https://nextjs.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4+-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-Particles-black?logo=javascript)](https://threejs.org)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://askoin.vercel.app)

[Live Demo](https://askoin.vercel.app) • [GitHub](https://github.com/askoti/askoin) • [Portfolio](https://kastriotaliu.com)

</div>

---

## Project Overview

**ASKOIN** is a modern cryptocurrency lending platform and market tracker built with Next.js and JavaScript. It combines real-time crypto market data, immersive 3D particle animations, and secure crypto-backed lending services with a focus on user experience and financial security.

This project demonstrates expertise in building fintech applications with real-time data integration, 3D graphics, and modern web technologies.

---

## Key Features

### Hero Section
- Eye-catching 3D particle background animation
- Animated geometric shapes (triangles, networks)
- Glowing particle effects synchronized with navigation
- Professional gradient lighting
- Dynamic background responsiveness
- Smooth scroll-triggered animations

### Crypto Lending Services

#### Core Benefits
- Secure crypto-backed loans
- Instant liquidity without selling
- Grow Bitcoin holdings while borrowing
- Asset storage and protection
- Fast, secure processing

#### Loan Features
- 100% secure asset segregation
- Same-day payout
- Low interest rates (from 0.35%)
- Collateral-only requirements (no credit checks)
- Flexible early repayment options
- Global availability
- Minimal KYC requirements
- Transparent fee structure
- Mobile-friendly access

### Crypto Market Tracker

#### Live Market Data
- Real-time cryptocurrency prices
- 50+ major cryptocurrencies
- 24-hour price change indicators
- Market capitalization display
- Color-coded performance (red/green)
- Live status indicators

#### Advanced Features
- Price history charts
- 30-day OHLC (Open-High-Low-Close) charts
- Multiple timeframe views (24H, 7D, 30D, 90D, 1Y)
- Detailed price analytics
- Market trend visualization
- Individual crypto detail pages

#### Search & Navigation
- Global cryptocurrency search
- Quick symbol lookup (BTC, ETH, etc.)
- Responsive market display
- Asset sorting and ranking
- "View" action buttons for details

### News & Updates

#### Content Features
- Priority briefing section
- Crypto-related news updates
- External source integration
- Timestamp and source tracking
- Secure protocol status
- Full payload decryption capability

#### News Management
- Source mode tracking (External/Internal)
- Transmission protocol indicators
- Live timestamp updates
- News categorization
- Content accessibility options

### Platform Features

#### Security & Trust
- 100% secure asset segregation
- Blockchain-backed verification
- Encrypted connections
- Secure protocol implementation
- Professional custody standards

#### User Experience
- Responsive design (mobile-first)
- Intuitive navigation
- Quick access to key features
- Professional UI/UX
- Fast loading times
- Smooth animations

#### Global Access
- Available in any country
- Multi-currency support
- International transaction support
- 24/7 platform availability
- Minimal geographic restrictions

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15+** | React framework with API routes |
| **JavaScript** | Frontend logic and interactions |
| **Tailwind CSS** | Modern, responsive styling |
| **Three.js/Particles** | 3D particle animations |
| **Crypto APIs** | Live market data integration |
| **News APIs** | Real-time crypto news feeds |
| **Chart Libraries** | Market data visualization |
| **Vercel** | Deployment and edge hosting |

---

## Project Structure

```
askoin/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home with hero & particles
│   ├── crypto/
│   │   ├── page.tsx        # Crypto market tracker
│   │   └── [symbol]/
│   │       └── page.tsx    # Individual crypto detail
│   ├── news/
│   │   └── page.tsx        # News and updates
│   ├── cabinet/
│   │   └── page.tsx        # User dashboard
│   └── api/
│       ├── crypto/         # Crypto data API
│       ├── news/           # News API routes
│       └── market/         # Market data routes
├── components/
│   ├── ParticleBackground.tsx  # 3D particle animation
│   ├── CryptoMarket.tsx        # Market display
│   ├── ChartDisplay.tsx        # Price charts
│   ├── NewsSection.tsx         # News feed
│   ├── SearchBar.tsx           # Crypto search
│   └── Navigation.tsx          # Header nav
├── hooks/
│   ├── useCryptoData.ts    # Crypto price hook
│   ├── useChartData.ts     # Chart data hook
│   └── useNews.ts          # News feed hook
├── utils/
│   ├── cryptoApi.ts        # API integration
│   ├── formatting.ts       # Price formatting
│   └── particles.ts        # 3D setup
├── styles/                 # Global styles
└── public/                 # Assets
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/askoti/askoin.git
cd askoin

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add API keys for crypto data, news feeds, etc.

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to experience ASKOIN.

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel deploy --prod
```

---

## Core Features Explained

### 3D Particle Background
The animated background uses Three.js to create:
- Floating geometric particles
- Network connections between nodes
- Dynamic glow effects
- Smooth parallax scrolling
- GPU-optimized rendering
- Responsive scaling

### Real-Time Crypto Data
Integration with leading crypto APIs provides:
- Live BTC, ETH, USDT prices
- 50+ major cryptocurrency tracking
- 24-hour change percentages
- Market capitalization data
- Historical price data
- Instant price updates

### Market Analytics
Advanced charting includes:
- OHLC candlestick charts
- Multiple timeframe analysis
- Price trend visualization
- Technical analysis support
- Historical data export
- Performance metrics

### Crypto Lending
Complete lending platform features:
- Instant loan approval
- Secure asset custody
- Transparent fee structure
- Flexible repayment terms
- Global availability
- Professional support

---

## Design Highlights

- **Luxurious Dark Theme**: Professional black background
- **Gold Accents**: Yellow highlights for CTAs and important info
- **Particle Effects**: Dynamic 3D background animation
- **Modern Typography**: Clear, readable fonts
- **Responsive Layout**: Works on all devices
- **Smooth Interactions**: Polished transitions and effects
- **Professional Branding**: Fintech-grade design

---

## Technical Features

✅ **3D Graphics**: Particle animations with Three.js  
✅ **Real-Time Data**: Live cryptocurrency prices  
✅ **API Integration**: Multiple data sources  
✅ **Chart Visualization**: Advanced market analysis  
✅ **Responsive Design**: Mobile-first approach  
✅ **News Integration**: Crypto news feeds  
✅ **Search & Filter**: Quick crypto discovery  
✅ **User Dashboard**: Cabinet for account management  
✅ **Performance**: Optimized loading and rendering  
✅ **Security**: Encrypted connections and secure protocol  

---

## Use Cases

Perfect for:
- Cryptocurrency traders
- Bitcoin hodlers seeking liquidity
- Fintech platforms
- Lending services
- Crypto portfolio tracking
- Market analysis tools
- Financial platforms
- Web3 applications

---

## Key Metrics

- 50+ cryptocurrencies tracked
- Real-time price updates
- 30-day historical charts
- Multiple timeframe analysis (24H, 7D, 30D, 90D, 1Y)
- Global news integration
- 100% secure asset storage
- Same-day loan processing
- Competitive interest rates (from 0.35%)

---

## Future Enhancements

- Advanced trading interface
- Automated trading strategies
- DeFi protocol integration
- Staking rewards dashboard
- Multi-chain support
- Portfolio management tools
- Advanced analytics
- API for developers
- Mobile native app
- Institutional features

---

## Performance Metrics

- Hero Animation: 60 FPS particle effects
- Market Load: Real-time data sync
- Chart Rendering: Smooth interactions
- Page Performance: <2 second loads
- Mobile Optimization: Touch-optimized
- API Response: Sub-second updates

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## License

This project is licensed under the MIT License – see the LICENSE file for details.

---

## Connect With Me

- GitHub: [@askoti](https://github.com/askoti)
- Portfolio: [kastriotaliu.com](https://kastriotaliu.com)
- Email: [kastriootaliiu@gmail.com](mailto:kastriootaliiu@gmail.com)
- LinkedIn: [linkedin.com/in/kastriootaliiu/](https://www.linkedin.com/in/kastriootaliiu/)

---

## Acknowledgments

- Three.js community for 3D particle effects
- Next.js team for excellent framework
- Crypto API providers for market data
- Tailwind CSS for styling
- Vercel for deployment

---

<div align="center">

Modern Crypto Platform with Immersive 3D Experience

Made with by [@askoti](https://github.com/askoti)

</div>
