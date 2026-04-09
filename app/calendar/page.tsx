'use client';
import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Smile, Droplet, Zap, Pencil, Trash2 } from 'lucide-react';

const initialLogs: Record<number, { mood: string; flow: string; flowLevel: 'none' | 'light' | 'medium' | 'heavy'; symptoms: string[] }> = {
  24: { mood: 'Calm & Focused', flow: 'No flow yet', flowLevel: 'none', symptoms: ['Mild Cramps', 'Bloating', 'Tender Breasts'] },
  23: { mood: 'Energetic', flow: 'Light', flowLevel: 'light', symptoms: ['None'] },
  25: { mood: 'Tired', flow: 'Heavy', flowLevel: 'heavy', symptoms: ['Cramps', 'Fatigue'] },
};

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState(24);
  const [logs, setLogs] = useState(initialLogs);

  const handleDelete = (day: number) => {
    const newLogs = { ...logs };
    delete newLogs[day];
    setLogs(newLogs);
  };

  const handleEdit = (day: number) => {
    alert(`Edit log for Jan ${day}`);
  };

  const log = logs[selectedDay];

  return (
    <main className="pt-20 px-4 space-y-6 max-w-2xl mx-auto">
      {/* Calendar Grid Card */}
      <section className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-6 shadow-sm">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-100 rounded-full transition-all duration-300"><ChevronLeft size={20} /></button>
            <h2 className="text-slate-900 font-bold text-lg">January 2024</h2>
            <button className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-100 rounded-full transition-all duration-300"><ChevronRight size={20} /></button>
          </div>
          <div className="flex gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-sky-500 mt-1.5"></span>
            <span className="text-xs text-slate-500">Predicted Period</span>
          </div>
        </div>
        {/* Days Labels */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center text-[10px] font-bold text-slate-400 tracking-wider uppercase">{day}</div>
          ))}
        </div>
        {/* Grid Dates */}
        <div className="grid grid-cols-7 gap-y-3 gap-x-1">
          {[...Array(31)].map((_, i) => {
            const day = i + 1;
            const isPredicted = day >= 12 && day <= 16;
            const isSelected = day === selectedDay;
            const log = logs[day];
            const flowLevel = log?.flowLevel || 'none';

            return (
              <div 
                key={day} 
                onClick={() => setSelectedDay(day)}
                className={`aspect-square flex flex-col items-center justify-center text-sm relative cursor-pointer transition-all duration-300 hover:bg-sky-100 rounded-lg ${isSelected ? 'font-bold text-purple-600' : 'text-slate-800'}`}
              >
                {isPredicted && <div className="absolute inset-0 bg-sky-100 rounded-full scale-75 border border-sky-200"></div>}
                {isSelected && <div className="absolute inset-0 border-2 border-purple-400 rounded-xl rotate-12 scale-90"></div>}
                <span className="relative z-10">{day}</span>
                {flowLevel !== 'none' && (
                  <div 
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full ${
                      flowLevel === 'light' ? 'bg-purple-200' : 
                      flowLevel === 'medium' ? 'bg-purple-400' : 'bg-purple-600'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Selected Day Details */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-slate-500 font-medium text-sm">Daily Logs — Jan {selectedDay}</h3>
          <div className="flex items-center gap-2">
            {log && (
              <>
                <button onClick={() => handleEdit(selectedDay)} className="p-2 text-sky-600 hover:bg-sky-100 rounded-full transition-all duration-300">
                  <Pencil size={18} />
                </button>
                <button onClick={() => handleDelete(selectedDay)} className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-all duration-300">
                  <Trash2 size={18} />
                </button>
              </>
            )}
            <button className="bg-sky-100 border border-sky-200 text-sky-700 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 active:scale-95 transition-all duration-300 hover:bg-sky-200 hover:border-sky-300">
              <Plus size={16} />
              Add Log
            </button>
          </div>
        </div>
        {/* Log Bento Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-2 border border-slate-200/50 shadow-sm hover:border-sky-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 text-sky-600">
              <Smile size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Mood</span>
            </div>
            <p className="text-slate-900 text-lg font-medium">{log?.mood || 'No data'}</p>
          </div>
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-2 border border-slate-200/50 shadow-sm hover:border-purple-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 text-purple-500">
              <Droplet size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Flow</span>
            </div>
            <p className="text-slate-900 text-lg font-medium">{log?.flow || 'No data'}</p>
          </div>
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-2 col-span-2 border border-slate-200/50 shadow-sm hover:border-sky-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 text-sky-600">
              <Zap size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Symptoms</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {log?.symptoms.map(symptom => (
                <span key={symptom} className="bg-slate-100 px-3 py-1 rounded-full text-xs border border-slate-200 text-slate-700">{symptom}</span>
              )) || <span className="text-slate-400 text-sm">No data</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Insights Snippet */}
      <section className="bg-white/60 backdrop-blur-xl rounded-2xl overflow-hidden relative border border-slate-200/50 shadow-sm hover:border-sky-200 hover:shadow-md transition-all duration-300">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-sky-200 via-transparent to-purple-200"></div>
        <div className="relative p-5 flex items-center justify-between">
          <div>
            <h4 className="text-slate-900 font-bold">Predicted Start</h4>
            <p className="text-slate-500 text-sm">Your next period is likely in 3 days.</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-sky-200 flex items-center justify-center">
            <span className="text-sky-700 font-bold">3d</span>
          </div>
        </div>
      </section>
    </main>
  );
}
