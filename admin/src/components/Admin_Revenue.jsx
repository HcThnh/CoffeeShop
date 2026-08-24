import { useState, useRef } from 'react';
import Admin_Header from './Admin_Header'; 
import "../assets/css/Admin_Revenue.css"; 
import axios from 'axios';
import { LoaderCircle, CircleX } from 'lucide-react';

const Admin_Revenue = () => {
    const dateRef = useRef("");
    const [err, setErr] = useState("");
    const [income, setIncome] = useState("");
    const [month, setMonth] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const CalIncome = async () => {
        const token = localStorage.getItem("token");

        if (!dateRef || !dateRef.current || !dateRef.current.value) {
            alert("Vui lòng chọn tháng và năm!");
            return;
        }
    
        const dateValue = dateRef.current.value;
        const [year, month] = dateValue.split("-").map(Number);
        setMonth(month);
        setIsLoading(true);

        try {
            const res = await axios.get(
                "https://coffeeshop-api-udqx.onrender.com/manager/income",
                {
                    params: { year, month },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setIncome(res.data);
        } catch (error) {
            setErr(error.message);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-100 font-sans">
            <Admin_Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex mb-10">
                    <h1 className="text-4xl font-black text-stone-900 mt-0 tracking-tight">
                        Báo cáo doanh thu</h1>
                </div>

                <div className="max-w-md w-full bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-stone-850 mb-4">Tính doanh thu theo tháng</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="date" className="text-xs font-bold text-stone-400 uppercase tracking-wider">Chọn tháng và năm</label>
                            <input 
                                type="month"
                                className="w-full px-4 py-3 text-sm text-stone-850 bg-stone-50/50
                                border border-stone-200 rounded-xl shadow-inner
                                hover:border-stone-300
                                focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20
                                cursor-pointer transition-all duration-200"
                                ref={dateRef}
                                id="date"
                            />
                        </div>

                        <button className="w-full bg-stone-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
                        onClick={CalIncome}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Tính lợi nhuận
                        </button>

                        {isLoading ? (
                            <div className="flex justify-center py-3">
                                <LoaderCircle className="w-8 h-8 animate-spin text-amber-500"
                                strokeWidth={3.5}/>
                            </div>
                        ) : err ? (
                            <div className="flex flex-col items-center bg-red-50 border border-red-100 rounded-xl py-4 px-3 gap-2">
                                <CircleX className="w-8 h-8 font-semibold text-red-500"/>
                                <p className="font-bold text-red-600 text-sm">Đã xảy ra lỗi, vui lòng thử lại.</p>
                            </div>
                        ) : ( month &&
                            <div className="flex flex-col items-center justify-center bg-amber-50 border border-amber-100 rounded-xl p-5 text-stone-800 text-center animate-fade-in-up">
                                <span className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Kết quả doanh thu</span>
                                <p className="text-sm font-semibold text-stone-600">
                                    Lợi nhuận của <span className="text-stone-900 font-bold">Tháng {month}</span> là:
                                </p>
                                <p className="text-2xl font-black text-amber-600 mt-1.5">
                                    {income ? Number(income).toLocaleString('vi-VN') : "0"} <span className="text-sm font-bold">VNĐ</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Admin_Revenue;
