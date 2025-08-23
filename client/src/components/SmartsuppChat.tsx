
import React, { useEffect } from 'react';

declare global {
  interface Window {
    smartsupp?: any;
  }
}

export function SmartsuppChat() {
  useEffect(() => {
    // Initialize Smartsupp chat widget
    window.smartsupp || (function(d) {
      var s, c, o = document.getElementsByTagName('script')[0];
      if (!o) return;
      s = d.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://www.smartsuppchat.com/loader.js?';
      c = d.getElementsByTagName('script')[0];
      if (c && c.parentNode) {
        c.parentNode.insertBefore(s, c);
      }
    })(document);

    // Configure Smartsupp (replace with your actual chat key)
    window.smartsupp = window.smartsupp || function() {
      (window.smartsupp._ = window.smartsupp._ || []).push(arguments);
    };
    
    // You can configure smartsupp here if needed
    // window.smartsupp('chat:hide');
  }, []);

  return null; // This component doesn't render anything visible
}

export default SmartsuppChat;
