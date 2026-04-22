import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Admin_Header from './Admin_Header'; 
import "../assets/css/Admin_ManageWorkSchedule.css"; 
import axios from 'axios';

const Admin_ManageWorkSchedule = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [workScheduleData, setWorkScheduleData] = useState([]);
    const [filters, setFilters] = useState({
        date: '',
        shift: '',
        start: '',
        end: '',
        idManager: '',
        nameManager: '',
        idEmployee: '',
        nameEmployee: '',
    });

    const [schedule, setSchedule] = useState([]);
    const [err, setErr] = useState("");

    // Giả lập API lấy dữ liệu lịch làm việc
    useEffect(() => {
        const token = localStorage.getItem("token");

        const GetSchedule = async(e) => {
            try {
                const res = await axios.get(
                    "https://coffeeshop-api-udqx.onrender.com/manager/view/schedule",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }
                )
                setSchedule(res.data);
            }
            catch(err) {
                setErr(err.message || "Something went wrong!")
            }
        }

        const data = [
            { date: "03/12/2024", shift: "1", start: "7:30", end: "12:00", idManager: "MGR01", nameManager: "Phạm Thị B", idEmployee: "EMP001", nameEmployee: "Trần Văn C" },
            { date: "04/12/2024", shift: "2", start: "8:00", end: "13:00", idManager: "MGR02", nameManager: "Nguyễn Văn A", idEmployee: "EMP002", nameEmployee: "Nguyễn Văn B" },
        ];
        setWorkScheduleData(data);

        GetSchedule();
    }, []);

    // Hàm lọc dữ liệu
    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        setFilters((prev) => ({ ...prev, [id]: value.toLowerCase() }));
    };

    const filteredData = workScheduleData.filter((schedule) => {
        return (
            (!filters.date || schedule.date.toLowerCase().includes(filters.date)) &&
            (!filters.shift || schedule.shift.toLowerCase().includes(filters.shift)) &&
            (!filters.start || schedule.start.toLowerCase().includes(filters.start)) &&
            (!filters.end || schedule.end.toLowerCase().includes(filters.end)) &&
            (!filters.idManager || schedule.idManager.toLowerCase().includes(filters.idManager)) &&
            (!filters.nameManager || schedule.nameManager.toLowerCase().includes(filters.nameManager)) &&
            (!filters.idEmployee || schedule.idEmployee.toLowerCase().includes(filters.idEmployee)) &&
            (!filters.nameEmployee || schedule.nameEmployee.toLowerCase().includes(filters.nameEmployee))
        );
    });


    const handleCreateWorkSchedule = () => {
        navigate('/admin/manage-work-schedule/edit'); 
    };

    return (
        <div>
            <Admin_Header />

            {/* Nội dung chính */}
            <div className="schedule-title-container">
                <h2 className="schedule-title">LỊCH LÀM VIỆC</h2>
                <button className="create-schedule-button" onClick={handleCreateWorkSchedule}>
                    Tạo lịch làm việc
                </button>
            </div>

            <div className="table-container">
                <table id="work-schedule-table">
                    <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Ca làm</th>
                            <th>Bắt đầu</th>
                            <th>Kết thúc</th>
                            <th>ID Ca làm</th>
                            {/* <th>Tên Quản lý</th> */}
                            <th>ID Nhân viên</th>
                            <th>Tên Nhân viên</th>
                        </tr>
                    </thead>
                    <tbody className="filter-row">
                        <tr>
                            <td><input type="text" id="date" className="filter-input" placeholder="Lọc theo ngày" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="shift" className="filter-input" placeholder="Lọc theo ca" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="start" className="filter-input" placeholder="Lọc theo giờ bắt đầu" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="end" className="filter-input" placeholder="Lọc theo giờ kết thúc" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="idManager" className="filter-input" placeholder="Lọc theo ID quản lý" onChange={handleFilterChange} /></td>
                            {/* <td><input type="text" id="nameManager" className="filter-input" placeholder="Lọc theo tên quản lý" onChange={handleFilterChange} /></td> */}
                            <td><input type="text" id="idEmployee" className="filter-input" placeholder="Lọc theo ID nhân viên" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="nameEmployee" className="filter-input" placeholder="Lọc theo tên nhân viên" onChange={handleFilterChange} /></td>
                        </tr>
                    </tbody>
                    <tbody id="schedule-data">
                        {schedule.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.shift}</td>
                                <td>{item.shiftResponseDto.startTime}</td>
                                <td>{item.shiftResponseDto.endTime}</td>
                                <td>{item.id.shiftId}</td>
                                {/* <td>{schedule.nameManager}</td> */}
                                <td>{item.id.employeeId}</td>
                                <td>{item.employeeName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin_ManageWorkSchedule;
