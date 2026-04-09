'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useSymptomContext } from '../context/SymptomContext';
import { useNotificationContext } from '../context/NotificationContext';
import { useUserContext } from '../context/UserContext';
import { Pencil, Trash2, Plus, ArrowLeft, User, Lock, Calendar, Bell, Activity, LogOut } from 'lucide-react';

export default function Settings() {
  const { symptoms, addSymptom, removeSymptom, editSymptom, resetSymptoms } = useSymptomContext();
  const { dailyCheckInEnabled, dailyCheckInTime, periodStartEnabled, toggleDailyCheckIn, setDailyCheckInTime, togglePeriodStart, resetNotifications } = useNotificationContext();
  const { 
    predictionAlertsEnabled, predictionAlertsTime, predictionAlertsType,
    symptomTrackingEnabled, symptomTrackingTime, symptomTrackingType,
    togglePredictionAlerts, setPredictionAlertsTime, setPredictionAlertsType,
    toggleSymptomTracking, setSymptomTrackingTime, setSymptomTrackingType
  } = useNotificationContext();
  const { userInfo, setUserInfo } = useUserContext();
  const [newSymptom, setNewSymptom] = useState('');
  const [editingSymptom, setEditingSymptom] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);

  const handleReset = () => {
    resetSymptoms();
    resetNotifications();
    alert('Settings reset to default.');
  };

  const handleAdd = () => {
    if (newSymptom.trim()) {
      addSymptom(newSymptom.trim());
      setNewSymptom('');
    }
  };

  const handleEdit = (symptom: string) => {
    setEditingSymptom(symptom);
    setEditValue(symptom);
  };

  const saveEdit = (oldSymptom: string) => {
    if (editValue.trim()) {
      editSymptom(oldSymptom, editValue.trim());
      setEditingSymptom(null);
    }
  };

  const saveProfile = () => {
    setUserInfo(tempUserInfo);
    setIsEditingProfile(false);
  };

  return (
    <main className="pt-24 px-4 pb-24 max-w-2xl mx-auto space-y-6">
      <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-slate-200/50 shadow-sm h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-sky-100 transition-colors active:scale-95 duration-200">
            <ArrowLeft className="text-sky-600" size={24} />
          </button>
          <h1 className="text-slate-900 font-['Inter'] tracking-tight font-semibold text-xl">Settings</h1>
        </div>
      </header>

      {/* Profile Header */}
      <section className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-6 flex items-center gap-5 relative overflow-hidden shadow-sm">
        <div className="relative">
          <Image 
            src="https://picsum.photos/seed/profile/200/200" 
            alt="User profile" 
            width={80} 
            height={80} 
            className="rounded-full border-2 border-sky-200 object-cover" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-1 -right-1 bg-sky-600 text-white rounded-full p-1 border-2 border-white">
            <Pencil size={16} />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">{userInfo.name}</h2>
          <p className="text-slate-500 text-sm">Day 14 • Ovulation Phase</p>
        </div>
      </section>

      {/* Profile Section */}
      <section>
        <h3 className="px-2 mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Profile</h3>
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-2xl overflow-hidden divide-y divide-slate-200/50 shadow-sm">
          <div className="flex items-center justify-between p-4 hover:bg-sky-50 transition-colors cursor-pointer group" onClick={() => setIsEditingProfile(!isEditingProfile)}>
            <div className="flex items-center gap-4">
              <User className="text-sky-600" size={20} />
              <span className="text-slate-900 font-medium">Personal Information</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 hover:bg-sky-50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <Lock className="text-sky-600" size={20} />
              <span className="text-slate-900 font-medium">Account Security</span>
            </div>
          </div>
        </div>
        {isEditingProfile && (
          <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-6 mt-4 shadow-sm space-y-4">
            <input type="text" value={tempUserInfo.name} onChange={(e) => setTempUserInfo({...tempUserInfo, name: e.target.value})} className="w-full bg-white/50 text-slate-900 rounded-lg px-4 py-2 border border-slate-200" placeholder="Name" />
            <input type="email" value={tempUserInfo.email} onChange={(e) => setTempUserInfo({...tempUserInfo, email: e.target.value})} className="w-full bg-white/50 text-slate-900 rounded-lg px-4 py-2 border border-slate-200" placeholder="Email" />
            <input type="number" value={tempUserInfo.age} onChange={(e) => setTempUserInfo({...tempUserInfo, age: e.target.value})} className="w-full bg-white/50 text-slate-900 rounded-lg px-4 py-2 border border-slate-200" placeholder="Age" />
            <button onClick={saveProfile} className="w-full bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all">Save Changes</button>
          </div>
        )}
      </section>

      {/* Notification Settings */}
      <section>
        <h3 className="px-2 mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Notifications</h3>
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-2xl overflow-hidden divide-y divide-slate-200/50 shadow-sm">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-900 font-medium">Prediction Alerts</span>
              <button onClick={togglePredictionAlerts} className={`w-12 h-6 rounded-full transition-colors ${predictionAlertsEnabled ? 'bg-sky-600' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${predictionAlertsEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
            {predictionAlertsEnabled && (
              <div className="flex gap-2">
                <input type="time" value={predictionAlertsTime} onChange={(e) => setPredictionAlertsTime(e.target.value)} className="bg-white/50 rounded-lg px-2 py-1 border border-slate-200" />
                <select value={predictionAlertsType} onChange={(e) => setPredictionAlertsType(e.target.value)} className="bg-white/50 rounded-lg px-2 py-1 border border-slate-200">
                  <option value="push">Push</option>
                  <option value="email">Email</option>
                  <option value="both">Both</option>
                </select>
              </div>
            )}
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-900 font-medium">Symptom Tracking</span>
              <button onClick={toggleSymptomTracking} className={`w-12 h-6 rounded-full transition-colors ${symptomTrackingEnabled ? 'bg-sky-600' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${symptomTrackingEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
            {symptomTrackingEnabled && (
              <div className="flex gap-2">
                <input type="time" value={symptomTrackingTime} onChange={(e) => setSymptomTrackingTime(e.target.value)} className="bg-white/50 rounded-lg px-2 py-1 border border-slate-200" />
                <select value={symptomTrackingType} onChange={(e) => setSymptomTrackingType(e.target.value)} className="bg-white/50 rounded-lg px-2 py-1 border border-slate-200">
                  <option value="push">Push</option>
                  <option value="email">Email</option>
                  <option value="both">Both</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Manage Symptoms */}
      <section className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-6 space-y-6 shadow-sm">
        <h2 className="text-slate-900 font-bold text-lg">Manage Symptoms</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSymptom}
            onChange={(e) => setNewSymptom(e.target.value)}
            className="flex-1 bg-white/50 text-slate-900 rounded-lg px-4 py-2 border border-slate-200 focus:outline-none focus:border-sky-500 transition-all"
            placeholder="Add new symptom"
          />
          <button onClick={handleAdd} className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all">
            <Plus size={20} />
          </button>
        </div>
        <ul className="space-y-2">
          {symptoms.map((symptom) => (
            <li key={symptom} className="flex items-center justify-between bg-white/50 p-3 rounded-lg border border-slate-200">
              {editingSymptom === symptom ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 bg-white text-slate-900 rounded px-2 py-1 border border-slate-300 focus:outline-none"
                />
              ) : (
                <span className="text-slate-900">{symptom}</span>
              )}
              <div className="flex gap-2">
                {editingSymptom === symptom ? (
                  <button onClick={() => saveEdit(symptom)} className="text-green-600 font-semibold">Save</button>
                ) : (
                  <button onClick={() => handleEdit(symptom)} className="text-sky-600"><Pencil size={18} /></button>
                )}
                <button onClick={() => removeSymptom(symptom)} className="text-red-500"><Trash2 size={18} /></button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Logout */}
      <button onClick={handleReset} className="w-full py-4 px-6 rounded-xl bg-white/60 backdrop-blur-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2 mb-4">
        Reset to Default
      </button>
      <button className="w-full py-4 px-6 rounded-xl bg-white/60 backdrop-blur-xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all shadow-sm flex items-center justify-center gap-2">
        <LogOut size={20} />
        Logout
      </button>
    </main>
  );
}