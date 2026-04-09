'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SymptomContextType {
  symptoms: string[];
  addSymptom: (symptom: string) => void;
  removeSymptom: (symptom: string) => void;
  editSymptom: (oldSymptom: string, newSymptom: string) => void;
  resetSymptoms: () => void;
}

const SymptomContext = createContext<SymptomContextType | undefined>(undefined);

export const SymptomProvider = ({ children }: { children: ReactNode }) => {
  const [symptoms, setSymptoms] = useState<string[]>(['Cramps', 'Bloating', 'Headache', 'Fatigue', 'Nausea']);

  const addSymptom = (symptom: string) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter((s) => s !== symptom));
  };

  const editSymptom = (oldSymptom: string, newSymptom: string) => {
    setSymptoms(symptoms.map((s) => (s === oldSymptom ? newSymptom : s)));
  };

  const resetSymptoms = () => {
    setSymptoms(['Cramps', 'Bloating', 'Headache', 'Fatigue', 'Nausea']);
  };

  return (
    <SymptomContext.Provider value={{ symptoms, addSymptom, removeSymptom, editSymptom, resetSymptoms }}>
      {children}
    </SymptomContext.Provider>
  );
};

export const useSymptomContext = () => {
  const context = useContext(SymptomContext);
  if (!context) {
    throw new Error('useSymptomContext must be used within a SymptomProvider');
  }
  return context;
};
