
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  DrivingMode, 
  VehicleState, 
  DriverState, 
  EnvironmentState, 
  RiskLevel 
} from './types';
import { getTakeoverExplanation } from './geminiService';
import RoadSimulation from './components/RoadSimulation';
import Gauge from './components/Gauge';

// Icons
const HomeIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const DashboardIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const ArchitectureIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const LogicIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Overview', icon: <HomeIcon /> },
    { path: '/simulation', label: 'HMI Simulation', icon: <DashboardIcon /> },
    { path: '/architecture', label: 'Architecture', icon: <ArchitectureIcon /> },
    { path: '/logic', label: 'Decision Logic', icon: <LogicIcon /> },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">AV</div>
        <span className="hidden md:block font-bold text-slate-100 tracking-tight">HMI CONTROL</span>
      </div>
      <div className="flex-1 py-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-6 py-4 transition-all duration-200 ${
              location.pathname === item.path 
                ? 'text-blue-400 bg-blue-500/10 border-r-2 border-blue-500' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            {item.icon}
            <span className="hidden md:block font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

// --- PAGES ---

const Home = () => (
  <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <header className="space-y-4">
      <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
        Context-Aware HMI for <span className="text-blue-500">Autonomous Transitions</span>
      </h1>
      <p className="text-xl text-slate-400 leading-relaxed">
        Next-generation interface design for safe and intuitive shifting between manual and autonomous driving modes.
      </p>
    </header>
    
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/30 transition-colors">
        <h3 className="text-xl font-bold text-white mb-2">The Challenge</h3>
        <p className="text-slate-400">The "handoff" problem is critical in Level 3/4 autonomy. Drivers may be distracted or drowsy when the system requires manual takeover.</p>
      </div>
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/30 transition-colors">
        <h3 className="text-xl font-bold text-white mb-2">Our Solution</h3>
        <p className="text-slate-400">An HMI that monitors driver state (eyes, hands, drowsiness) and environment to adjust takeover urgency and communication style.</p>
      </div>
    </div>

    <section className="bg-blue-600/10 p-8 rounded-3xl border border-blue-500/20">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Project Objectives</h2>
      <ul className="grid md:grid-cols-2 gap-4">
        {[
          'Real-time Driver Monitoring Simulation',
          'Multi-modal Alert System (Visual/Audio)',
          'Predictive Risk Assessment',
          'AI-Generated Takeover Explanations',
          'Adaptive Cruise Control Visualization'
        ].map((obj, i) => (
          <li key={i} className="flex items-center space-x-3 text-slate-300">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>{obj}</span>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

const Simulation = () => {
  const [vehicle, setVehicle] = useState<VehicleState>({
    speed: 0,
    leadDistance: 80,
    steeringAngle: 0,
    mode: DrivingMode.MANUAL,
    accActive: false,
    lanePosition: 0
  });

  const [driver, setDriver] = useState<DriverState>({
    eyeAttention: 95,
    drowsiness: 5,
    handsOnWheel: true,
    readinessScore: 98
  });

  const [env, setEnv] = useState<EnvironmentState>({
    complexity: 20,
    weather: 'CLEAR',
    trafficDensity: 'LOW'
  });

  const [aiExplanation, setAiExplanation] = useState<{reason: string, urgency: number, action: string} | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicle(prev => {
        let nextSpeed = prev.speed;
        let nextDistance = prev.leadDistance;

        if (prev.mode === DrivingMode.AUTONOMOUS) {
          // ACC Logic
          if (prev.leadDistance < 40) {
            nextSpeed = Math.max(20, prev.speed - 2);
          } else if (prev.leadDistance > 100) {
            nextSpeed = Math.min(110, prev.speed + 1);
          }
          // Lane keeping
          const nextLane = prev.lanePosition + (Math.random() - 0.5) * 0.05;
          return { ...prev, speed: nextSpeed, leadDistance: nextDistance - (nextSpeed / 50), lanePosition: nextLane };
        } else {
          // Manual Drift/Randomness
          return { ...prev, leadDistance: prev.leadDistance - (prev.speed / 60) + (Math.random() * 2) };
        }
      });

      // Randomized lead vehicle reset
      setVehicle(prev => {
        if (prev.leadDistance < 10) return { ...prev, leadDistance: 150 };
        return prev;
      });

    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerTOR = useCallback(async () => {
    setVehicle(v => ({ ...v, mode: DrivingMode.TOR }));
    setIsAiThinking(true);
    const explanation = await getTakeoverExplanation(vehicle, driver, env);
    setAiExplanation(explanation);
    setIsAiThinking(false);
  }, [vehicle, driver, env]);

  const toggleMode = () => {
    if (vehicle.mode === DrivingMode.MANUAL) {
      setVehicle(v => ({ ...v, mode: DrivingMode.AUTONOMOUS, speed: 65 }));
      setAiExplanation(null);
    } else {
      setVehicle(v => ({ ...v, mode: DrivingMode.MANUAL }));
      setAiExplanation(null);
    }
  };

  const handleManualSpeed = (delta: number) => {
    setVehicle(v => ({ ...v, speed: Math.max(0, Math.min(180, v.speed + delta)) }));
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {/* Left: Dashboard Stats */}
      <div className="space-y-6">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Instrument Cluster</h3>
          <div className="flex justify-around items-end">
            <Gauge value={vehicle.speed} max={180} label="Speed" unit="km/h" color={vehicle.speed > 120 ? 'red' : 'blue'} />
            <Gauge value={vehicle.leadDistance} max={200} label="Distance" unit="meters" color={vehicle.leadDistance < 30 ? 'amber' : 'green'} />
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
             <button 
                onClick={toggleMode}
                className={`py-4 rounded-xl font-bold text-xs tracking-widest transition-all ${
                  vehicle.mode === DrivingMode.AUTONOMOUS 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-slate-700 text-slate-300'
                }`}
             >
               {vehicle.mode === DrivingMode.AUTONOMOUS ? 'AUTO ENGAGED' : 'ENGAGE AUTO'}
             </button>
             <button 
                onClick={() => setVehicle(v => ({...v, mode: DrivingMode.MANUAL}))}
                className={`py-4 rounded-xl font-bold text-xs tracking-widest transition-all ${
                  vehicle.mode === DrivingMode.MANUAL 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                    : 'bg-slate-700 text-slate-300'
                }`}
             >
               MANUAL
             </button>
          </div>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Driver Status (DMS)</h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Eye Attention</span>
                <span className={`text-sm font-bold ${driver.eyeAttention < 70 ? 'text-red-400' : 'text-emerald-400'}`}>{driver.eyeAttention}%</span>
             </div>
             <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${driver.eyeAttention}%` }} />
             </div>
             
             <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Drowsiness Level</span>
                <span className={`text-sm font-bold ${driver.drowsiness > 40 ? 'text-red-400' : 'text-emerald-400'}`}>{driver.drowsiness}%</span>
             </div>
             <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${driver.drowsiness}%` }} />
             </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700 flex justify-between items-center">
             <div className="text-xs font-bold text-slate-500">HANDS ON WHEEL</div>
             <div className={`w-3 h-3 rounded-full ${driver.handsOnWheel ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-red-500'}`} />
          </div>
        </div>
      </div>

      {/* Center: Live Road Feed */}
      <div className="lg:col-span-2 space-y-6">
        <RoadSimulation vehicleState={vehicle} />

        <div className="grid md:grid-cols-2 gap-6">
          {/* AI Reasoning Panel */}
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">HMI Reasoning Engine</h3>
               {isAiThinking && <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />}
            </div>
            
            <div className="flex-1">
              {aiExplanation ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                   <div>
                     <p className="text-xs text-slate-500 uppercase mb-1">Observation</p>
                     <p className="text-slate-200 leading-relaxed italic">"{aiExplanation.reason}"</p>
                   </div>
                   <div className="flex space-x-4">
                      <div className="flex-1">
                         <p className="text-xs text-slate-500 uppercase mb-1">Urgency</p>
                         <div className="text-lg font-black text-red-500">{aiExplanation.urgency}/10</div>
                      </div>
                      <div className="flex-[2]">
                         <p className="text-xs text-slate-500 uppercase mb-1">Recommended Action</p>
                         <div className="text-sm font-bold text-emerald-400">{aiExplanation.action}</div>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                   <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   <p className="text-xs uppercase tracking-widest text-slate-500">System Nominal. Awaiting Context Shift.</p>
                </div>
              )}
            </div>

            <button 
              onClick={triggerTOR}
              disabled={vehicle.mode === DrivingMode.TOR || isAiThinking}
              className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase transition-colors disabled:opacity-50"
            >
              Simulate Failure / TOR
            </button>
          </div>

          {/* Controller Panel */}
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Environment Control</h3>
             <div className="space-y-6">
                <div>
                   <label className="text-[10px] text-slate-500 uppercase block mb-3">Simulation Controls</label>
                   <div className="flex space-x-2">
                      <button onClick={() => handleManualSpeed(10)} className="flex-1 py-2 bg-slate-700 rounded text-xs hover:bg-slate-600 transition-colors">ACCEL</button>
                      <button onClick={() => handleManualSpeed(-10)} className="flex-1 py-2 bg-slate-700 rounded text-xs hover:bg-slate-600 transition-colors">BRAKE</button>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="text-[10px] text-slate-500 uppercase block mb-2">Eyes On Road</label>
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={driver.eyeAttention} 
                        onChange={(e) => setDriver(d => ({...d, eyeAttention: parseInt(e.target.value)}))}
                        className="w-full accent-blue-500" 
                      />
                   </div>
                   <div>
                      <label className="text-[10px] text-slate-500 uppercase block mb-2">Complexity</label>
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={env.complexity} 
                        onChange={(e) => setEnv(ev => ({...ev, complexity: parseInt(e.target.value)}))}
                        className="w-full accent-amber-500" 
                      />
                   </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-slate-900/50 rounded-xl border border-slate-700 cursor-pointer select-none"
                     onClick={() => setDriver(d => ({...d, handsOnWheel: !d.handsOnWheel}))}>
                   <div className={`w-4 h-4 rounded border ${driver.handsOnWheel ? 'bg-blue-500 border-blue-500' : 'border-slate-600'}`}>
                      {driver.handsOnWheel && <svg className="w-3 h-3 text-white m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                   </div>
                   <span className="text-xs font-bold text-slate-300">DRIVER HANDS ON WHEEL</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Architecture = () => (
  <div className="max-w-5xl space-y-8 animate-in fade-in duration-500">
    <header className="space-y-4">
      <h2 className="text-4xl font-black text-white">System Architecture</h2>
      <p className="text-lg text-slate-400">How we integrate embedded hardware with cloud-based AI reasoning.</p>
    </header>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-slate-800/80 p-6 rounded-2xl border-t-4 border-emerald-500 shadow-2xl">
        <div className="text-emerald-500 font-bold text-xs mb-4">EDGE COMPUTING</div>
        <h4 className="text-xl font-bold text-white mb-2">Jetson Nano / Orin</h4>
        <p className="text-slate-400 text-sm leading-relaxed">Handles heavy CNN models for eye-tracking, gaze estimation, and hand detection using TensorRT optimization.</p>
      </div>
      <div className="bg-slate-800/80 p-6 rounded-2xl border-t-4 border-blue-500 shadow-2xl">
        <div className="text-blue-500 font-bold text-xs mb-4">REAL-TIME CONTROL</div>
        <h4 className="text-xl font-bold text-white mb-2">STM32 / Raspberry Pi</h4>
        <p className="text-slate-400 text-sm leading-relaxed">Processes CAN-bus data, manages multi-modal actuators (Haptic steering, HUD, Audio) via UART/SPI protocols.</p>
      </div>
      <div className="bg-slate-800/80 p-6 rounded-2xl border-t-4 border-amber-500 shadow-2xl">
        <div className="text-amber-500 font-bold text-xs mb-4">COGNITIVE LAYER</div>
        <h4 className="text-xl font-bold text-white mb-2">Gemini Pro API</h4>
        <p className="text-slate-400 text-sm leading-relaxed">Generates high-level context explanations. Provides the "Why" behind system decisions to build driver trust.</p>
      </div>
    </div>

    <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">Data Flow Diagram</h3>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 text-center">
        <div className="w-40 p-4 bg-slate-800 rounded-xl border border-slate-600">
          <p className="text-xs font-bold text-blue-400 mb-2">SENSORS</p>
          <p className="text-[10px] text-slate-500">IR Camera, Radar, IMU</p>
        </div>
        <div className="hidden md:block w-12 h-0.5 bg-slate-700" />
        <div className="w-40 p-4 bg-slate-800 rounded-xl border border-blue-500">
          <p className="text-xs font-bold text-blue-400 mb-2">HMI LOGIC</p>
          <p className="text-[10px] text-slate-500">State Machine</p>
        </div>
        <div className="hidden md:block w-12 h-0.5 bg-slate-700" />
        <div className="w-40 p-4 bg-slate-800 rounded-xl border border-emerald-500">
          <p className="text-xs font-bold text-emerald-400 mb-2">DISPLAY</p>
          <p className="text-[10px] text-slate-500">Dashboard & Voice</p>
        </div>
      </div>
    </div>
  </div>
);

const Logic = () => (
  <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
    <header className="space-y-4">
      <h2 className="text-4xl font-black text-white">Safety & Decision Logic</h2>
      <p className="text-lg text-slate-400">The algorithmic framework for determining takeover urgency.</p>
    </header>

    <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
      <div className="space-y-12">
        <div className="relative pl-12 border-l-2 border-slate-700">
          <div className="absolute left-[-11px] top-0 w-5 h-5 bg-blue-500 rounded-full border-4 border-slate-900" />
          <h4 className="text-xl font-bold text-white mb-2">Stage 1: Observation</h4>
          <p className="text-slate-400">System monitors <b>Driver Readiness (R)</b> and <b>Environment Complexity (C)</b>. R is calculated based on gaze entropy, hand presence, and reaction latency history.</p>
        </div>
        
        <div className="relative pl-12 border-l-2 border-slate-700">
          <div className="absolute left-[-11px] top-0 w-5 h-5 bg-amber-500 rounded-full border-4 border-slate-900" />
          <h4 className="text-xl font-bold text-white mb-2">Stage 2: Risk Scoring</h4>
          <div className="p-4 bg-slate-900 rounded-xl font-mono text-amber-400 text-sm my-4">
            Urgency = (Speed * Complexity) / (DriverReadiness + DistanceLead)
          </div>
          <p className="text-slate-400">If Urgency exceeds threshold T1, initiate Visual Warning. If exceeds T2, initiate Multi-modal TOR.</p>
        </div>

        <div className="relative pl-12 border-l-2 border-slate-700">
          <div className="absolute left-[-11px] top-0 w-5 h-5 bg-red-500 rounded-full border-4 border-slate-900" />
          <h4 className="text-xl font-bold text-white mb-2">Stage 3: Handoff Execution</h4>
          <p className="text-slate-400">Verification of "Hands-on-Wheel" and "Gaze-at-Road" before disabling autonomous actuators. AI generates dynamic explanation to reduce driver cognitive load during transition.</p>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 flex text-slate-200">
        <Navbar />
        <main className="flex-1 ml-20 md:ml-64 p-6 md:p-12 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/logic" element={<Logic />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
