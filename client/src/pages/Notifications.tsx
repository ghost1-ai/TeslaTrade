import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ref, onValue, off } from 'firebase/database';
import { db } from '@/lib/firebase';
import type { Notification } from '@shared/schema';

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) return;

    const notificationsRef = ref(db, `notifications/${user.uid}`);
    
    const handleNotifications = (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const notificationsList = Object.values(data) as Notification[];
        setNotifications(notificationsList.sort((a, b) => b.timestamp - a.timestamp));
      }
    };

    onValue(notificationsRef, handleNotifications);

    return () => {
      off(notificationsRef, 'value', handleNotifications);
    };
  }, [user]);

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="bg-tesla-surface rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-gray-400 text-sm">{notification.message}</p>
                </div>
                <span className="text-xs text-gray-500">{formatTime(notification.timestamp)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-tesla-surface rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Welcome to Tesla Invest</h3>
            <p className="text-gray-400 text-sm">Complete your profile to start trading</p>
          </div>
        )}
      </div>
    </div>
  );
}
