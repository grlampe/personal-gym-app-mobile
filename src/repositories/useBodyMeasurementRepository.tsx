import { Dispatch, SetStateAction, useState } from "react";
import { useApi } from "./useRepository";

export interface BodyMeasurement {
  id: string;
  userId: string;
  description: string;
  height: number;
  weight: number;
  chestBust: number;
  leftArm: number;
  rightArm: number;
  abdomen: number;
  waist: number;
  hips: number;
  leftThigh: number;
  rightThigh: number;
  createdAt: string;
}

interface UseBodyMeasurementRepositoryReturn {
  bodyMeasurement: BodyMeasurement[];
  setBodyMeasurement: Dispatch<SetStateAction<BodyMeasurement[]>>;
  searchBodyMeasurementByUserId: (id: string) => Promise<BodyMeasurement[]>;
}

export function useBodyMeasurementRepository(): UseBodyMeasurementRepositoryReturn {
  const { api } = useApi();
  const [bodyMeasurement, setBodyMeasurement] = useState<BodyMeasurement[]>([]);

  async function searchBodyMeasurementByUserId(id: string) {   
    const result = await api.get(`bodyMeasurement/userId/${id}`)
    return result.data as BodyMeasurement[];
  }

  return {
    bodyMeasurement: bodyMeasurement ?? [],
    setBodyMeasurement,
    searchBodyMeasurementByUserId,
  }
}