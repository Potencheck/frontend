import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import { UserInfoProvider } from './hooks/useUserInfo';
const Router = () => {
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboard" element={<OnboardingPage />} />
        </Routes>
      </BrowserRouter>
    </UserInfoProvider>
  );
};

export default Router;
