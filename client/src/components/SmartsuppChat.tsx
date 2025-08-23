import { useEffect } from 'react';

const SmartsuppChat = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any)._smartsupp = (window as any)._smartsupp || {};
      (window as any)._smartsupp.key = 'a872b257280bdcfc6d4ed45737a0ec5cb3d1dd14';

      if (!(window as any).smartsupp) {
        const o = function () {
          (o._ = o._ || []).push(arguments);
        };
        o._ = [];

        (window as any).smartsupp = o;

        const s = document.getElementsByTagName('script')[0];
        const c = document.createElement('script');
        c.type = 'text/javascript';
        c.charset = 'utf-8';
        c.async = true;
        c.src = 'https://www.smartsuppchat.com/loader.js?';
        s.parentNode?.insertBefore(c, s);
      }
    }
  }, []);

  return (
    <noscript>
      Powered by{' '}
      <a href="https://www.smartsupp.com" target="_blank" rel="noreferrer">
        Smartsupp
      </a>
    </noscript>
  );
};

export default SmartsuppChat;
