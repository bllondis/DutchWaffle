import { useQuery } from '@tanstack/react-query';
import { fetchLesson } from '../api/lesson.api';

export function useLesson(lessonId: string) {
  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => fetchLesson(lessonId),
    staleTime: 10 * 60 * 1000,
  });
}
