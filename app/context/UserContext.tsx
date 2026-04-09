'use client';
import React, { createContext, useContext, useState } from 'react';

interface UserInfo {
  name: string;
  email: string;
  age: string;
}

const UserContext = createContext({
  userInfo: { name: 'Kimberly Mathews', email: 'kimberly@example.com', age: '28' },
  setUserInfo: (info: UserInfo) => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: 'Kimberly Mathews', email: 'kimberly@example.com', age: '28' });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
