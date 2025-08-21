import React from 'react';
import { isFirebaseConfigured } from '@/lib/firebase';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export function FirebaseStatus() {
  if (isFirebaseConfigured) {
    return (
      <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 z-50">
        <CheckCircle size={16} />
        <span className="text-sm">Firebase Connected</span>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 z-50 max-w-sm">
      <AlertTriangle size={16} />
      <div className="text-sm">
        <div className="font-semibold">Firebase Setup Required</div>
        <div className="text-xs mt-1">
          Please enable Authentication and Realtime Database in your Firebase console
        </div>
      </div>
    </div>
  );
}