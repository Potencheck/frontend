import { getReport, postRequestReport, postResume } from '@/api';
import {
  RequestPostResponse,
  RequestRepostPostCareer,
  ResumePostResponse,
} from '@/types/experience';
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
  options?: UseMutationOptions<
    RequestPostResponse,
    Error,
    {
      user_json: UserInfo;
      career_data: RequestRepostPostCareer;
    }
  >,
) => {
  return useMutation({
    ...options,
    mutationFn: async (data: {
      user_json: UserInfo;
      career_data: RequestRepostPostCareer;
    }) => postRequestReport(data),
  });
};

export const useGetReport = (reportId: string | undefined) => {
  return useQuery({
    queryKey: ['report', reportId],
    queryFn: () => getReport(reportId),
    enabled: !!reportId,
  });
};
