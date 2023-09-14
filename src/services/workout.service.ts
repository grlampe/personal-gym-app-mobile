import { api } from "./api.service";

export interface WorkoutList {
  id: string;
  userId: string;
  description: string;
  active: boolean;
  image?: string;
};

export async function searchWorkoutByUserId(id: string) {   
  const result = await api.get<WorkoutList[]>(`workout/user/${id}`)
  return result.data;
}