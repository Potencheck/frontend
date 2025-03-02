import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import { UserInfoProvider } from './hooks/useUserInfo';
import AnalyzeSuccessPage from './pages/AnalyzeSuccessPage';
import ReportPage from './pages/ReportPage';

const ReportPageWrapper = () => {
  const { userId } = useParams();
  return <ReportPage userId={userId} />;
};

const Router = () => {
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboard" element={<OnboardingPage />} />
          <Route path="/analyze-success" element={<AnalyzeSuccessPage />} />
          <Route path="/report/:userId" element={<ReportPageWrapper />} />
        </Routes>
      </BrowserRouter>
    </UserInfoProvider>
  );
};

export default Router;
