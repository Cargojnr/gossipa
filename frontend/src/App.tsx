import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ResetPage from "./pages/ResetPage";
import LandingLayout from "./components/landing/LandingLayout"; // adjust path as needed
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next"
// import FeedsPage from "./pages/FeedsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Analytics />
        <Route path="/" element={<LandingLayout />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset/:token" element={<ResetPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
        {/* <Route path="/feeds" element={<FeedsPage />} />  */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster richColors position="top-center" />
    </Router>
  );
};

export default App;
