import React, { useState, useRef } from 'react';
import Admin_Header from './Admin_Header'; 
import "../assets/css/Admin_ManageWorkSchedule_Edit.css"; 
import axios from 'axios';

const Admin_ManageWorkSchedule_Edit = () => {
    const [workSchedule, setWorkSchedule] = useState({
        date: '',
        employeeId: '',
        shift: '',
    });

    const [workShift, setWorkShift] = useState({
        date: '',
        startTime: '',
        endTime: '',
    });

    const [scheduleSuccess, setScheduleSuccess] = useState('');
    const [shiftSuccess, setShiftSuccess] = useState('');

    // Tạo lịch làm việc
    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        // Thực hiện tạo lịch làm việc (giả lập)
        setScheduleSuccess('Đã tạo lịch làm việc thành công');
        setTimeout(() => setScheduleSuccess(''), 3000); // Ẩn thông báo sau 3 giây
    };

    // Tạo ca làm việc
    const handleShiftSubmit = (e) => {
        e.preventDefault();
        // Thực hiện tạo ca làm việc (giả lập)
        setShiftSuccess('Đã tạo ca làm việc thành công');
        setTimeout(() => setShiftSuccess(''), 3000); // Ẩn thông báo sau 3 giây
    };

    const dateRef = useRef("");
    const idERef = useRef("");
    const shiftRef = useRef("");
    const [err, setErr] = useState("");

    const CreateSchedule = async(e) => {
        const date = dateRef.current.value;
        const idE = idERef.current.value;
        const shift = shiftRef.current.value;

        const schedule = {
            date: date,
            employeeId: idE,
            shiftId: shift,
        }

        console.log(schedule);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/manager/create/schedule",
                schedule, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
        }
        catch(err) {
            setErr(err.message || "Something went wrong!")
        }
    }

    const startTimeRef = useRef("");
    const endTimeRef = useRef("");

    const CreateShift = async(e) => {
        const date = dateRef.current.value;
        const startTime = startTimeRef.current.value;
        const endTime = endTimeRef.current.value;

        const timeToMinute = (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        }

        const startMinutes = timeToMinute(startTime);
        const endMinutes = timeToMinute(endTime);

        const durationMinutes = (endMinutes >= startMinutes)
            ? endMinutes - startMinutes
            : (1440 - startMinutes) + endMinutes;
        const hour = durationMinutes / 60;
        console.log(hour);

        const shift = {
            startTime: startTime,
            endTime: endTime,
            hour: hour
        }

        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/manager/create/shift",
                shift, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
        }
        catch(err) {
            setErr(err.message || "Something went wrong!")
        }
    }


    return (
        <div>
            <Admin_Header /> {/* Header */}
            <div className="work-schedule-edit-content">

                <div className="schedule-section">
                    <h2 className="create-schedule-title">TẠO LỊCH LÀM VIỆC</h2>
                    <form onSubmit={handleScheduleSubmit}>
                        <div className="form-group">
                            <label>Ngày</label>
                            <input
                                type="date"
                                className="input-field"
                                value={workSchedule.date}
                                onChange={(e) => setWorkSchedule({ ...workSchedule, date: e.target.value })}
                                required
                                ref={dateRef}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mã Nhân viên</label>
                            <input
                                type="text"
                                className="input-field"
                                value={workSchedule.employeeId}
                                onChange={(e) => setWorkSchedule({ ...workSchedule, employeeId: e.target.value })}
                                required
                                ref={idERef}
                            />
                        </div>
                        <div className="form-group">
                            <label>Ca làm</label>
                            <input
                                type="text"
                                className="input-field"
                                value={workSchedule.shift}
                                onChange={(e) => setWorkSchedule({ ...workSchedule, shift: e.target.value })}
                                required
                                ref={shiftRef}
                            />
                        </div>
                        <button type="submit" className="submit-button"
                        onClick={CreateSchedule}>Tạo</button>
                    </form>
                    {scheduleSuccess && <p className="success-message">{scheduleSuccess}</p>}
                </div>

                <div className="shift-section">
                    <h2 className="create-shift-title">TẠO CA LÀM VIỆC</h2>
                    <form onSubmit={handleShiftSubmit}>
                        {/* <div className="form-group">
                            <label>Ngày</label>
                            <input
                                type="date"
                                className="input-field"
                                value={workShift.date}
                                onChange={(e) => setWorkShift({ ...workShift, date: e.target.value })}
                                required
                                ref={dateRef}
                            />
                        </div> */}
                        <div className="form-group">
                            <label>Thời gian bắt đầu</label>
                            <input
                                type="time"
                                className="input-field"
                                value={workShift.startTime}
                                onChange={(e) => setWorkShift({ ...workShift, startTime: e.target.value })}
                                required
                                ref={startTimeRef}
                            />
                        </div>
                        <div className="form-group">
                            <label>Thời gian kết thúc</label>
                            <input
                                type="time"
                                className="input-field"
                                value={workShift.endTime}
                                onChange={(e) => setWorkShift({ ...workShift, endTime: e.target.value })}
                                required
                                ref={endTimeRef}
                            />
                        </div>
                        <button type="submit" className="submit-button"
                        onClick={CreateShift}>Tạo</button>
                    </form>
                    {shiftSuccess && <p className="success-message">{shiftSuccess}</p>}
                </div>
            </div>
        </div>
    );
};

export default Admin_ManageWorkSchedule_Edit;
