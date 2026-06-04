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
function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
          
        <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/myRegistrations" element={<MyRegistrations/>}/>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}/>
          <Route path="/eventDetails/:id" element={<EventDetails/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
