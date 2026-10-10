import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import AnalyzeImage from "./pages/AnalyzeImage";
import AnalysisResults from "./pages/AnalysisResults";
import AnalysisHistory from "./pages/AnalysisHistory";
import AboutProject from "./pages/AboutProject";
import Settings from "./pages/Settings";
export default function App() {
  return <Routes><Route element={<DashboardLayout/>}><Route index element={<Dashboard/>}/><Route path="/analyze" element={<AnalyzeImage/>}/><Route path="/results/:id" element={<AnalysisResults/>}/><Route path="/history" element={<AnalysisHistory/>}/><Route path="/about" element={<AboutProject/>}/><Route path="/settings" element={<Settings/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>;
}