import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Authentication/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import PrivateRoute from './components/Authentication/PrivateRoute/PrivateRoute.jsx';
import Homepage from './components/Homepage/Homepage.jsx';
import LoginPage from './components/Authentication/LoginPage/LoginPage.jsx';
import PlantDashboard from './components/PlantDashboard/PlantDashboard.jsx';

const App = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(prev => !prev);
  
  const closeMenu = () => {
    console.log('Closing menu...');
    setShowMenu(false);
  }
  return (
    <AuthProvider>
    <Router>
    <ToastContainer position="top-right" 
                    autoClose={1500} 
                    hideProgressBar={false} 
                    closeOnClick 
                    pauseOnHover 
                    draggable />
      <Routes>
        <Route path="/" element={
          <Homepage 
            showMenu={showMenu} 
            toggleMenu={toggleMenu} 
            isDashboard={false}
            closeMenu={closeMenu} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/plant-dashboard" element={
          <PrivateRoute> 
            <PlantDashboard 
            showMenu={showMenu} 
            toggleMenu={toggleMenu} 
            isDashboard={true}
            closeMenu={closeMenu}/> 
            </PrivateRoute>
          } />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;






