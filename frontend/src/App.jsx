import { HomeScreen } from "./screens/feature-specific/Home.screen.jsx";
import { LoginScreen } from "./screens/auth/Login.screen.jsx";
import { SignUpScreen } from "./screens/auth/SignUp.screen.jsx";
import { NotificationScreen } from "./screens/feature-specific/Notification.screen.jsx";
import { ProfileScreen } from "./screens/feature-specific/Profile.screen.jsx";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/common/Sidebar.component.jsx";
import { RightPanel } from "./components/common/RightPanel.component.jsx";

function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
      {/* common component since it isn't wrapped in routes */}
      <Sidebar />
      <Routes>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/notifications" element={<NotificationScreen />} />
        <Route path="/profile/:username" element={<ProfileScreen />} />
      </Routes>
      <RightPanel />
    </div>
  );
}

export default App;
