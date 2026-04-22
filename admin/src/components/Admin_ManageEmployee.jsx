import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin_Header from './Admin_Header'; 
import "../assets/css/Admin_ManageEmployee.css"; 
import axios from 'axios';

const Admin_ManageEmployee = () => {
    const navigate = useNavigate(); // Hook để chuyển hướng
    const [employeeData, setEmployeeData] = useState([]);
    const [filters, setFilters] = useState({
        idEmployee: '',
        nameEmployee: '',
        gender: '',
        birthDate: '',
        phone: '',
        address: '',
        email: '',
        startDate: '',
        position: '',
    });
    const [updateMessage, setUpdateMessage] = useState(""); // Thông báo cập nhật

    const [emp, setEmp] = useState([]);
    const [err, setErr] = useState("");

    // Giả lập API lấy dữ liệu nhân viên
    useEffect(() => {
        const GetEmployee = async(e) => {
            const token = localStorage.getItem("token");

            try {   
                const res = await axios.get(
                    "https://coffeeshop-api-udqx.onrender.com/manager/view/employees",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }
                )
                setEmp(res.data);
                console.log(res.data);
            }
            catch(err) {
                setErr(err.message || "Something went wrong!")
            }
        }

        const data = [
            { id: "EMP001", name: "Phan Tấn D", gender: "Nam", birthDate: "01/01/2001", phone: "0123456789", address: "Thủ Đức, Tp.HCM", email: "phantand@shopcoffee.com", startDate: "04/04/2024", position: "Phục vụ", salaryCoefficient: 12, totalSalary: 5000000 },
            { id: "EMP002", name: "Nguyễn Thị A", gender: "Nữ", birthDate: "12/12/1995", phone: "0987654321", address: "Quận 1, Tp.HCM", email: "nguyentha@shopcoffee.com", startDate: "01/01/2023", position: "Nhân viên lễ tân", salaryCoefficient: 10, totalSalary: 4000000 },
            { id: "EMP003", name: "Trần Thị B", gender: "Nữ", birthDate: "11/11/1990", phone: "0976543210", address: "Bình Thạnh, Tp.HCM", email: "tranthi@shopcoffee.com", startDate: "10/10/2021", position: "Quản lý", salaryCoefficient: 15, totalSalary: 7500000 },
            { id: "EMP004", name: "Lê Minh C", gender: "Nam", birthDate: "22/08/1988", phone: "0965432109", address: "Gò Vấp, Tp.HCM", email: "leminhc@shopcoffee.com", startDate: "01/06/2022", position: "Nhân viên pha chế", salaryCoefficient: 11, totalSalary: 4500000 },
            { id: "EMP005", name: "Hoàng Thị D", gender: "Nữ", birthDate: "03/05/1993", phone: "0912345678", address: "Quận 2, Tp.HCM", email: "hoangthi@shopcoffee.com", startDate: "15/09/2021", position: "Thu ngân", salaryCoefficient: 9, totalSalary: 4000000 },
        ];
        setEmployeeData(data);

        GetEmployee();
    }, []);

    // Lọc dữ liệu
    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        setFilters((prev) => ({ ...prev, [id]: value.toLowerCase() }));
    };

    // Cập nhật thông báo khi nhấn "Cập nhật"
    const handleUpdateClick = () => {
        setUpdateMessage("Đang cập nhật dữ liệu...");
        setTimeout(() => {
            setUpdateMessage("Cập nhật lương hoàn tất");
        }, 2000); // Hiển thị thông báo sau 2 giây
        setTimeout(() => {
            setUpdateMessage(""); // Ẩn thông báo sau 3 giây
        }, 5000);
    };

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const handleRadioChange = (id) => {
        setSelectedEmployeeId(id);
    };

    const calSalary = async(e) => {
        const token = localStorage.getItem("token");

        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const updateSal = {
            id: selectedEmployeeId,
            month: month,
            year: year,
        }
        console.log(updateSal);
        try {
            const res = await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/manager/update/employee/salary",
                updateSal, {
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

    // Hàm định dạng tổng lương
    const formatSalary = (salary) => {
        return salary.toLocaleString('vi-VN') + ' VNĐ';
    };

    const filteredData = employeeData.filter((employee) => {
        return (
            (!filters.idEmployee || employee.id.toLowerCase().includes(filters.idEmployee)) &&
            (!filters.nameEmployee || employee.name.toLowerCase().includes(filters.nameEmployee)) &&
            (!filters.gender || employee.gender.toLowerCase().includes(filters.gender)) &&
            (!filters.birthDate || employee.birthDate.toLowerCase().includes(filters.birthDate)) &&
            (!filters.phone || employee.phone.toLowerCase().includes(filters.phone)) &&
            (!filters.address || employee.address.toLowerCase().includes(filters.address)) &&
            (!filters.email || employee.email.toLowerCase().includes(filters.email)) &&
            (!filters.startDate || employee.startDate.toLowerCase().includes(filters.startDate)) &&
            (!filters.position || employee.position.toLowerCase().includes(filters.position))
        );
    });

    return (
        <div>
            {/* Header */}
            <Admin_Header />

            {/* Nội dung chính */}
            <h2 className="employee-title">
                QUẢN LÝ NHÂN VIÊN
                <button 
                    className="manage-employee-btn"
                    style={{ marginLeft: 'auto', marginRight: '90px' }}
                    onClick={() => navigate('/admin/manage-employee/edit')}
                >
                    Quản lý thông tin nhân viên
                </button>
            </h2>

            {/* Bảng nhân viên */}
            <div className="employee-table-container">
                <table id="employee-table">
                    <thead>
                        <tr>
                            <th>ID Nhân viên</th>
                            <th>Tên Nhân viên</th>
                            {/* <th>Giới tính</th>
                            <th>Ngày tháng năm sinh</th> */}
                            <th>Số điện thoại</th>
                            {/* <th>Địa chỉ</th>
                            <th>Email</th> */}
                            <th>Ngày bắt đầu làm việc</th>
                            <th>Vị trí</th>
                            {/* <th>Hệ số lương</th> */}
                            <th>Tổng lương</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="filter-row">
                        <tr>
                            <td><input type="text" id="idEmployee" className="filter-input" placeholder="Lọc theo ID" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="nameEmployee" className="filter-input" placeholder="Lọc theo tên" onChange={handleFilterChange} /></td>
                            {/* <td><input type="text" id="gender" className="filter-input" placeholder="Lọc theo giới tính" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="birthDate" className="filter-input" placeholder="Lọc theo ngày sinh" onChange={handleFilterChange} /></td> */}
                            <td><input type="text" id="phone" className="filter-input" placeholder="Lọc theo số điện thoại" onChange={handleFilterChange} /></td>
                            {/* <td><input type="text" id="address" className="filter-input" placeholder="Lọc theo địa chỉ" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="email" className="filter-input" placeholder="Lọc theo email" onChange={handleFilterChange} /></td> */}
                            <td><input type="text" id="startDate" className="filter-input" placeholder="Lọc theo ngày bắt đầu" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="position" className="filter-input" placeholder="Lọc theo vị trí" onChange={handleFilterChange} /></td>
                            {/* <td></td> */}
                            <td><button className="button-salary-update" onClick={calSalary}>Cập nhật</button></td>
                            <td></td>
                        </tr>
                    </tbody>
                    <tbody id="employee-data">
                        {emp.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                {/* <td>{employee.gender}</td>
                                <td>{employee.birthDate}</td> */}
                                <td>{employee.phoneNumber}</td>
                                {/* <td>{employee.address}</td>
                                <td>{employee.email}</td> */}
                                <td>{employee.startDate}</td>
                                <td>{employee.position}</td>
                                {/* <td>{employee.salaryCoefficient}</td> */}
                                <td>{formatSalary(employee.totalSalary)}</td>
                                <td><input type="radio" name='salary'
                                value={employee.id}
                                checked={selectedEmployeeId === employee.id}
                                onChange={() => handleRadioChange(employee.id)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Thông báo cập nhật */}
            {updateMessage && (
                <div className="success-message">{updateMessage}</div>
            )}
        </div>
    );
};

export default Admin_ManageEmployee;
