import { ResumePostResponse } from '@/types/experience';
import axios from 'axios';

/**
 * 인증이 필요하지 않은 API 요청을 위한 Axios 인스턴스를 생성하는 함수
 *
 * @function createInstanceWithoutAuth
 * @returns {AxiosInstance} 기본 설정만 된 Axios 인스턴스
 *
 * @description
 * 이 함수는 기본 URL만 설정된 Axios 인스턴스를 생성합니다.
 * 인증 토큰이 필요하지 않은 API 요청(예: 로그인, 회원가입 등)에 사용됩니다.
 */
// Todo: .env 파일에서 환경변수로 api 주소를 가져오고 있지만, 서버 주소가 나오면 env 파일 없이도 사용 가능하게 수정해야 함.
function createInstanceWithoutAuth() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  });
  return instance;
}
/**
 * 인증이 필요하지 않은 API 요청에 사용할 Axios 인스턴스
 * @const {AxiosInstance}
 */
export const api = createInstanceWithoutAuth();

// 폴더 생성
export async function postResume(
  resumeData: File,
): Promise<ResumePostResponse> {
  const formData = new FormData();
  formData.append('file', resumeData);
  const response = await api.post(`/career/extract`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
