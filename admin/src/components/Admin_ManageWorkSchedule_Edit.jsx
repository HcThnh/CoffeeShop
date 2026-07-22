import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin_Header from './Admin_Header'; 
import axios from 'axios';

const Admin_ManageWorkSchedule_Edit = () => {
    const navigate = useNavigate();
    const [workSchedule, setWorkSchedule] = useState({
        date: '',
        employeeId: '',
        shift: '',
    });

    const [workShift, setWorkShift] = useState({
        startTime: '',
        endTime: '',
    });

    const [scheduleSuccess, setScheduleSuccess] = useState('');
    const [shiftSuccess, setShiftSuccess] = useState('');
    const [scheduleErr, setScheduleErr] = useState("");
    const [shiftErr, setShiftErr] = useState("");
    const [emp, setEmp] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [selectedEmpId, setSelectedEmpId] = useState("");
    const [selectedShiftId, setSelectedShiftId] = useState("");
    
    const [isSubmittingSchedule, setIsSubmittingSchedule] = useState(false);
    const [isSubmittingShift, setIsSubmittingShift] = useState(false);

    const dateRef = useRef("");
    const startTimeRef = useRef("");
    const endTimeRef = useRef("");

    const getAllEmp = async () => {
        try {
            const token = localStorage.getItem("token");

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
        } catch (err) {
            setScheduleErr(err.response?.data?.message || err.message || "Đã xảy ra lỗi khi tạo phân công!");
        }
    }

    const getAllShifts = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "https://coffeeshop-api-udqx.onrender.com/manager/view/shifts",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )

            setShifts(res.data);
        } catch(err) {
            setScheduleErr(err.response?.data?.message || err.message || "Đã xảy ra lỗi khi tạo phân công!");
        }
    }

    useEffect(() => {
        getAllEmp();
        getAllShifts();
    }, []);

    const CreateSchedule = async(e) => {
        e.preventDefault();
        setScheduleErr("");
        setScheduleSuccess("");
        setIsSubmittingSchedule(true);

        const date = dateRef.current.value;

        if (!date || !selectedEmpId || !selectedShiftId) {
            setScheduleErr("Vui lòng điền đầy đủ thông tin phân công.");
            setIsSubmittingSchedule(false);
            return;
        }

        const token = localStorage.getItem("token");
        
        const schedule = {
            date: date,
            employeeId: selectedEmpId,
            shiftId: selectedShiftId,
        }

        try {
            await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/manager/create/schedule",
                schedule, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            setScheduleSuccess('Đã tạo phân công làm việc thành công!');
            setTimeout(() => setScheduleSuccess(''), 4000);
            
            setSelectedEmpId("");
            setSelectedShiftId("");
            if (dateRef.current) dateRef.current.value = "";
        }
        catch(err) {
            setScheduleErr(err.response?.data?.message || err.message || "Đã xảy ra lỗi khi tạo phân công!");
        }
        finally {
            setIsSubmittingSchedule(false);
        }
    }

    // Tạo ca làm việc
    const CreateShift = async(e) => {
        e.preventDefault();
        setShiftErr("");
        setShiftSuccess("");
        setIsSubmittingShift(true);

        const startTime = startTimeRef.current.value;
        const endTime = endTimeRef.current.value;

        if (!startTime || !endTime) {
            setShiftErr("Vui lòng chọn thời gian bắt đầu và kết thúc.");
            setIsSubmittingShift(false);
            return;
        }

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

        const shift = {
            startTime: startTime,
            endTime: endTime,
            hour: hour
        }

        const token = localStorage.getItem("token");
        try {
            await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/manager/create/shift",
                shift, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            setShiftSuccess('Đã khởi tạo Ca làm việc mới thành công!');
            setTimeout(() => setShiftSuccess(''), 4000);

            // Xóa form
            setWorkShift({ startTime: '', endTime: '' });
        }
        catch(err) {
            setShiftErr(err.response?.data?.message || err.message || "Đã xảy ra lỗi khi tạo ca làm việc!");
        }
        finally {
            setIsSubmittingShift(false);
        }
    }

    return (
        <div className="min-h-screen bg-stone-50 font-sans">
            <Admin_Header />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="flex items-center mb-8">
                    <button 
                        onClick={() => navigate('/admin/manage-work-schedule')}
                        className="mr-4 p-2 rounded-xl bg-white border border-stone-200 text-stone-500 hover:text-amber-600 hover:border-amber-200 transition-colors shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="text-3xl font-black text-stone-800 tracking-tight mt-0">Thiết Lập Lịch Làm Việc</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                        
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-stone-800">Phân Công Nhân Viên</h3>
                        </div>

                        {scheduleErr && (
                            <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold border border-red-100 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {scheduleErr}
                            </div>
                        )}
                        
                        {scheduleSuccess && (
                            <div className="mb-6 bg-emerald-50 text-emerald-600 px-4 py-3 rounded-xl text-sm font-bold border border-emerald-100 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {scheduleSuccess}
                            </div>
                        )}

                        <form onSubmit={CreateSchedule} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2">
                                    Ngày làm việc
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 rounded-xl border mt-2
                                        border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 
                                        outline-none transition-all font-medium text-stone-700 bg-stone-50 focus:bg-white"
                                        value={workSchedule.date}
                                        onChange={(e) => setWorkSchedule({ ...workSchedule, date: e.target.value })}
                                        required
                                        ref={dateRef}
                                    />
                                </label>
                            </div>
                            <div className="flex flex-col text-sm font-bold text-stone-700 mb-2
                            border border-stone-200 rounded-md px-4 py-3">
                                <label className="w-full mt-2"
                                htmlFor='employeeSelect'>
                                    Chọn nhân viên
                                </label>
                                <select name="employeeSelect" id="employeeSelect"
                                    className="w-full py-3 rounded-xl border border-stone-200 focus:border-emerald-500
                                    focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium
                                    text-stone-700 bg-stone-50 focus:bg-white mt-2 px-4"
                                    value={selectedEmpId}
                                    onChange={(e) => setSelectedEmpId(Number(e.target.value))}>
                                        <option value="" disabled>Nhấn để chọn số điện thoại</option>
                                        {emp.map((item) => {
                                            return (
                                                <option key={item.id} value={item.id}>
                                                    {item.phoneNumber}
                                                </option>
                                            )
                                        })}
                                    </select>
                            </div>
                            <div className="flex flex-col text-sm font-bold text-stone-700 mb-2
                            border border-stone-200 rounded-md px-4 py-3">
                                <label className="w-full mt-2"
                                htmlFor='shifts'>
                                    Ca làm việc
                                </label>
                                <select name="shifts" id="shifts"
                                className="w-full py-3 rounded-xl border border-stone-200 focus:border-emerald-500
                                focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium
                                text-stone-700 bg-stone-50 focus:bg-white mt-2 px-4"
                                value={selectedShiftId}
                                onChange={(e) => setSelectedShiftId(Number(e.target.value))}>
                                    <option value="" disabled>--- Chọn ca làm việc ---</option>
                                    {shifts.map(item => {
                                        return (
                                        <option key={item.id} value={item.id}>
                                            {item.startTime} - {item.endTime}
                                        </option>)
                                    })}
                                </select>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmittingSchedule}
                                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                            >
                                {isSubmittingSchedule ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                ) : "Lưu Phân Công"}
                            </button>
                        </form>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                        
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-stone-800">Định Nghĩa Ca Mới</h3>
                        </div>

                        {shiftErr && (
                            <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold border border-red-100 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {shiftErr}
                            </div>
                        )}
                        
                        {shiftSuccess && (
                            <div className="mb-6 bg-emerald-50 text-emerald-600 px-4 py-3 rounded-xl text-sm font-bold border border-emerald-100 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {shiftSuccess}
                            </div>
                        )}

                        <form onSubmit={CreateShift} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2">
                                    Thời gian bắt đầu
                                    <input
                                        type="time"
                                        className="w-full px-4 py-3 rounded-xl mt-2
                                        border border-stone-200 focus:border-amber-500 
                                        focus:ring-2 focus:ring-amber-200 outline-none 
                                        transition-all font-medium text-stone-700 bg-stone-50 focus:bg-white"
                                        value={workShift.startTime}
                                        onChange={(e) => setWorkShift({ ...workShift, startTime: e.target.value })}
                                        required
                                        ref={startTimeRef}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2">
                                    Thời gian kết thúc
                                    <input
                                        type="time"
                                        className="w-full px-4 py-3 rounded-xl mt-2
                                        border border-stone-200 focus:border-amber-500 
                                        focus:ring-2 focus:ring-amber-200 outline-none 
                                        transition-all font-medium text-stone-700 bg-stone-50 focus:bg-white"
                                        value={workShift.endTime}
                                        onChange={(e) => setWorkShift({ ...workShift, endTime: e.target.value })}
                                        required
                                        ref={endTimeRef}
                                    />
                                </label>
                            </div>
                            
                            <div className="pt-4">
                                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm text-orange-800 leading-relaxed">
                                        Hệ thống sẽ tự động tính toán tổng số giờ làm việc dựa trên thời gian bắt đầu và kết thúc để lưu vào cơ sở dữ liệu.
                                    </p>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmittingShift}
                                className="w-full mt-2 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                            >
                                {isSubmittingShift ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : "Khởi Tạo Ca Mới"}
                            </button>
                        </form>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Admin_ManageWorkSchedule_Edit;
