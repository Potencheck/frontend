import { getReport, postRequestReport, postResume } from '@/api';
import { RequestPostResponse, ResumePostResponse } from '@/types/experience';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';
import { UserInfo } from '../useUserInfo';

// 101 이력서 파일 추출 커스텀 훅
export const usePostResume = (
  options?: UseMutationOptions<ResumePostResponse, Error, File>,
) => {
  return useMutation({
    ...options,
    mutationFn: async (data: File) => postResume(data),
  });
};

//202 리포트 생성 커스텀 훅
export const useRequestReport = (
  options?: UseMutationOptions<RequestPostResponse, Error, UserInfo>,
) => {
  return useMutation({
    ...options,
    mutationFn: async (data: UserInfo) => postRequestReport(data),
  });
};

export const useGetReport = (reportId: string | undefined) => {
  return useQuery({
    queryKey: ['report', reportId],
    queryFn: () => getReport(reportId),
    enabled: !!reportId,
  });
};
