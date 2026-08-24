import { useState, useEffect } from 'react';
import Admin_Header from './Admin_Header'; 
import "../assets/css/Admin_ManageOrder.css";
import axios from 'axios';
import { LoaderCircle, CircleX } from "lucide-react";

const Admin_ManageOrder = () => {
    const [err, setErr] = useState("");
    const [order, setOrd] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const getOrder = async() => {
            const token = localStorage.getItem("token");

            try {
                const res = await axios.get(
                    "https://coffeeshop-api-udqx.onrender.com/manager/view/orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }
                )

                setOrd(res.data);
            }
            catch(error) {
                setErr(error.message);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        getOrder();
    }, []);

    return (
        <div className="min-h-screen bg-stone-100 font-sans">
            <Admin_Header />

            {err ? (
                <main className="max-w-xl mx-auto xl:px-8 py-8">
                    <div className="flex items-center justify-center px-3 py-3 bg-red-300
                    border-red-400 border-2 rounded-lg gap-2">
                        <CircleX className="w-8 h-8 text-red-700"/>
                        <p className="font-semibold">Đã xảy ra lỗi. Vui lòng thử lại</p>
                    </div>
                </main>
            ) : (
                isLoading ? (
                    <main className="max-w-7xl mx-auto xl:px-8 py-8">
                        <div className="flex items-center justify-center py-40">
                            <LoaderCircle className="h-10 w-10 animate-spin text-amber-500"
                            strokeWidth={3.5}/>
                        </div>
                    </main>
                ) : (
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex mb-10">
                            <h2 className="text-4xl font-black text-stone-900 mt-0 tracking-tight">
                            Quản lý đơn hàng</h2>
                        </div>

                        <div className="flex flex-col">
                            {/* Table Headers (Desktop only) */}
                            <div className="hidden md:grid grid-cols-[1fr_4fr_4fr_4fr_4fr_3fr] w-full border-b-2
                            border-b-stone-300 pb-3 px-2 font-semibold text-sm text-stone-700">
                                <div>ID</div>
                                <div>Ngày</div>
                                <div>Tên nhân viên</div>
                                <div>Tên khách hàng</div>
                                <div>Danh sách đơn</div>
                                <div>Tổng tiền</div>
                            </div>

                            {/* Orders list */}
                            <div className="space-y-4 md:space-y-0 mt-4 md:mt-0">
                                {order.map((item, index) => {
                                    return (
                                        <div key={item.id} className="w-full">
                                            {/* Desktop layout */}
                                            <div className={`hidden md:grid grid-cols-[1fr_4fr_4fr_4fr_4fr_3fr] w-full py-3.5 px-2
                                            border-b border-stone-200 items-center text-sm text-stone-700 ${index % 2 === 0 ? "bg-white" : "bg-stone-50/50"}`}>
                                                <div className="font-mono font-bold text-stone-900">#{item.id}</div>
                                                <div>{item.order_time}</div>
                                                <div className="font-semibold">{item.employeeName || "Chưa cập nhật"}</div>
                                                <div className="font-semibold">{item.customerName || "Khách vãng lai"}</div>
                                                <div className="space-y-0.5">
                                                    {item.producList.map(it => (
                                                        <div key={it.productName} className="text-xs text-stone-600">
                                                            {it.productName} <span className="text-stone-400 font-bold">x{it.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="font-bold text-amber-600">{item.total_charge ? item.total_charge.toLocaleString() : "0"} VNĐ</div>
                                            </div>

                                            {/* Mobile Card layout */}
                                            <div className="block md:hidden bg-white rounded-3xl p-5 border border-stone-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md mb-4">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                                                <div className="flex justify-between items-center mb-4 pt-1">
                                                    <span className="bg-stone-100 text-stone-600 px-2.5 py-1 rounded-lg text-xs font-bold font-mono border border-stone-200">
                                                        #{item.id}
                                                    </span>
                                                    <span className="text-base font-black text-amber-600">
                                                        {item.total_charge ? item.total_charge.toLocaleString() : "0"} VNĐ
                                                    </span>
                                                </div>
                                                <div className="space-y-2.5 text-sm">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-stone-400 font-semibold text-xs uppercase tracking-wider">Thời gian</span>
                                                        <span className="text-stone-800 font-medium">{item.order_time}</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 py-2 border-y border-stone-100">
                                                        <div>
                                                            <span className="text-stone-400 block font-semibold text-[10px] uppercase tracking-wider mb-0.5">Nhân viên</span>
                                                            <span className="text-stone-800 font-bold truncate block">{item.employeeName || "Chưa cập nhật"}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-stone-400 block font-semibold text-[10px] uppercase tracking-wider mb-0.5">Khách hàng</span>
                                                            <span className="text-stone-800 font-bold truncate block">{item.customerName || "Khách vãng lai"}</span>
                                                        </div>
                                                    </div>
                                                    <div className="pt-1.5">
                                                        <span className="text-stone-400 font-semibold text-xs uppercase tracking-wider block mb-1.5">Chi tiết sản phẩm</span>
                                                        <div className="bg-stone-50 rounded-xl p-3 border border-stone-100/80 space-y-1.5">
                                                            {item.producList.map(it => (
                                                                <div key={it.productName} className="flex justify-between text-xs text-stone-700 font-medium">
                                                                    <span>{it.productName}</span>
                                                                    <span className="text-stone-400 font-bold">x{it.quantity}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </main>
                )
            )}            
        </div>
    );
};

export default Admin_ManageOrder;
