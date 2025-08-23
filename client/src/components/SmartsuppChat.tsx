
import React, { useEffect } from 'react';

declare global {
  interface Window {
    smartsupp?: any;
    _smartsupp?: any;
  }
}

export function SmartsuppChat() {
  useEffect(() => {
    // Configure Smartsupp
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = 'a872b257280bdcfc6d4ed45737a0ec5cb3d1dd14';
    
    // Initialize Smartsupp
    window.smartsupp = window.smartsupp || function() {
      (window.smartsupp._ = window.smartsupp._ || []).push(arguments);
    };
    window.smartsupp._ = [];

    // Load Smartsupp script
    if (!document.querySelector('script[src*="smartsuppchat.com"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.async = true;
      script.src = 'https://www.smartsuppchat.com/loader.js?';
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }
    }
  }, []);

  return null;
}

export default SmartsuppChat;
