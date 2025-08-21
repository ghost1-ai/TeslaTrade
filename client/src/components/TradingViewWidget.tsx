import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  width?: string;
  height?: string;
  theme?: 'light' | 'dark';
  style?: string;
}

export function TradingViewWidget({ 
  symbol = 'NASDAQ:TSLA', 
  width = '100%', 
  height = '400',
  theme = 'dark',
  style = '1'
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: false,
      symbol: symbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: theme,
      style: style,
      locale: 'en',
      withdateranges: true,
      range: 'YTD',
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      details: true,
      hotlist: true,
      calendar: false,
      width: width,
      height: height,
      support_host: 'https://www.tradingview.com'
    });

    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, width, height, theme, style]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export function TradingViewTickerTape() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: 'NASDAQ:TSLA',
          title: 'Tesla'
        },
        {
          proName: 'NASDAQ:AAPL',
          title: 'Apple'
        },
        {
          proName: 'NASDAQ:MSFT',
          title: 'Microsoft'
        },
        {
          proName: 'NASDAQ:GOOGL',
          title: 'Google'
        },
        {
          proName: 'NASDAQ:AMZN',
          title: 'Amazon'
        }
      ],
      showSymbolLogo: false,
      colorTheme: 'dark',
      isTransparent: true,
      displayMode: 'adaptive',
      locale: 'en'
    });

    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}
