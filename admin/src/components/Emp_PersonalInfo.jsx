import React, { useEffect, useState, useRef } from "react";
import Emp_Header from "./Emp_Header"; 
import "../assets/css/Emp_PersonalInfo.css"; 
import axios from "axios";

const Emp_PersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa

  const [err, setErr] = useState("");
  const [info, setInfo] = useState([]);
  const [phone, setPhone] = useState("");

  // Giả lập dữ liệu API
  useEffect(() => {
    const token = localStorage.getItem("token");

    const getInfo = async(e) => {
      try {
        const res = await axios.get(
          "https://coffeeshop-api-udqx.onrender.com/employee/get/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        )
        setInfo(res.data);
        setPhone(res.data.phoneNumber);
      }
      catch(err) {
        setErr(err.message);
      }
    }
    
    getInfo();

    const mockData = {
      empId: "EMP001",
      name: "Trần Minh Hiếu",
      dob: "28/09/1999",
      gender: "Nam",
      phone: "0123456789",
      email: "hieuthuhai@coffeeshop.com",
      address: "Hóc Môn, Tp.HCM",
    };
    setTimeout(() => setPersonalInfo(mockData), 500); // Giả lập delay API
  }, []);

  // Hàm xử lý thay đổi thông tin cá nhân
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value, // Cập nhật giá trị mới cho các trường
    });
  };

  // Hàm xử lý lưu thông tin
  const handleSave = () => {
    setIsEditing(false); // Đóng chế độ chỉnh sửa
    // Giả lập lưu thông tin (thực tế sẽ gọi API)
    console.log("Thông tin đã được lưu:", personalInfo);
  };

  const nameRef = useRef("");
  const dobRef = useRef("");
  const genderRef = useRef(info.gender);
  const phoneRef = useRef("");
  const addrRef = useRef("");

  const handleChange = (e) => {
    genderRef.current = e.target.value;
  }

  const updateEmp = async(e) => {
    setIsEditing(true);
    const token = localStorage.getItem("token");

    const name = nameRef.current.value;
    const dob = dobRef.current.value;
    const gender = genderRef.current;
    const addr = addrRef.current.value;

    const emp = {
      dob: dob,
      phoneNumber: phone,
      address: addr,
      gender: gender,
      name: name
    }

    try {
      const res = await axios.patch(
        "https://coffeeshop-api-udqx.onrender.com/employee/update/info",
        emp, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      )
    }
    catch(err) {
      setErr(err.message);
    }
  }

  return (
    <div>
      <Emp_Header /> {/* Header */}
      <main className="emp-personal-info-main-content">
        <h2>THÔNG TIN CÁ NHÂN</h2>
        {personalInfo ? (
          <div>
            <table className="personal-info-table">
              <tbody>
                <tr>
                  <td><strong>Họ và tên</strong></td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        ref={nameRef}
                      />
                    ) : (
                      info.name
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>Ngày sinh</strong></td>
                  <td>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dob"
                        onChange={handleInputChange}
                        ref={dobRef}
                      />
                    ) : (
                      info.dob
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>Giới tính</strong></td>
                  <td>
                    {isEditing ? (
                      <select
                        name="gender"
                        onChange={handleChange}
                        defaultValue={info.gender}
                      >
                        <option value="M">Nam</option>
                        <option value="F">Nữ</option>
                      </select>
                    ) : (
                      info.gender
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>SĐT</strong></td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        onChange={handleInputChange}
                        ref={phoneRef}
                        disabled
                      />
                    ) : (
                      info.phoneNumber
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>Địa chỉ</strong></td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        onChange={handleInputChange}
                        ref={addrRef}
                      />
                    ) : (
                      info.address
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            {isEditing ? (
              <button className="edit-button" onClick={updateEmp}>
                Lưu thay đổi
              </button>
            ) : (
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Chỉnh sửa
              </button>
            )}
          </div>
        ) : (
          <p>Đang tải...</p>
        )}
      </main>
    </div>
  );
};

export default Emp_PersonalInfo;
