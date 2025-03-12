import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
interface LoadingScreenProps {
  onLoadingComplete: () => void;
  nextRoute?: string;
  title: string;
  subtitle: string;
  isAnalyze?: boolean;
  animationData: object;
  totalDuration?: number;
}

const LoadingScreen = ({
  onLoadingComplete,
  nextRoute = '/onboard',
  title,
  subtitle,
  isAnalyze,
  animationData,
  totalDuration = 20000,
}: LoadingScreenProps) => {
  const [progress, setProgress] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = 100; // 업데이트 간격 (밀리초)
    const incrementPerInterval = 100 / (totalDuration / interval);

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + incrementPerInterval, 100);

        if (newProgress >= 100) {
          clearInterval(timer);

          // 진행률이 100%에 도달하면 약간의 지연 후 다음 화면으로 이동
          setTimeout(() => {
            onLoadingComplete();
            navigate(nextRoute);
          }, 500);
        }

        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete, navigate, nextRoute]);

  return (
    <div className="flex flex-col justify-between items-center w-full absolute inset-0 h-screen bg-background-screen px-4 mb-8 text-center">
      <section className="flex flex-col items-center">
        <h1 className="head-h1 mt-25 mb-5">{title}</h1>

        <p className="subtle2-regular text-text-secondary mb-5 max-w-[310px] break-keep">
          {subtitle}
        </p>
        {/* Lottie 애니메이션 */}
        <div className="w-full max-w-[234px] max-h-[223px]">
          {animationData && (
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          )}
        </div>
      </section>

      <div className="w-full fixed bottom-0 left-0 flex flex-col items-center justify-center py-3 box-border text-center subtle2-semibold z-10">
        <div className="w-full max-w-[450px] px-5 flex flex-col items-center justify-center">
          <p className="subtle2-regular text-text-secondary mt-11 mb-10">
            {Math.round(progress)}% 진행 중
          </p>

          {isAnalyze && (
            <div className="bg-white p-5 rounded-lg max-w-[340px]">
              <p className="body2-regular text-text-secondary">
                AI가 채용공고의 자주 등장하는 역량 키워드와 필수 역량, 우대 사항
                등 문맥을 고려하여 핵심 역량을 분석해요
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
