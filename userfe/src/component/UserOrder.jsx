import { useState, useEffect } from 'react';
import axios from 'axios';

function UserOrder({ onClose }) {
    const [order, setOrder] = useState([]);
    const [err, setErr] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchOrder = async () => {
            try {
                const res = await axios.get(
                    "https://coffeeshop-api-udqx.onrender.com/customer/order/view",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }
                )
                setOrder(res.data);
            } catch (error) {
                setErr(error.response?.data?.message || error.message || "Không thể tải danh sách đơn hàng!");
            } finally {
                setIsLoading(false);
            }
        }

        fetchOrder();
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            
            {/* Modal Box */}
            <div className="bg-stone-50 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative z-10 animate-fade-in-up font-sans">
                
                {/* Header */}
                <div className="bg-white px-8 py-5 border-b border-stone-100 flex justify-between items-center sticky top-0 z-20 shadow-sm">
                    <h2 className="text-2xl font-extrabold text-stone-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Lịch sử đơn hàng
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 bg-stone-100 hover:bg-red-50 text-stone-500 hover:text-red-500 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                        </div>
                    ) : err ? (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium border border-red-100 flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {err}
                        </div>
                    ) : order.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 border-dashed">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <p className="text-stone-500 font-medium text-lg">Bạn chưa có đơn hàng nào.</p>
                            <p className="text-stone-400 mt-1">Hãy đặt ngay cho mình một ly cà phê nhé!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {order.map((item, index) => (
                                <div key={index} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                    {/* Order Summary Header */}
                                    <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex flex-wrap justify-between items-center gap-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                            <div className="bg-white px-3 py-1 rounded-lg border border-stone-200 shadow-sm text-sm inline-flex">
                                                <span className="text-stone-500 mr-1">Mã ĐH: </span>
                                                <span className="font-bold text-stone-800">#{item.id}</span>
                                            </div>
                                            <div className="text-sm font-medium text-stone-500 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {item.order_time}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-0.5">Tổng tiền</p>
                                            <p className="text-xl font-black text-amber-600">{item.total_charge} đ</p>
                                        </div>
                                    </div>

                                    {/* Order Details */}
                                    <div className="p-6">
                                        <div className="mb-5 flex flex-wrap gap-x-8 gap-y-2 pb-4 border-b border-stone-100 border-dashed">
                                            <div className="flex items-center text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span className="font-medium text-stone-500 mr-1">Người mua:</span> 
                                                <span className="font-bold text-stone-800">{item.customerName}</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="font-medium text-stone-500 mr-1">Nhân viên chốt đơn:</span> 
                                                <span className="font-bold text-stone-800">{item.employeeName}</span>
                                            </div>
                                        </div>

                                        <h4 className="font-bold text-stone-800 mb-3 text-xs uppercase tracking-wider text-stone-500">Chi tiết sản phẩm</h4>
                                        <div className="space-y-3">
                                            {item.producList?.map((prod, prodIndex) => (
                                                <div key={prodIndex} className="flex justify-between items-center p-3 hover:bg-stone-50 rounded-xl transition-colors border border-transparent hover:border-stone-200 group">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-lg font-bold text-amber-600 shrink-0 border border-stone-200 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
                                                            x{prod.quantity}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-stone-800 text-base">{prod.productResponseDto?.name}</p>
                                                            <p className="text-sm text-stone-500 mt-0.5 line-clamp-1">{prod.productResponseDto?.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right shrink-0 ml-4 flex flex-col items-end">
                                                        {prod.productResponseDto?.discount > 0 && (
                                                            <span className="text-xs text-red-600 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full font-bold mb-1">
                                                                Giảm {prod.productResponseDto.discount}%
                                                            </span>
                                                        )}
                                                        <div className="flex items-center space-x-1 mt-1">
                                                            <span className="text-amber-500 text-xs">&#9733;</span>
                                                            <span className="text-xs font-bold text-stone-500">{prod.productResponseDto?.rating || "5.0"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserOrder;