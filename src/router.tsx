import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import { UserInfoProvider } from './hooks/useUserInfo';
import AnalyzeSuccessPage from './pages/AnalyzeSuccessPage';
import ReportPage from './pages/ReportPage';

const Router = () => {
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboard" element={<OnboardingPage />} />
          <Route path="/analyze-success" element={<AnalyzeSuccessPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </BrowserRouter>
    </UserInfoProvider>
  );
};

export default Router;
