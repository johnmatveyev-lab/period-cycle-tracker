'use client';
import { SymptomProvider } from './context/SymptomContext';
import { NotificationProvider } from './context/NotificationContext';
import { DateProvider } from './context/DateContext';
import { UserProvider } from './context/UserContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SymptomProvider>
      <NotificationProvider>
        <DateProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </DateProvider>
      </NotificationProvider>
    </SymptomProvider>
  );
}
