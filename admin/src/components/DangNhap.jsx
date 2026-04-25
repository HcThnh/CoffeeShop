import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../assets/css/DangNhap.css";
import CoffeeShopImage from "../assets/img/CoffeeShop.jpg";
import axios from 'axios'; 


const DangNhap = ({ onLog }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const userRef = useRef("");
    const passRef = useRef("");

    const mockData_Admin = {
        username: "ad",
        password: "."
    };

    const mockData_Emp = {
        username: "emp",
        password: "."
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === mockData_Admin.username && password === mockData_Admin.password) {
            navigate('/admin/home'); // Chuyển đến trang Admin Home Page
        } else if (username === mockData_Emp.username && password === mockData_Emp.password) {
            navigate('/emp/order-form'); // Chuyển đến trang Employee Tạo đơn hàng
        } else {
            setErrorMessage('Tên đăng nhập hoặc mật khẩu không chính xác!');
        }
    };

    const LoginClick = async(e) => {
        const username = userRef.current.value;
        const password = passRef.current.value;

        const admin = {
            username: username,
            password: password,
        }

        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/public/signin",
                admin, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )

            localStorage.setItem("token", res.data.jwtToken);
            localStorage.setItem("roles", res.data.roles[0]);
            console.log(res.data.roles[0]);
            onLog();

            if (res.data.roles[0] === "ROLE_EMPLOYEE") {
                navigate("/employee");
            } else if (res.data.roles[0] === "ROLE_MANAGER") {
                navigate("/admin");
            }
        }
        catch (err) {
            setErrorMessage(err.message || "Something went wrong!")
        }
    }

    const RegistClick = async(e) => {
        const username = userRef.current.value;
        const password = userRef.current.value;

        const admin = {
            username: username,
            password: password,
        }

        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/public/admin",
                admin, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )

        }
        catch(err) {
            setErrorMessage(err.message || "Something")
        }
    }

    return (
        <div className="login-container">
            {/* Phần chứa hình ảnh */}
            <div className="login-image-section">
                <img src={CoffeeShopImage} alt="Hình ảnh Coffee Shop" className="login-image" />
            </div>

            {/* Phần chứa form đăng nhập */}
            <div className="login-form-section">
                <h1 className="login-title">COFFEE SHOP</h1>
                <p className="login-welcome-text">Xin chào</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username" className="login-label">Tên đăng nhập</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="login-input"
                        placeholder="Nhập tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        ref={userRef}
                    />
                    <label htmlFor="password" className="login-label">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="login-input"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        ref={passRef}
                    />
                    <button type="submit" className="login-submit-button"
                    onClick={LoginClick}>Đăng nhập</button>
                </form>
                {errorMessage && <p id="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default DangNhap;
