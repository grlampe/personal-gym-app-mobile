import { Dispatch, SetStateAction, useState } from 'react';
import { useApi } from './useRepository';

export interface WorkoutList {
  id: string;
  userId: string;
  description: string;
  active: boolean;
};

interface UseWorkoutRepositoryReturn {
  workouts: WorkoutList[];
  setWorkouts: Dispatch<SetStateAction<WorkoutList[]>>;
  searchWorkoutByUserId: (id: string) => Promise<WorkoutList[]>;
}

export function useWorkoutRepository(): UseWorkoutRepositoryReturn {
  const { api } = useApi();
  const [workouts, setWorkouts] = useState<WorkoutList[]>();

  async function searchWorkoutByUserId(id: string) {   
    const result = await api.get(`workout/user/${id}`)
    return result.data as WorkoutList[];
  }

  return {
    workouts,
    setWorkouts,
    searchWorkoutByUserId,
  }
}