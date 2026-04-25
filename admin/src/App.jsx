import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import DangNhap from './components/DangNhap'; 
import Admin_HomePage from './components/Admin_HomePage'; 
import Admin_ManageWorkSchedule from './components/Admin_ManageWorkSchedule'; 
import Admin_ManageEmployee from './components/Admin_ManageEmployee'; 
import Admin_ManageProduct from './components/Admin_ManageProduct'; 
import Admin_ManageOrder from './components/Admin_ManageOrder'; 

import Emp_OrderForm from './components/Emp_OrderForm'; 
import Emp_HistoryGift from './components/Emp_HistoryGift'; 
import Emp_PersonalInfo from './components/Emp_PersonalInfo';
import Admin_ManageWorkSchedule_Edit from './components/Admin_ManageWorkSchedule_Edit'; 
import Admin_ManageEmployee_Edit from './components/Admin_ManageEmployee_Edit';
import Admin_ManageProduct_Edit from './components/Admin_ManageProduct_Edit';
import Admin_Revenue from './components/Admin_Revenue';

import { useState, useEffect } from 'react';

function Login( {onLogin}) {
  return (
      <Routes>
        <Route path="*" element={<DangNhap onLog={onLogin}/>} />
      </Routes>
  );
}

function HomePageEmp({ onLogOut}) {
  return (
      <Routes>
        <Route path="/emp/order-form" element={<Emp_OrderForm />} />
        <Route path="/emp/history-gift" element={<Emp_HistoryGift />} />
        <Route path="/emp/personal-info" element={<Emp_PersonalInfo />} />

        <Route path="*" element={<Navigate to="/emp/order-form" replace />} />
      </Routes>
  );
}

function HomePageAdmin({ onLogOut }) {
  return (
      <Routes>
        <Route path="/admin/home" element={<Admin_HomePage />} />
        <Route path="/admin/manage-work-schedule" element={<Admin_ManageWorkSchedule />} />
        <Route path="/admin/manage-employee" element={<Admin_ManageEmployee />} />
        <Route path="/admin/manage-product" element={<Admin_ManageProduct />} />
        <Route path="/admin/manage-order" element={<Admin_ManageOrder />} />
        <Route path="/admin/manage-work-schedule/edit" element={<Admin_ManageWorkSchedule_Edit />} /> 
        <Route path="/admin/manage-employee/edit" element={<Admin_ManageEmployee_Edit />} /> 
        <Route path="/admin/manage-product/edit" element={<Admin_ManageProduct_Edit />} /> 
        <Route path="/admin/revenue" element={<Admin_Revenue />} /> 

        <Route path='*' element={<Navigate to="/admin/home" replace/>}/>
      </Routes>
  );
}

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [roles, setRoles] = useState(localStorage.getItem("roles"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    setToken(null);
    setRoles(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRoles = localStorage.getItem("roles");
    setToken(storedToken);
    setRoles(storedRoles);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login/*" element={<Login onLogin={() => {
          setToken(localStorage.getItem("token"));
          setRoles(localStorage.getItem("roles"));
        }} />} />

        {/* Đường dẫn cho nhân viên */}
        {token && roles === "ROLE_EMPLOYEE" && (
          <Route path="/*" element={<HomePageEmp onLogout={handleLogout}/>} />
        )}

        {/* Đường dẫn cho admin */}
        {token && roles === "ROLE_MANAGER" && (
          <Route path="/*" element={<HomePageAdmin onLogout={handleLogout}/>} />
        )}

        {/* Nếu chưa đăng nhập HOẶC có token nhưng quyền không hợp lệ (ví dụ: đang dùng token của ROLE_CUSTOMER) */}
        {(!token || (roles !== "ROLE_EMPLOYEE" && roles !== "ROLE_MANAGER")) && (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
