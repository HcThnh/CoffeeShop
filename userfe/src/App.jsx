import './App.css';
import UserGiftExchange from './component/UserGiftExchange';
import HeaderHomePage from './component/UserHeaderHP';
import UserInfo from './component/UserInfo';
import UserProduct from './component/UserProduct';
import UserRegist from './component/UserRegist';
import { Route, Routes, Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const roles = localStorage.getItem("roles");
  
  if (!token || roles !== "ROLE_CUSTOMER") {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function CustomerRoutes() {
  return (
    <>
      <HeaderHomePage />
      <Routes>
        <Route path='/product' element={<UserProduct />} />
        <Route path='/exchange' element={<UserGiftExchange />} />
        <Route path='/info' element={<UserInfo />} />
        
        <Route path="*" element={<Navigate to="/customer/product" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<UserRegist />} />
      
      <Route 
        path="/customer/*" 
        element={
          <ProtectedRoute>
            <CustomerRoutes />
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={
        <Navigate to="/customer/product" replace />
      } />
    </Routes>
  );
}

export default App;
