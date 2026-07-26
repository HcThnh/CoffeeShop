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
                            <div className="grid grid-cols-[1fr_4fr_4fr_4fr_4fr_3fr] w-full border-b-2
                            border-b-stone-300 pb-3 px-2 font-semibold">
                                <div className="text-gray-700">
                                    ID
                                </div>
                                <div className="text-gray-700">
                                    Ngày
                                </div>
                                <div className="text-gray-700">
                                    Tên nhân viên
                                </div>
                                <div className="text-gray-700">
                                    Tên khách hàng
                                </div>
                                <div className="text-gray-700">
                                    Danh sách đơn
                                </div>
                                <div className="text-gray-700">
                                    Tổng tiền
                                </div>
                            </div>
                            {order.map((item, index) => {
                                return (
                                    <div key={item.id} 
                                    className={`grid grid-cols-[1fr_4fr_4fr_4fr_4fr_3fr] w-full py-3 px-2
                                    border-b-2 border-b-stone-300 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                        <div>{item.id}</div>
                                        <div>{item.order_time}</div>
                                        <div>{item.employeeName}</div>
                                        <div>{item.customerName}</div>
                                        <div>
                                            {item.producList.map(it => {
                                                return (
                                                    <div key={it.productName}>{it.productName} x {it.quantity}
                                                    </div>)})}
                                        </div>
                                        <div>{item.total_charge}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </main>
                )
            )}            
        </div>
    );
};

export default Admin_ManageOrder;
