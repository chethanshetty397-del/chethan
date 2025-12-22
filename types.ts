
export enum DrivingMode {
  MANUAL = 'MANUAL',
  AUTONOMOUS = 'AUTONOMOUS',
  TOR = 'TAKEOVER_REQUEST'
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface DriverState {
  eyeAttention: number; // 0-100
  drowsiness: number; // 0-100
  handsOnWheel: boolean;
  readinessScore: number; // 0-100
}

export interface VehicleState {
  speed: number;
  leadDistance: number;
  steeringAngle: number;
  mode: DrivingMode;
  accActive: boolean;
  lanePosition: number; // -1 to 1 offset
}

export interface EnvironmentState {
  complexity: number; // 0-100
  weather: 'CLEAR' | 'RAIN' | 'FOG';
  trafficDensity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface SystemMetrics {
  cpuLoad: number;
  latency: number;
  sensorHealth: number;
}
