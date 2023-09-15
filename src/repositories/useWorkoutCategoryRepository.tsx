import { Dispatch, SetStateAction, useState } from "react";
import { useApi } from "./useRepository";

export interface WorkoutCategory {
  id: string;
  workoutId: string;
  description: string;
  active: boolean;
}

interface UseWorkoutCategoryRepositoryReturn {
  workoutCategories: WorkoutCategory[];
  setWorkoutCategories: Dispatch<SetStateAction<WorkoutCategory[]>>;
  searchWorkoutOnCategoryByWorkoutId: (id: string) => Promise<WorkoutCategory[]>;
}

export function useWorkoutCategoryRepository(): UseWorkoutCategoryRepositoryReturn {
  const { api } = useApi();
  const [workoutCategories, setWorkoutCategories] = useState<WorkoutCategory[]>([]);

  async function searchWorkoutOnCategoryByWorkoutId(id: string) {   
    const result = await api.get(`workoutOnCategory/workout/${id}`)
    return result.data as WorkoutCategory[];
  }

  return {
    workoutCategories: workoutCategories ?? [],
    setWorkoutCategories,
    searchWorkoutOnCategoryByWorkoutId,
  }
}