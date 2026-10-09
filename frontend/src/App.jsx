import { Navigate, Route, Routes } from "react-router-dom";
import Shell from "./components/Shell";
import { useAuth } from "./hooks/useAuth";
import AgentBuilder from "./pages/AgentBuilder";
import Analytics from "./pages/Analytics";
import Blog from "./pages/Blog";
import Calculator from "./pages/Calculator";
import CallHistory from "./pages/CallHistory";
import Campaigns from "./pages/Campaigns";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";
import Embed from "./pages/Embed";
import Knowledge from "./pages/Knowledge";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Register from "./pages/Register";
import ScriptWriter from "./pages/ScriptWriter";
import Scripts from "./pages/Scripts";
import Settings from "./pages/Settings";
import SpeechToText from "./pages/SpeechToText";
import TextToSpeech from "./pages/TextToSpeech";
import VoiceRecorder from "./pages/VoiceRecorder";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Shell>{children}</Shell>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/scripts" element={<Scripts />} />
      <Route path="/embed" element={<Embed />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<Blog />} />
      <Route path="/tts" element={<TextToSpeech />} />
      <Route path="/recorder" element={<VoiceRecorder />} />
      <Route path="/stt" element={<SpeechToText />} />
      <Route path="/script-writer" element={<ScriptWriter />} />
      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/agents" element={<Protected><AgentBuilder /></Protected>} />
      <Route path="/calls" element={<Protected><CallHistory /></Protected>} />
      <Route path="/campaigns" element={<Protected><Campaigns /></Protected>} />
      <Route path="/knowledge" element={<Protected><Knowledge /></Protected>} />
      <Route path="/analytics" element={<Protected><Analytics /></Protected>} />
      <Route path="/settings" element={<Protected><Settings /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
