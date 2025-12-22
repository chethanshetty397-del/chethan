
import { GoogleGenAI, Type } from "@google/genai";
import { VehicleState, DriverState, EnvironmentState } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTakeoverExplanation(
  vehicle: VehicleState,
  driver: DriverState,
  env: EnvironmentState
) {
  try {
    const prompt = `
      Context-Aware HMI Reasoning Engine:
      A Takeover Request (TOR) has been triggered in an autonomous vehicle.
      
      Vehicle State:
      - Mode: ${vehicle.mode}
      - Speed: ${vehicle.speed} km/h
      - Distance to lead vehicle: ${vehicle.leadDistance}m
      
      Driver State:
      - Readiness: ${driver.readinessScore}/100
      - Drowsiness: ${driver.drowsiness}%
      - Hands on wheel: ${driver.handsOnWheel}
      
      Environment:
      - Complexity: ${env.complexity}%
      - Traffic: ${env.trafficDensity}
      - Weather: ${env.weather}
      
      Task: Provide a concise, professional explanation for why the driver must take control. 
      Format the response as JSON with "reason", "urgency" (1-10), and "action" keys.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reason: { type: Type.STRING },
            urgency: { type: Type.NUMBER },
            action: { type: Type.STRING }
          },
          required: ["reason", "urgency", "action"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Reasoner Error:", error);
    return {
      reason: "System limits reached. Immediate manual intervention required for safety.",
      urgency: 10,
      action: "GRAB STEERING WHEEL NOW"
    };
  }
}
