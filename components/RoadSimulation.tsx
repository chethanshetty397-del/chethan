
import React, { useEffect, useRef, useState } from 'react';
import { DrivingMode, VehicleState } from '../types';

interface RoadSimulationProps {
  vehicleState: VehicleState;
}

const RoadSimulation: React.FC<RoadSimulationProps> = ({ vehicleState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let localOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Road
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Lanes
      ctx.strokeStyle = '#64748b';
      ctx.setLineDash([20, 20]);
      ctx.lineWidth = 2;
      
      // Lane Movement Speed based on vehicle speed
      localOffset += (vehicleState.speed / 10);
      ctx.lineDashOffset = -localOffset;

      const lanes = [canvas.width * 0.25, canvas.width * 0.5, canvas.width * 0.75];
      lanes.forEach(x => {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      });

      // Draw Lead Vehicle
      const leadY = Math.max(50, 400 - (vehicleState.leadDistance * 4));
      ctx.fillStyle = '#ef4444'; // Red for lead vehicle
      ctx.fillRect(canvas.width / 2 - 20, leadY, 40, 60);
      
      // Draw Player Car
      const carX = (canvas.width / 2) + (vehicleState.lanePosition * 50);
      ctx.fillStyle = vehicleState.mode === DrivingMode.AUTONOMOUS ? '#3b82f6' : '#10b981';
      ctx.shadowBlur = 15;
      ctx.shadowColor = ctx.fillStyle as string;
      ctx.fillRect(carX - 20, 500, 40, 60);
      ctx.shadowBlur = 0;

      // Draw Sensors (Radar Arc)
      if (vehicleState.mode === DrivingMode.AUTONOMOUS) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.setLineDash([]);
        ctx.moveTo(carX, 500);
        ctx.arc(carX, 500, 200, -Math.PI * 0.7, -Math.PI * 0.3);
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [vehicleState]);

  return (
    <div className="relative w-full h-[600px] bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={600} 
        className="w-full h-full"
      />
      <div className="absolute top-4 left-4 bg-slate-900/80 px-3 py-1 rounded text-xs font-bold border border-blue-500/50 text-blue-400 uppercase tracking-widest">
        LIVE LIDAR / RADAR FEED
      </div>
      
      {vehicleState.mode === DrivingMode.TOR && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/20 animate-pulse border-4 border-red-500">
           <div className="text-center">
              <div className="text-red-500 text-4xl font-black mb-2">TAKE CONTROL</div>
              <div className="text-white text-xl font-bold">MANUAL INTERVENTION REQUIRED</div>
           </div>
        </div>
      )}
    </div>
  );
};

export default RoadSimulation;
