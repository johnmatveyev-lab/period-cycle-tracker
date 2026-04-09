'use client';
import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { db, auth } from './firebase';
import { collection, query, orderBy, limit, getDocs, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useSymptomContext } from './context/SymptomContext';
import { useDateContext } from './context/DateContext';

export default function Home() {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { symptoms } = useSymptomContext();
  const { currentDate } = useDateContext();

  const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const q = query(collection(db, 'users', userId, 'predictions'), orderBy('lastUpdated', 'desc'), limit(1));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setPrediction(snapshot.docs[0].data());
        }
      };
      fetchData();
    }
  }, [userId]);

  const generateInsight = async () => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: "Give me a quick health insight based on a cycle day 14 ovulation phase.",
    });
    setInsight(response.text || '');
    setLoading(false);
  };

  const generatePrediction = async () => {
    if (!userId) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: "Analyze cycle data and predict next period start date and fertile window. Return JSON with nextPeriodStart, fertileWindowStart, fertileWindowEnd.",
      config: { responseMimeType: "application/json" }
    });
    
    const data = JSON.parse(response.text || '{}');
    const newPrediction = { ...data, userId, lastUpdated: new Date().toISOString() };
    await addDoc(collection(db, 'users', userId, 'predictions'), newPrediction);
    setPrediction(newPrediction);
    setLoading(false);
  };

  return (
    <main className="mt-20 px-4 space-y-6 max-w-lg mx-auto">
      <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-sky-500/10 h-16 flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-sky-600">calendar_today</span>
          <h1 className="font-semibold tracking-tight text-slate-900">{formattedDate}</h1>
        </div>
        <button className="text-sky-600 font-semibold hover:bg-sky-500/20 hover:text-sky-700 transition-all duration-300 px-3 py-1 rounded-lg">Save</button>
      </header>

      <div className="space-y-1 pt-2">
        <h2 className="text-2xl font-bold text-slate-900">Today&apos;s Check-in</h2>
        <p className="text-slate-500 text-sm">Log your symptoms and mood to track patterns.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/60 backdrop-blur-md border border-sky-500/10 p-5 rounded-xl flex flex-col hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">Cycle Day</span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-slate-900">14</span>
            <span className="text-slate-500 text-sm">/ 28</span>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-md border border-sky-500/10 p-5 rounded-xl flex flex-col hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">Phase</span>
          <span className="text-lg font-semibold text-slate-900">Ovulation</span>
        </div>
      </div>

      {/* Symptoms Section */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Symptoms</h3>
        <div className="flex flex-wrap gap-2">
          {symptoms.map((symptom) => (
            <button key={symptom} className={`px-4 py-2 rounded-full border ${symptom === 'Bloating' ? 'bg-sky-500/20 border-sky-500/40 text-sky-700' : 'bg-white/60 border-sky-500/10 text-slate-700'} hover:border-sky-500/60 hover:bg-sky-500/10 transition-all duration-300`}>
              <span className="text-xs">{symptom}</span>
              {symptom === 'Bloating' && <span className="material-symbols-outlined text-xs ml-2">check</span>}
            </button>
          ))}
          <button className="px-4 py-2 rounded-full border border-dashed border-sky-500/20 text-slate-500 flex items-center gap-1 hover:border-sky-500/50 hover:text-sky-600 hover:bg-sky-500/5 transition-all duration-300">
            <span className="material-symbols-outlined text-xs">add</span>
            <span className="text-xs">Add</span>
          </button>
        </div>
      </section>

      {/* Mood Section */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Mood</h3>
        <div className="bg-white/75 backdrop-blur-md border border-sky-500/10 p-4 rounded-xl flex justify-between items-center">
          {['😔', '😐', '😊', '🤩', '🤬'].map((mood, idx) => (
            <button key={mood} className={`p-2 rounded-lg ${idx === 2 ? 'bg-sky-500/10 ring-1 ring-sky-500/30' : 'hover:bg-slate-900/10 hover:scale-110'} transition-all duration-300`}>
              <span className="text-2xl">{mood}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Gemini Insight Section */}
      <section className="space-y-4">
        <button 
          onClick={generateInsight}
          disabled={loading}
          className="w-full bg-sky-500/20 text-sky-700 font-bold py-3 rounded-xl hover:bg-sky-500/30 hover:shadow-md hover:shadow-sky-500/20 transition-all duration-300"
        >
          {loading ? 'Generating...' : 'Get AI Insight'}
        </button>
        {insight && (
          <div className="bg-white/60 backdrop-blur-md border border-sky-500/10 p-5 rounded-xl text-slate-700 text-sm leading-relaxed">
            {insight}
          </div>
        )}
      </section>

      {/* Prediction Section */}
      <section className="space-y-4">
        <button 
          onClick={generatePrediction}
          disabled={loading || !userId}
          className="w-full bg-purple-500/20 text-purple-700 font-bold py-3 rounded-xl hover:bg-purple-500/30 transition-all"
        >
          {loading ? 'Analyzing...' : 'Update Prediction'}
        </button>
        {prediction && (
          <div className="bg-white/60 backdrop-blur-md border border-purple-500/10 p-5 rounded-xl text-slate-700 text-sm leading-relaxed space-y-2 hover:border-purple-500/30 transition-all duration-300">
            <h4 className="font-bold text-purple-800">Cycle Prediction</h4>
            <p>Next Period: {prediction.nextPeriodStart}</p>
            <p>Fertile Window: {prediction.fertileWindowStart} - {prediction.fertileWindowEnd}</p>
          </div>
        )}
      </section>
    </main>
  );
}
