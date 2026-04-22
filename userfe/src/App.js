import './App.css';
import UserGiftExchange from './component/UserGiftExchange';
import HeaderHomePage from './component/UserHeaderHP';
import UserInfo from './component/UserInfo';
import UserProduct from './component/UserProduct';
import UserRegist from './component/UserRegist';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate
} from 'react-router-dom';


function UserHomePage() {
  return (
    <>
      <HeaderHomePage/>
    </>
  );
}

function UserProductPage() {
  return (
    <>
      <HeaderHomePage/>
      <UserProduct/>
    </>
  );
}

function UserExchangePage() {
  return (
    <>
      <HeaderHomePage/>
      <UserGiftExchange/>
    </>
  );
}

function UserInfoPage() {
  return (
    <>
      <HeaderHomePage/>
      <UserInfo/>
    </>
  );
}

function UserLogin({ onLogin }) {
  return(
    <Routes>
      <Route path="*" element={<UserRegist />} />
    </Routes>
  );
};

function HomePage() {
  return (
      <Routes>
        <Route path='/customer' element={<UserHomePage/>}/>
        <Route path='/customer/product' element={<UserProductPage/>}/>
        <Route path='/customer/exchange' element={<UserExchangePage/>}/>
        <Route path='/customer/info' element={<UserInfoPage/>}/>

        <Route path="*" element={<Navigate to="/customer" replace />} />
      </Routes>
  );
}



function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [roles, setRoles] = useState(localStorage.getItem("roles"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRoles = localStorage.getItem("roles");
    setToken(storedToken);
    setRoles(storedRoles);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login/*" element={<UserLogin onLogin={() => {
          setToken(localStorage.getItem("token"));
          setRoles(localStorage.getItem("roles"));
        }} />} />
        {token && roles === "ROLE_CUSTOMER" && (
          <Route path="/*" element={<HomePage />} />
        )}
        {!token && <Route path="*" element={<Navigate to="/login" replace />} />}
      </Routes>
    </Router>
  );
}

export default App;
