
import React from 'react';

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, max, label, unit, color = 'blue' }) => {
  const percentage = Math.min(100, (value / max) * 100);
  const strokeDash = (percentage / 100) * 283;

  const colorMap: Record<string, string> = {
    blue: 'stroke-blue-500',
    green: 'stroke-emerald-500',
    red: 'stroke-rose-500',
    amber: 'stroke-amber-500'
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64" cy="64" r="50"
            className="stroke-slate-800 fill-none"
            strokeWidth="8"
          />
          <circle
            cx="64" cy="64" r="50"
            className={`${colorMap[color]} fill-none transition-all duration-500 ease-out`}
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={283 - strokeDash}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-100">{Math.round(value)}</span>
          <span className="text-[10px] uppercase text-slate-400 font-medium tracking-tighter">{unit}</span>
        </div>
      </div>
      <span className="mt-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
  );
};

export default Gauge;
