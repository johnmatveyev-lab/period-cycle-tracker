'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const cycleData = [
  { month: 'AUG', length: 28 },
  { month: 'SEP', length: 29 },
  { month: 'OCT', length: 27 },
  { month: 'NOV', length: 28 },
  { month: 'DEC', length: 30 },
  { month: 'JAN', length: 28 },
];

export default function Insights() {
  return (
    <main className="pt-20 pb-28 px-4 max-w-2xl mx-auto space-y-6">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-white/60 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-sky-600">bar_chart</span>
          <h1 className="font-['Inter'] font-semibold tracking-tight text-slate-900">Insights</h1>
        </div>
        <button className="text-sky-700 font-bold hover:bg-sky-100 transition-colors active:scale-95 duration-200 px-4 py-1 rounded-lg">
          Save
        </button>
      </header>

      {/* Overview Section: Bento Grid */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-5 shadow-sm col-span-2 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Status</p>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">High Regularity</h2>
          </div>
          <div className="h-12 w-12 rounded-full border border-sky-200 flex items-center justify-center bg-sky-50">
            <span className="material-symbols-outlined text-sky-600" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-5 shadow-sm">
          <p className="text-slate-500 text-xs font-medium mb-1">Avg. Cycle</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-sky-700">28</span>
            <span className="text-slate-500 text-sm">days</span>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-5 shadow-sm">
          <p className="text-slate-500 text-xs font-medium mb-1">Variation</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-purple-600">±1.2</span>
            <span className="text-slate-500 text-sm">days</span>
          </div>
        </div>
      </section>

      {/* Insights Card */}
      <section className="bg-white/75 backdrop-blur-2xl border border-slate-200/50 p-6 rounded-2xl relative overflow-hidden group shadow-sm">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-100 rounded-full blur-3xl group-hover:bg-sky-200 transition-all"></div>
        <div className="relative z-10 flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-purple-600" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Phase Insight</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Your mood tends to be <span className="text-sky-700 font-semibold italic">&apos;Calm&apos;</span> during your follicular phase. This is a great time for deep focus and creative work.
            </p>
          </div>
        </div>
      </section>

      {/* Cycle History Chart */}
      <section className="bg-white/60 backdrop-blur-xl border border-slate-200/50 p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="font-bold text-lg text-slate-900">Cycle History</h3>
            <p className="text-xs text-slate-500">Last 6 months</p>
          </div>
          <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-1 rounded uppercase tracking-tighter">Normal Range</span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cycleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
              <YAxis domain={[20, 35]} stroke="#64748b" fontSize={10} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="length" stroke="#0284c7" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Symptom Frequency */}
      <section className="bg-white/60 backdrop-blur-xl border border-slate-200/50 p-6 rounded-2xl shadow-sm">
        <h3 className="font-bold text-lg text-slate-900 mb-6">Symptom Frequency</h3>
        <div className="space-y-5">
          {[
            { name: 'Bloating', percent: 80 },
            { name: 'Cramps', percent: 60 },
            { name: 'Headache', percent: 35 },
            { name: 'Fatigue', percent: 20 },
          ].map(symptom => (
            <div key={symptom.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-900">{symptom.name}</span>
                <span className="text-sky-700 font-bold">{symptom.percent}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: `${symptom.percent}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
