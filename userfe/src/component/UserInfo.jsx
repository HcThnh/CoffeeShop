import './UserInfo.css';
import { use, useRef } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import UserOrder from './UserOrder';


function UserFormInfo() {
    const nameRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();
    const dobRef = useRef();

    const [selectedGender, setSelectedGender] = useState("");

    

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const [error, setError] = useState(null);

    const handleClick=async (e) => {
        e.preventDefault();
        
        const name = nameRef.current.value.trim();
        const address = addressRef.current.value.trim();
        const phone = phoneRef.current.value.trim();
        const dob = dobRef.current.value;
        const gender = document.querySelector('input[name="gender"]:checked');

        if (!name || !address || !dob || !gender) {
            alert("Vui lòng điền đầy đủ thông tin trước khi gửi!");
            return;
        }

        const token = localStorage.getItem("token");
        console.log(token);

        const userName = nameRef.current.value;
        const userAddress = addressRef.current.value;
        const userPhone = localStorage.getItem("phone");
        const userDoB = dobRef.current.value;
        console.log(userPhone);

        const user = {
            dob:userDoB, 
            phoneNumber:userPhone, 
            address: userAddress,
            name: userName,
            gender:selectedGender,
        };

        try {
            const res = await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/customer/updateInfo",
                user, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    //withCredentials: true,
                }
            )
            console.log(res.data);
        } catch(err) {
            setError(err.message || "Something went wrong");
        }
    }

    

    return (
        <>
            <form className='userInfo-form'>
                <h6 className="userInfo-form-title">
                    Chỉnh sửa thông tin cá nhân
                </h6>
                <ul className="userInfo-form-ul">
                    <li className="userInfo-form-li">
                        <label className='userInfo-form-label'
                        htmlFor='userName'>
                            Họ tên
                        </label>
                        <input type="text" 
                        className="userInfo-form-input" 
                        id = "userName"
                        placeholder='Nhập họ tên'
                        ref={nameRef}/>
                    </li>
                    <li className="userInfo-form-li">
                        <label htmlFor="userAddress"
                        className="userInfo-form-label">
                            Địa chỉ
                        </label>
                        <input type="text" className="userInfo-form-input" 
                        id='userAddress'
                        placeholder='Nhập địa chỉ'
                        ref={addressRef}/>
                    </li>
                    <li className="userInfo-form-li">
                        <label htmlFor="UserPhone" className="userInfo-form-label">
                            Số điện thoại
                        </label>
                        <input type="text" className="userInfo-form-input" 
                        id='userPhone'
                        placeholder='Nhập số điện thoại'
                        ref={phoneRef}
                        disabled/>
                    </li>
                    <li className="userInfo-form-li">
                        <label htmlFor="userDoB" className="userInfo-form-label">
                            Ngày sinh
                        </label>
                        <input type="date" className="userInfo-form-input" 
                        id='userDoB'
                        ref={dobRef}/>
                    </li>
                    <li className="userInfo-form-li">
                        <label className="userInfo-form-label">Giới tính</label>
                        <div className="userInfo-form-input-group">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    className="userInfo-form-input-radio"
                                    onClick={handleGenderChange}
                                />
                                Nam
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    className="userInfo-form-input-radio"
                                    onClick={handleGenderChange}
                                />
                                Nữ
                            </label>
                        </div>
                    </li>
                </ul>
                <button className="userInfo-form-button"
                onClick={handleClick}>
                    Gửi
                </button>
            </form>
        </>
    );
}



function UserPersonalInfo({ toggle }) {
    const [userInfo, setuserInfo] = useState("");
    const [error, setError] = useState(null);

    const deleteCus = async(e) => {
        const token = localStorage.getItem("token");
        console.log(token);
        try {
            const res = await axios.delete(
                "https://coffeeshop-api-udqx.onrender.com/customer/delete",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
        }
        catch(err) {
            setError(err.message);
        }
        
    }

    useEffect(() => {
        const fetchUserInfo = async(e) => {
            const token = localStorage.getItem("token");

            try {
                const res = await axios.get(
                    "https://coffeeshop-api-udqx.onrender.com/customer/info",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        //withCredentials: true,
                    },
                )
                setuserInfo(res.data);
                localStorage.setItem("phone", res.data.phoneNumber);
            } catch(err) {
                setError(err.message || "Something went wrong!")
            }
        }

        fetchUserInfo();
    }, [])

    

    return (
        <>
            <div className="PersonalInfo">
                <h6 className="Pinfo-title">
                    Thông tin cá nhân
                </h6>
                <ul className="userInfo-form-ul">
                    <li className="userInfo-form-li">
                        <p className="Pinfo Pinfo1">Họ tên</p>
                        <p className="Pinfo">{userInfo.name ? userInfo.name : "Chưa cập nhật"}</p>
                    </li>
                    <li className="userInfo-form-li">
                        <p className="Pinfo Pinfo1">Địa chỉ</p>
                        <p className="Pinfo">{userInfo.address ? userInfo.address : "Chưa cập nhật"}</p>
                    </li>
                    <li className="userInfo-form-li">
                        <p className="Pinfo Pinfo1">Số điện thoại</p>
                        <p className="Pinfo">{userInfo.phoneNumber ? userInfo.phoneNumber : "Chưa cập nhật"}</p>
                    </li>
                    <li className="userInfo-form-li">
                        <p className="Pinfo Pinfo1">Ngày sinh</p>
                        <p className="Pinfo">{userInfo.dob ? userInfo.dob : "Chưa cập nhật"}</p>
                    </li>
                    <li className="userInfo-form-li">
                        <p className="Pinfo Pinfo1">Giới tính</p>
                        <p className="Pinfo">{
                            userInfo.gender === 'M' ? "Nam" : (
                                userInfo.gender === 'F' ? "Nữ" : "Chưa cập nhật"
                            )
                        }</p>
                    </li>
                </ul>
                <button className="PersonalInfo-button"
                onClick={toggle}>
                    Xem đơn hàng
                </button>
                <button className="PersonalInfo-button2"
                onClick={deleteCus}>
                    Xóa tài khoản
                </button>
            </div>
        </>
    );
}

function UserInfo() {
    const [order, setOrder] = useState(false);

    const HandleOrder = () => {
        setOrder((prev) => !prev);
    }

    return (
        <div className='userInfoScreen'>
            <div className="userInfoScreen-mid">
                <UserFormInfo/>
                <UserPersonalInfo toggle={HandleOrder}/>
            </div>
            {order && <UserOrder/>}
        </div>
    );
}

export default UserInfo