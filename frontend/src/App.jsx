import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import AnalyzeImage from "./pages/AnalyzeImage";
import AnalysisResults from "./pages/AnalysisResults";
import AnalysisHistory from "./pages/AnalysisHistory";
import AboutProject from "./pages/AboutProject";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
export default function App(){return <AuthProvider><Routes><Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/><Route element={<ProtectedRoute/>}><Route element={<DashboardLayout/>}><Route index element={<Dashboard/>}/><Route path="/analyze" element={<AnalyzeImage/>}/><Route path="/results/:id" element={<AnalysisResults/>}/><Route path="/history" element={<AnalysisHistory/>}/><Route path="/about" element={<AboutProject/>}/><Route path="/settings" element={<Settings/>}/></Route></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes></AuthProvider>}