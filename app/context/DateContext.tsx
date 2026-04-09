'use client';
import React, { createContext, useContext, useState } from 'react';

const DateContext = createContext({
  currentDate: new Date(),
});

export function DateProvider({ children }: { children: React.ReactNode }) {
  const [currentDate] = useState(new Date());

  return (
    <DateContext.Provider value={{ currentDate }}>
      {children}
    </DateContext.Provider>
  );
}

export function useDateContext() {
  return useContext(DateContext);
}
