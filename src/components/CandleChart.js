'use client';

import { useEffect, useRef } from 'react';

export default function CandleChart({ data }) {
  const chartContainerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    (async () => {
      const { createChart, ColorType } = await import('lightweight-charts');

      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: '#666', // Muted text so the yellow pops
          fontSize: 11,
          fontFamily: 'Inter, sans-serif',
        },
        // --- DISABLE ZOOM & SCROLL ---
        handleScroll: false,
        handleScale: false,
        // -----------------------------
        grid: {
          vertLines: { visible: false },
          horzLines: { color: '#1a1a1a' }, // Very subtle horizontal lines
        },
        rightPriceScale: {
          borderVisible: false,
          scaleMargins: { top: 0.2, bottom: 0.2 },
        },
        timeScale: {
          borderVisible: false,
        },
        crosshair: {
          vertLine: { color: '#FFD700', labelBackgroundColor: '#FFD700' },
          horzLine: { color: '#FFD700', labelBackgroundColor: '#FFD700' },
        },
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });

      const candleSeries = chart.addCandlestickSeries({
        // Pure Yellow for growth
        upColor: '#FFD700',
        wickUpColor: '#FFD700',
        borderUpColor: '#FFD700',
        // Muted/Dark for down to keep focus on "Liquidity/Growth"
        downColor: '#262626',
        wickDownColor: '#404040',
        borderDownColor: '#404040',
      });

      candleSeries.setData(data);
      chartRef.current = chart;
      
      // Ensure it fits the container exactly
      chart.timeScale().fitContent();

      window.addEventListener('resize', handleResize);
    })();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [data]);

  return (
    <div 
      className="w-full h-full relative bg-black border-[0.5px] border-white/10 rounded-sm overflow-hidden" 
      style={{ minHeight: '300px' }}
    >
      {/* Subtle overlay to make it feel like it's behind glass */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-50" />
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
}