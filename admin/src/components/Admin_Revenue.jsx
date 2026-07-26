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

                <div className="flex justify-between">
                    <div className="flex flex-col gap-4 flex-1 max-w-xs">
                        <input 
                            type="month"
                            className="w-full px-3 py-2 text-sm text-gray-800 bg-white
                            border border-gray-300 rounded-lg shadow-sm
                            hover:border-gray-400
                            focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20
                            cursor-pointer transition-all duration-200
                            [&::-webkit-calendar-picker-indicator]:cursor-pointer 
                            [&::-webkit-calendar-picker-indicator]:opacity-60 
                            hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                            placeholder="Chọn tháng và năm"
                            ref={dateRef}
                            id="date"
                        />

                        <button className="bg-emerald-300 rounded-lg py-2 font-semibold
                        cursor-pointer hover:bg-emerald-400 transition-all duration-200"
                        onClick={CalIncome}>
                            Tính lợi nhuận
                        </button>

                        {isLoading ? (
                            <div className="flex justify-center py-3">
                                <LoaderCircle className="w-8 h-8 animate-spin text-amber-400"
                                strokeWidth={3.5}/>
                            </div>
                        ) : err ? (
                            <div className="flex flex-col items-center bg-red-300 border-2
                            border-red-400 rounded-lg py-3">
                                <CircleX className="w-8 h-8 font-semibold text-red-600"/>
                                <p className="font-semibold">Đã xảy ra lỗi, vui lòng thử lại.</p>
                            </div>
                        ) : ( month &&
                            <div className="flex items-center font-semibold">
                                Lợi nhuận tháng {month} là {income} VNĐ.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Admin_Revenue;
