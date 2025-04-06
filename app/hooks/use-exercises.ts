import { getInfo } from "@/lib/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export interface Exercise {
  id: string,
  userId: string,
  info: string,
  time: Date,
}

export function useExercises() {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      const result = await getInfo();

      if (Array.isArray(result)) {
        return result as Exercise[];
      }

      if (result && result.error) {
        throw new Error(result.error);
      }

      return [] as Exercise[];
    }
  })
}

export function useRefreshExercises() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['exercises'] });
}
