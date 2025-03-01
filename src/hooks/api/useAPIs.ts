import { postResume } from '@/api';
import { ResumePostResponse } from '@/types/experience';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

// 101 이력서 파일 추출 커스텀 훅
export const usePostResume = (
  options?: UseMutationOptions<ResumePostResponse, Error, File>,
) => {
  return useMutation({
    ...options,
    mutationFn: async (data: File) => postResume(data),
  });
};
