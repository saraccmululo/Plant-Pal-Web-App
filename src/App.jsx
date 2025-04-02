import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Authentication/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/Authentication/PrivateRoute.jsx';
import Homepage from './components/Homepage/Homepage.jsx';
import LoginPage from './components/Authentication/LoginPage/LoginPage.jsx';
import PlantDashboard from './components/PlantDashboard/PlantDashboard.jsx';

const App = () => {
  
  return (
    <AuthProvider>
    <Router>
    <ToastContainer position="top-right" 
                    autoClose={3000} 
                    hideProgressBar={false} 
                    closeOnClick 
                    pauseOnHover 
                    draggable />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/plant-dashboard" element={
          <PrivateRoute> <PlantDashboard /> </PrivateRoute>
          } />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;






