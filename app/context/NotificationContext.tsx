'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationContextType {
  predictionAlertsEnabled: boolean;
  predictionAlertsTime: string;
  predictionAlertsType: string;
  symptomTrackingEnabled: boolean;
  symptomTrackingTime: string;
  symptomTrackingType: string;
  togglePredictionAlerts: () => void;
  setPredictionAlertsTime: (time: string) => void;
  setPredictionAlertsType: (type: string) => void;
  toggleSymptomTracking: () => void;
  setSymptomTrackingTime: (time: string) => void;
  setSymptomTrackingType: (type: string) => void;
  resetNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [predictionAlertsEnabled, setPredictionAlertsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('predictionAlertsEnabled');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  const [predictionAlertsTime, setPredictionAlertsTime] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('predictionAlertsTime') || '09:00';
    }
    return '09:00';
  });
  const [predictionAlertsType, setPredictionAlertsType] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('predictionAlertsType') || 'push';
    }
    return 'push';
  });
  const [symptomTrackingEnabled, setSymptomTrackingEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('symptomTrackingEnabled');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  const [symptomTrackingTime, setSymptomTrackingTime] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('symptomTrackingTime') || '20:00';
    }
    return '20:00';
  });
  const [symptomTrackingType, setSymptomTrackingType] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('symptomTrackingType') || 'push';
    }
    return 'push';
  });

  const togglePredictionAlerts = () => {
    const newValue = !predictionAlertsEnabled;
    setPredictionAlertsEnabled(newValue);
    localStorage.setItem('predictionAlertsEnabled', JSON.stringify(newValue));
  };

  const setPredictionAlertsTimeHandler = (time: string) => {
    setPredictionAlertsTime(time);
    localStorage.setItem('predictionAlertsTime', time);
  };

  const setPredictionAlertsTypeHandler = (type: string) => {
    setPredictionAlertsType(type);
    localStorage.setItem('predictionAlertsType', type);
  };

  const toggleSymptomTracking = () => {
    const newValue = !symptomTrackingEnabled;
    setSymptomTrackingEnabled(newValue);
    localStorage.setItem('symptomTrackingEnabled', JSON.stringify(newValue));
  };

  const setSymptomTrackingTimeHandler = (time: string) => {
    setSymptomTrackingTime(time);
    localStorage.setItem('symptomTrackingTime', time);
  };

  const setSymptomTrackingTypeHandler = (type: string) => {
    setSymptomTrackingType(type);
    localStorage.setItem('symptomTrackingType', type);
  };

  const resetNotifications = () => {
    setPredictionAlertsEnabled(false);
    setPredictionAlertsTime('09:00');
    setPredictionAlertsType('push');
    setSymptomTrackingEnabled(false);
    setSymptomTrackingTime('20:00');
    setSymptomTrackingType('push');
    localStorage.removeItem('predictionAlertsEnabled');
    localStorage.removeItem('predictionAlertsTime');
    localStorage.removeItem('predictionAlertsType');
    localStorage.removeItem('symptomTrackingEnabled');
    localStorage.removeItem('symptomTrackingTime');
    localStorage.removeItem('symptomTrackingType');
  };

  return (
    <NotificationContext.Provider value={{
      predictionAlertsEnabled,
      predictionAlertsTime,
      predictionAlertsType,
      symptomTrackingEnabled,
      symptomTrackingTime,
      symptomTrackingType,
      togglePredictionAlerts,
      setPredictionAlertsTime: setPredictionAlertsTimeHandler,
      setPredictionAlertsType: setPredictionAlertsTypeHandler,
      toggleSymptomTracking,
      setSymptomTrackingTime: setSymptomTrackingTimeHandler,
      setSymptomTrackingType: setSymptomTrackingTypeHandler,
      resetNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
