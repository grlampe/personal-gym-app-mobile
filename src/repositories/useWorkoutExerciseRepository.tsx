import { Dispatch, SetStateAction, useState } from "react";
import { useApi } from "./useRepository";

export type ExerciseList = {
  id: string;
  name: string;
  active: boolean;
  ExerciseOnCategoryExercise?: any[];
}

export type WorkoutExercise = {
  id?: string,
  workoutOnCategoryId: string,
  exerciseId: string,
  exercise?: ExerciseList,
  order:        number,
  restTime:     string,
  series:       number,
  repetitions:  string,
  weight:       number,
  observation:  string,
};

interface UseWorkoutExerciseRepositoryReturn {
  workoutExercise: WorkoutExercise[];
  setWorkoutExercise: Dispatch<SetStateAction<WorkoutExercise[]>>;
  searchWorkoutOnExerciseByWorkoutCategoryId: (workoutCategoryId: string) => Promise<WorkoutExercise[]>;
}

export function useWorkoutExerciseRepository(): UseWorkoutExerciseRepositoryReturn {
  const { api } = useApi();
  const [workoutExercise, setWorkoutExercise] = useState<WorkoutExercise[]>([]);

  async function searchWorkoutOnExerciseByWorkoutCategoryId(workoutCategoryId: string) {   
    const result = await api.get(`workoutOnExercise/workoutCategory/${workoutCategoryId}`)
    return result.data as WorkoutExercise[];
  }

  return {
    workoutExercise: workoutExercise ?? [],
    setWorkoutExercise,
    searchWorkoutOnExerciseByWorkoutCategoryId,
  }
}