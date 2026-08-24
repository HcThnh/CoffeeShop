import { useEffect, useState, useMemo } from "react";
import Emp_Header from "./Emp_Header"; 
import "../assets/css/Emp_HistoryGift.css"; 
import axios from "axios";
import { LoaderCircle } from "lucide-react";

const Emp_HistoryGift = () => {
    const [exchange, setExchange] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [nameCustomer, setNameCustomer] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoading(true);

        const getExchange = async() => {
            try {
                const res = await axios.get(
                    "https://coffeeshop-api-udqx.onrender.com/employee/view/exchange",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }
                )
                setExchange(res.data);
                console.log(res.data);
            }
            catch(err) {
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        getExchange();
    }, []);

    const filter = useMemo(() => {
        const searchName = nameCustomer.toLowerCase().trim();

        return exchange.filter((ex => {
            return (ex?.customerName ?? "").toLowerCase().includes(searchName);
        }));
    }, [nameCustomer, exchange]);

    return (
        <div className="min-h-screen font-sans bg-stone-100">
            <Emp_Header />

            <main className="flex">
                {isLoading ? (
                <div className="bg-stone-100 flex flex-1 items-center justify-center 
                min-h-[calc(100vh-100px)]">
                    <LoaderCircle className="w-10 h-10 animate-spin text-stone-500" 
                    strokeWidth={3.5}/>
                </div>
                ) : (
                <div className="flex-1 pb-10">
                    <div className="max-w-7xl mx-auto flex px-4 sm:px-6 lg:px-8 mt-8">
                        <input type="text"
                        placeholder="Nhập tên khách hàng..." 
                        className="w-full sm:w-[300px] px-4 py-2.5 placeholder:text-sm border
                        border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium text-stone-700 bg-white transition-all duration-200"
                        id="nameCustomer"
                        value={nameCustomer}
                        onChange={(e) => setNameCustomer(e.target.value)} />
                    </div>

                    <div className="max-w-7xl mx-auto flex px-4 sm:px-6 lg:px-8 pb-8">
                        <div className="flex flex-col w-full mt-6">
                            {/* Table Header (Desktop/Tablet only) */}
                            <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_2fr] items-center bg-stone-200 px-6 py-3.5 gap-4 rounded-t-2xl font-bold text-sm text-stone-700">
                                <div>Tên khách hàng</div>
                                <div>Ngày đổi</div>
                                <div>Số lượng</div>
                                <div>Tên quà</div>
                            </div>

                            {/* Table Body (Desktop/Tablet) & Card List (Mobile) */}
                            <div className="space-y-4 md:space-y-0">
                                {filter.map((item, index) => {
                                    return (
                                        <div key={index} className="w-full">
                                            {/* Desktop/Tablet row layout */}
                                            <div className={`hidden md:grid grid-cols-[2fr_2fr_1fr_2fr] items-center px-6 py-3.5 gap-4 border-b border-stone-200 text-sm text-stone-700 font-medium ${index % 2 === 0 ? "bg-white" : "bg-stone-50/50"} ${index === filter.length - 1 ? "rounded-b-2xl border-b-0" : ""}`}>
                                                <div className="font-bold text-stone-900">{item.customerName || "Khách hàng"}</div>
                                                <div>{item.date}</div>
                                                <div className="font-semibold text-stone-500">{item.quantity}</div>
                                                <div className="font-semibold text-amber-600">{item.giftName}</div>
                                            </div>

                                            {/* Mobile Card layout */}
                                            <div className="block md:hidden bg-white rounded-3xl p-5 border border-stone-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-sm font-bold text-stone-800">
                                                        {item.customerName || "Khách hàng"}
                                                    </span>
                                                    <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-200/50">
                                                        {item.giftName}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-stone-100 text-stone-500 font-semibold">
                                                    <div>
                                                        <span className="text-stone-400 block text-[10px] uppercase tracking-wider mb-0.5">Ngày đổi</span>
                                                        <span className="text-stone-850 font-medium text-sm">{item.date}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-stone-400 block text-[10px] uppercase tracking-wider mb-0.5">Số lượng</span>
                                                        <span className="text-stone-850 font-medium text-sm">{item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </main>
        </div>
    );
};

export default Emp_HistoryGift;
