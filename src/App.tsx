import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import './App.css';
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyRegistrations from './pages/MyRegistrations';
import Dashboard from './pages/Dashboard';
import EventDetails from './pages/EventDetails';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AuthCallback from './components/AuthCallback';
function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Navbar/>
      <Routes>
        <Route index element={<Welcome/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/auth/callback" element={<AuthCallback/>}/>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/myRegistrations" element={<ProtectedRoute><MyRegistrations/></ProtectedRoute>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/eventDetails/:id" element={<ProtectedRoute><EventDetails/></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
