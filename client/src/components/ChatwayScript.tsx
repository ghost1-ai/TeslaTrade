import { useEffect } from 'react';

export function ChatwayScript() {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'chatway';
    script.async = true;
    script.src = 'https://cdn.chatway.app/widget.js?id=nOVbp1Qu3f2j';
    
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('chatway');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null;
}
