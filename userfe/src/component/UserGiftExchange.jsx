import { useState, useEffect } from 'react';
import axios from 'axios';
import UserGiftHistory from './UserGiftHistory';

function UserGiftExchange() {
    const [err, setErr] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [gift, setGift] = useState([]);
    const [point, setPoint] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [giftHistory, setHistory] = useState(false);

    const fetchGiftAndPoint = async () => {
        try {
            const res = await axios.get(
                "https://coffeeshop-api-udqx.onrender.com/public/gift/view",
                { headers: { "Content-Type": "application/json" } }
            );
            setGift(res.data);

            const token = localStorage.getItem("token");
            const pointRes = await axios.get(
                "https://coffeeshop-api-udqx.onrender.com/customer/point",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            setPoint(pointRes.data);
        } catch (error) {
            setErr(error.message || "Không thể tải danh sách quà tặng.");
        }
    };

    useEffect(() => {
        fetchGiftAndPoint();
    }, []);

    const getCurrentDate = () => {
        const today = new Date(); 
        const day = String(today.getDate()).padStart(2, '0'); 
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const SendGift = async () => {
        if (!selectedId) {
            setErr("Vui lòng chọn một món quà để đổi!");
            setSuccessMsg("");
            return;
        }

        const selectedGift = gift.find(g => g.id === selectedId);
        if (selectedGift && point < selectedGift.point) {
            setErr("Bạn không đủ điểm để đổi món quà này!");
            setSuccessMsg("");
            return;
        }

        setIsLoading(true);
        setErr("");
        setSuccessMsg("");
        
        const token = localStorage.getItem("token");
        const date = getCurrentDate();
        
        const giftExchange = {
            giftId: selectedId,
            quantity: 1,
            date: date
        };

        try {
            await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/customer/gift/exchange",
                giftExchange, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            setSuccessMsg(`Đổi quà thành công! Bạn đã dùng ${selectedGift.point} điểm.`);
            setSelectedId(null);
            fetchGiftAndPoint();
        } catch (error) {
            setErr(error.response?.data?.message || error.message || "Đã có lỗi xảy ra khi đổi quà!");
        } finally {
            setIsLoading(false);
        }
    };

    const HandleGiftHistory = () => {
        setHistory((prev) => !prev);
    };

    return (
        <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10 mt-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 tracking-tight">
                        Chương Trình <span className="text-amber-600">Khách Hàng Thân Thiết</span>
                    </h2>
                    <p className="mt-3 text-lg text-stone-500">
                        Tích lũy điểm thưởng và đổi lấy những phần quà hấp dẫn từ Coffee Shop.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Panel: Points Info */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 border border-stone-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-100 rounded-full mix-blend-multiply opacity-50 transition-transform group-hover:scale-110"></div>
                            
                            <h3 className="text-lg font-bold text-stone-600 mb-2 relative z-10">Điểm hiện tại của bạn</h3>
                            <div className="flex items-center space-x-3 mb-6 relative z-10">
                                <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-5xl font-black text-stone-800 tracking-tight">{point}</span>
                            </div>
                            
                            <button 
                                onClick={HandleGiftHistory}
                                className="w-full flex items-center justify-center space-x-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 px-4 rounded-xl transition-colors relative z-10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Lịch sử đổi quà</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Gift Options */}
                    <div className="lg:w-2/3 bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-stone-800">Danh sách quà tặng</h3>
                            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                                {gift.length} lựa chọn
                            </span>
                        </div>

                        {err && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-6 border border-red-100 flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {err}
                        </div>}
                        
                        {successMsg && <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm font-medium mb-6 border border-green-100 flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {successMsg}
                        </div>}

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-stone-200">
                            {gift.map((item) => (
                                <div 
                                    key={item.id}
                                    onClick={() => setSelectedId(item.id)}
                                    className={`relative flex items-center p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                                        selectedId === item.id 
                                            ? 'border-amber-500 bg-amber-50/50 shadow-md' 
                                            : 'border-stone-100 bg-white hover:border-amber-200 hover:bg-stone-50'
                                    }`}
                                >
                                    {/* Selection Indicator */}
                                    <div className={`shrink-0 w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                                        selectedId === item.id ? 'border-amber-500 bg-amber-500' : 'border-stone-300 bg-white'
                                    }`}>
                                        {selectedId === item.id && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h4 className={`text-lg font-bold ${selectedId === item.id ? 'text-amber-900' : 'text-stone-800'}`}>
                                            {item.name}
                                        </h4>
                                    </div>

                                    <div className="shrink-0 flex items-center space-x-1.5 bg-white border border-stone-200 px-3 py-1.5 rounded-lg">
                                        <span className="font-extrabold text-amber-600">{item.point}</span>
                                        <span className="text-xs font-bold text-stone-500 uppercase">Điểm</span>
                                    </div>
                                </div>
                            ))}
                            
                            {gift.length === 0 && (
                                <div className="text-center py-10">
                                    <p className="text-stone-500">Đang tải danh sách quà tặng...</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-stone-100">
                            <button 
                                onClick={SendGift}
                                disabled={isLoading || !selectedId}
                                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform flex items-center justify-center space-x-2
                                    ${(!selectedId || isLoading) 
                                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none' 
                                        : 'bg-amber-600 hover:bg-amber-700 text-white hover:shadow-xl hover:-translate-y-1'
                                    }`}
                            >
                                {isLoading ? (
                                    <span>Đang xử lý...</span>
                                ) : (
                                    <>
                                        <span>Xác nhận đổi quà</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {giftHistory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
                        onClick={HandleGiftHistory}
                    ></div>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col relative z-10 animate-fade-in-up">
                        <button 
                            onClick={HandleGiftHistory}
                            className="absolute top-4 right-4 p-2 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition-colors z-20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex-1 overflow-y-auto p-8">
                            <UserGiftHistory />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserGiftExchange;