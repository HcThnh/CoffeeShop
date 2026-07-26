import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Admin_Header from './Admin_Header'; 
import axios from 'axios';
import { Rows3, IdCard } from 'lucide-react';

const Admin_ManageWorkSchedule = () => {
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState("");

    const [filters, setFilters] = useState({
        shiftId: '',
        employeeId: '',
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchSchedule = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(
                    "https://coffeeshop-api-udqx.onrender.com/manager/view/schedule",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }
                );
                setSchedule(res.data);
                setIsLoading(false);
            }
            catch(err) {
                setErr(err.response?.data?.message || err.message || "Không thể lấy dữ liệu lịch làm việc!");
                setIsLoading(false);
            }
        };

        fetchSchedule();
    }, []);

    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        setFilters((prev) => ({ ...prev, [id]: value.toLowerCase() }));
    };

    const filteredSchedule = schedule.filter((item) => {
        const shiftIdMatch = !filters.shiftId || (item.id?.shiftId && String(item.id.shiftId).toLowerCase().includes(filters.shiftId));
        const employeeIdMatch = !filters.employeeId || (item.id?.employeeId && String(item.id.employeeId).toLowerCase().includes(filters.employeeId));
        
        return shiftIdMatch && employeeIdMatch;
    });

    const handleCreateWorkSchedule = () => {
        navigate('/admin/manage-work-schedule/edit'); 
    };

    return (
        <div className="min-h-screen bg-stone-100 font-sans">
            <Admin_Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <h2 className="text-4xl font-black text-stone-900 mt-0 tracking-tight">Lịch Làm Việc</h2>
                    </div>
                    <button 
                        onClick={handleCreateWorkSchedule}
                        className="bg-stone-900 hover:bg-black text-white font-bold py-3 px-6 rounded-2xl 
                        shadow-xl shadow-stone-900/20 transition-transform transform hover:-translate-y-1 
                        flex items-center shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Tạo ca mới
                    </button>
                </div>

                {err && (
                    <div className="mb-8 bg-red-50 text-red-600 p-5 rounded-2xl text-sm font-bold border border-red-100 flex items-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {err}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
                    <div className="relative group">
                        <Rows3 className="absolute top-1/2 -translate-y-1/2 left-3 text-stone-400
                        group-focus-within:text-amber-500" />

                        <input type="text" id="shiftId" placeholder="Mã Ca" onChange={handleFilterChange} 
                            className="w-full pl-11 pr-4 py-3 rounded-lg border-none bg-white shadow-sm focus:ring-2 focus:ring-amber-500 outline-none 
                            font-medium text-stone-700 transition-all placeholder-stone-400 text-sm" />
                    </div>

                    <div className="relative group">
                        <IdCard className="absolute top-1/2 -translate-y-1/2 left-3 text-stone-400
                        group-focus-within:text-amber-500"/>

                        <input type="text" id="employeeId" placeholder="Mã Nhân viên" onChange={handleFilterChange} 
                            className="w-full pl-11 pr-4 py-3 rounded-lg border-none bg-white shadow-sm 
                            focus:ring-2 focus:ring-amber-500 outline-none font-medium text-stone-700 
                            transition-all placeholder-stone-400 text-sm" />
                    </div>
                </div>


                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <svg className="animate-spin h-10 w-10 text-amber-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-stone-500 font-medium">Đang đồng bộ dữ liệu...</p>
                    </div>
                ) : filteredSchedule.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-stone-200 border-dashed">
                        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-stone-700 mb-1">Không tìm thấy ca làm việc</h3>
                        <p className="text-stone-500">Vui lòng thử điều chỉnh lại bộ lọc tìm kiếm.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredSchedule.map((item, index) => (
                            <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                                
                                {/* Decorative top border */}
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-400"></div>

                                <div className="flex justify-between items-start mb-6 pt-2">
                                    <div>
                                        <p className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-1">Ngày làm việc</p>
                                        <p className="text-lg font-black text-stone-800">{item.date}</p>
                                    </div>
                                    <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-sm font-bold border border-amber-200">
                                        Ca {item.shift}
                                    </div>
                                </div>

                                <div className="bg-stone-50 rounded-2xl p-4 mb-6 border border-stone-100 flex items-center justify-between">
                                    <div className="flex items-center text-stone-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-bold text-stone-800">{item.shiftResponseDto?.startTime}</span>
                                    </div>
                                    <div className="w-8 border-t-2 border-dashed border-stone-300"></div>
                                    <div className="font-bold text-stone-800">
                                        {item.shiftResponseDto?.endTime}
                                    </div>
                                </div>

                                <div className="flex items-center pt-4 border-t border-stone-100">
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-black text-stone-800 truncate">{item.employeeName || "Không xác định"}</p>
                                        <p className="text-xs font-medium text-stone-400 font-mono mt-0.5 truncate flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                                            {item.id?.employeeId}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Admin_ManageWorkSchedule;
