import { useState, useEffect } from 'react';
import axios from 'axios';
import UserGiftHistory from './UserGiftHistory';
import HeaderHomePage from './UserHeaderHP';
import { Tag } from 'lucide-react';
import FooterPage from './UserFooter';

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
            console.log(res.data);

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
        <div className="min-h-screen bg-stone-50 font-sans">
            <HeaderHomePage/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-6 mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-8">
                    
                    {/* Left Column: Point Info & Actions */}
                    <div className="flex flex-col gap-6">
                        {/* Point Card */}
                        <div className="flex items-center p-5 border border-stone-200 bg-white
                        rounded-2xl gap-4 justify-between shadow-sm relative overflow-hidden group">
                            <div className="absolute -right-6 -top-6 w-20 h-20 bg-amber-100/40 rounded-full mix-blend-multiply opacity-70 transition-transform group-hover:scale-110"></div>
                            
                            <div className="flex items-center gap-3 relative z-5">
                                <img src="/Avatar.png" alt="avatar" className="w-10 h-10 rounded-full border border-stone-100 object-cover" />
                                <div>
                                    <p className="text-xs text-stone-500">Tài khoản</p>
                                    <p className="font-semibold text-stone-850 text-sm">Điểm tích lũy</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-1.5 bg-amber-100 text-amber-700 py-1.5 px-3.5 rounded-xl font-bold relative z-10">
                                <span className="text-lg">{point}</span>
                                <span className="text-xs uppercase">Điểm</span>
                            </div>
                        </div>

                        <div className="flex flex-col border border-stone-200 rounded-2xl p-5 gap-5 bg-white shadow-sm">
                            <div>
                                <h3 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">Đổi quà tặng</h3>
                                {selectedId ? (
                                    (() => {
                                        const selectedGift = gift.find(g => g.id === selectedId);
                                        if (!selectedGift) return null;
                                        return (
                                            <div className="p-4 bg-amber-50/50 border border-amber-200/50 rounded-xl">
                                                <p className="font-bold text-amber-900 text-sm">{selectedGift.name}</p>
                                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-amber-200/30">
                                                    <span className="text-xs text-stone-500">Yêu cầu điểm:</span>
                                                    <span className="text-sm text-amber-700 font-extrabold">{selectedGift.point} điểm</span>
                                                </div>
                                            </div>
                                        );
                                    })()
                                ) : (
                                    <div className="py-6 text-center border-2 border-dashed border-stone-200 rounded-xl">
                                        <p className="text-xs text-stone-400 italic">Vui lòng chọn quà từ danh sách</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                {err && (
                                    <div className="text-red-600 text-xs text-center font-medium bg-red-50 py-2 px-3 rounded-lg border border-red-100">
                                        {err}
                                    </div>
                                )}
                                {successMsg && (
                                    <div className="text-green-600 text-xs text-center font-medium bg-green-50 py-2 px-3 rounded-lg border border-green-100">
                                        {successMsg}
                                    </div>
                                )}
                                <button
                                    onClick={SendGift}
                                    disabled={isLoading || !selectedId}
                                    className="w-full py-3 rounded-xl bg-amber-600 text-white hover:bg-amber-700 text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none"
                                >
                                    {isLoading ? "Đang xử lý..." : "Xác nhận đổi quà"}
                                </button>
                                <button
                                    onClick={HandleGiftHistory}
                                    className="w-full py-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-850 text-sm font-semibold transition-all"
                                >
                                    Lịch sử đổi quà
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col py-2 max-h-[80vh]">
                        <h2 className="text-2xl font-black text-stone-800 pb-3 border-b-2 border-stone-200/80 mb-6 flex justify-between items-center">
                            <span>Bộ sưu tập quà tặng</span>
                            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                                {gift.length} lựa chọn
                            </span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 pb-6 scrollbar-thin">
                            {gift.map(item => (
                                <div 
                                    key={item.id}
                                    onClick={() => setSelectedId(item.id)}
                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                                        selectedId === item.id 
                                            ? 'border-amber-500 bg-amber-50/40 shadow-sm' 
                                            : 'border-stone-150 bg-white hover:border-amber-250 hover:bg-stone-50/50 hover:shadow-sm'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl transition-colors duration-200 ${
                                            selectedId === item.id ? 'bg-amber-100 text-amber-600' : 'bg-stone-100 text-stone-500'
                                        }`}>
                                            <Tag size={20} className={selectedId === item.id ? 'stroke-[2.5px]' : ''} />
                                        </div>
                                        <div>
                                            <h4 className={`text-base font-bold transition-colors ${selectedId === item.id ? 'text-amber-900' : 'text-stone-800'}`}>
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-stone-500 mt-0.5">Món quà từ Coffee Shop</p>
                                        </div>
                                    </div>
                                    <div className="shrink-0 flex items-center gap-1 bg-amber-50 border border-amber-200/50 px-3 py-1.5 rounded-xl">
                                        <span className="font-extrabold text-amber-600 text-sm">{item.point}</span>
                                        <span className="text-[10px] font-bold text-stone-500 uppercase">Điểm</span>
                                    </div>
                                </div>
                            ))}
                            
                            {gift.length === 0 && (
                                <div className="col-span-full text-center py-16 bg-white border border-stone-200 rounded-3xl">
                                    <p className="text-stone-400 italic">Đang tải danh sách quà tặng...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <FooterPage/>

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