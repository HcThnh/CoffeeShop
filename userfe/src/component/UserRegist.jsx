import './UserRegist.css';
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UserRegistInterface({ toggle }) {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [, setResponse] = useState("");
    const [, setError] = useState(null);

    const HandleClick=async (e)=> {
        e.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        const regist = {
            phoneNumber : username, 
            password : password};
        // console.log(JSON.stringify(regist))

        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/public/customer/createAccount", // URL API
                regist , // Dữ liệu gửi lên server
                {
                    headers: {
                        "Content-Type": "application/json", // Header cho request
                    },
                   // withCredentials: true, // Nếu cần gửi cookies/token
                }
            );
            setResponse(res.data);
            setError(null); // Reset lỗi nếu có
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    }


    return (
        <div className="userRegist-midBox"
        style={{
            transform: toggle ? 'translateX(0)' : 'translateX(100%)',
            opacity: toggle ? 1 : 0,
            transition: 'all 0.2s ease'
        }}>
            <div className="userRegist-center">
                <h6 className="userRegist-nameShop">
                    Coffee Shop
                </h6>
                <p className="userRegist-regist">
                    Đăng ký
                </p>
                <ul className="userRegist-ul">
                    <li className="userRegist-li">
                        <label htmlFor="userRegist-username"
                        className='userRegist-label'>
                            Tên tài khoản
                        </label>
                        <input type="text" className="userRegist-input"
                        id='userRegist-username'
                        placeholder='Nhập tên tài khoản'
                        ref={usernameRef}/>
                    </li>
                    <li className="userRegist-li">
                        <label htmlFor="userRegist-password" className="userRegist-label">
                            Mật khẩu
                        </label>
                        <input type="password" className="userRegist-input" 
                        id='userRegist-password'
                        placeholder='Nhập mật khẩu'
                        ref={passwordRef}/>
                    </li>
                </ul>
                <div className="userRegist-bottom">
                    <button className="userRegist-bottom-button"
                    onClick={HandleClick}>
                        Đăng ký
                    </button>
                    <p className="userRegist-bottom-p"
                    onClick={toggle}>
                        Đã có tài khoản
                    </p>
                </div>
            </div>
        </div>
    );
}

function UserLoginInterface({ toggle }) {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [, setToken] = useState("");

    const [, setResponse] = useState("");
    const [, setError] = useState(null);
    const navigate = useNavigate();
    const HandleClick=async (e)=> {
        e.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        const regist = {
            username : username, 
            password : password};
        // console.log(JSON.stringify(regist))

        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/public/signin", // URL API
                regist , // Dữ liệu gửi lên server
                {
                    headers: {
                        "Content-Type": "application/json", // Header cho request
                    },
                   // withCredentials: true, // Nếu cần gửi cookies/token
                }
            )
            setResponse(res.data);
            const jwtToken = res.data.jwtToken;
            setToken(jwtToken);
            localStorage.setItem("token", res.data.jwtToken);
            localStorage.setItem("roles", res.data.roles[0]);
            const token = localStorage.getItem("token");
            console.log(token);
            if (res.data.roles[0] === "ROLE_CUSTOMER") {
                navigate("/customer");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    }

    return (
        <div className='userRegist-midBox'
        style={{
            transform: toggle ? 'translateX(0)' : 'translateX(100%)',
            opacity: toggle ? 1 : 0,
            transition: 'all 0.2s ease'
        }}>
            <div className="userRegist-center">
                <h6 className="userRegist-nameShop">
                    Coffee Shop
                </h6>
                <p className="userRegist-regist">
                    Đăng nhập
                </p>
                <ul className="userRegist-ul">
                    <li className="userRegist-li">
                        <label htmlFor="userRegist-username"
                        className='userRegist-label'>
                            Tên tài khoản
                        </label>
                        <input type="text" className="userRegist-input"
                        id='userRegist-username'
                        placeholder='Nhập tên tài khoản'
                        ref={usernameRef}/>
                    </li>
                    <li className="userRegist-li">
                        <label htmlFor="userRegist-password" className="userRegist-label">
                            Mật khẩu
                        </label>
                        <input type="password" className="userRegist-input" 
                        id='userRegist-password'
                        placeholder='Nhập mật khẩu'
                        ref={passwordRef}/>
                    </li>
                </ul>
                <div className="userRegist-bottom">
                    <button className="userRegist-bottom-button
                    userRegist-buttonLogin"
                    onClick={HandleClick}>
                        Đăng nhập
                    </button>
                    <p className="userRegist-bottom-p"
                    onClick={toggle}>
                        Chưa có tài khoản?
                    </p>
                </div>
            </div>
        </div>
    );
}


function UserRegist() {
    const [register, setregister] = useState(false);

    function Toggle() {
        setregister(!register)
    }

    return(
        <>
            <div className="userRegist-fullScreen">
                {register ? 
                (<UserRegistInterface toggle={Toggle}/>) :
                (<UserLoginInterface toggle={Toggle}/>)}
            </div>
        </>
    );
}

export default UserRegist;