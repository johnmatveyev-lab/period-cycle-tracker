'use client';
import { useEffect } from 'react';
import { useNotificationContext } from './context/NotificationContext';

export const NotificationManager = () => {
  const { dailyCheckInEnabled, dailyCheckInTime } = useNotificationContext();

  useEffect(() => {
    if (!dailyCheckInEnabled || !('Notification' in window)) return;

    const checkPermission = async () => {
      if (Notification.permission === 'default') {
        await Notification.requestPermission();
      }
    };
    checkPermission();

    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      if (currentTime === dailyCheckInTime && Notification.permission === 'granted') {
        new Notification('Daily Check-in', {
          body: 'Time to log your symptoms and mood!',
        });
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [dailyCheckInEnabled, dailyCheckInTime]);

  return null;
};
