import { useEffect, useState } from 'react';
import axios from 'axios';

function UserGiftHistory() {
    const [err, setErr] = useState("");
    const [gift, setGift] = useState([]);

    useEffect(() => {
        const fetchGiftHistory = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(
                    "https://coffeeshop-api-udqx.onrender.com/customer/gift/exchange/history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }
                )
                setGift(res.data);
            } catch (error) {
                setErr(error.response?.data?.message || error.message || "Không thể tải lịch sử.");
            }
        }
        
        fetchGiftHistory();
    }, []);

    return (
        <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-stone-800 mb-6">Lịch sử đổi quà</h3>
            
            {err && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {err}
                </div>
            )}

            {gift.length === 0 && !err ? (
                <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-200 border-dashed">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-stone-500 font-medium text-lg">Bạn chưa có lịch sử đổi quà nào.</p>
                    <p className="text-stone-400 mt-1">Hãy tích cực mua sắm để nhận nhiều quà hấp dẫn nhé!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {gift.map((item, index) => (
                        <div key={index} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            {/* Decorative accent */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 group-hover:w-2 transition-all"></div>
                            
                            <div className="flex justify-between items-start mb-4 pl-3">
                                <h4 className="font-bold text-xl text-stone-800 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                                        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                                    </svg>
                                    {item.giftName}
                                </h4>
                                <span className="bg-amber-100 text-amber-800 text-sm font-bold px-3 py-1 rounded-lg">
                                    Số lượng: {item.quantity}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm pl-3 bg-stone-50 p-3 rounded-xl border border-stone-100">
                                <div>
                                    <p className="text-stone-500 mb-1 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Tên khách hàng
                                    </p>
                                    <p className="font-bold text-stone-800 ml-5">{item.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-stone-500 mb-1 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Ngày đổi quà
                                    </p>
                                    <p className="font-bold text-stone-800 ml-5">{item.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserGiftHistory;