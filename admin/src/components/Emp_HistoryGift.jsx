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
        <div className="h-screen font-sans bg-stone-100">
            <Emp_Header />

            <main className="flex">
                {isLoading ? (
                <div className="bg-stone-100 flex flex-1 items-center justify-center 
                min-h-[calc(100vh-100px)]">
                    <LoaderCircle className="w-10 h-10 animate-spin text-stone-400" 
                    strokeWidth={3.5}/>
                </div>
                ) : (
                <div className="flex-1">
                    <div className="max-w-7xl mx-auto flex px-4 sm:px-6 lg:px-8 mt-8">
                        <input type="text"
                        placeholder="Nhập tên khách hàng..." 
                        className="lg:w-[300px] px-2 py-2 placeholder:text-sm border
                        border-gray-300 rounded-lg focus:outline-none focus:ring-1
                        focus:ring-amber-300"
                        id="nameCustomer"
                        value={nameCustomer}
                        onChange={(e) => setNameCustomer(e.target.value)} />
                    </div>

                    <div className="max-w-7xl mx-auto flex px-4 sm:px-6 lg:px-8 pb-8 overflow-auto">
                        <div className="flex flex-col w-full mt-4">
                            <div className="grid xl:grid-cols-[2fr_2fr_1fr_2fr] items-center
                            bg-gray-200 px-4 gap-2">
                                <div className="text-black font-semibold py-3">
                                    Tên khách hàng
                                </div>
                                <div className="text-black font-semibold py-3">Ngày</div>
                                <div className="text-black font-semibold py-3">Số lượng</div>
                                <div className="text-black font-semibold py-3">Tên quà</div>
                            </div>

                            {filter.map((item, index) => {
                                return (
                                    <div className={`grid xl:grid-cols-[2fr_2fr_1fr_2fr] items-center
                                    px-4 gap-2 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                                    key={index}>
                                        <div className="py-3 text-black">
                                            {item.customerName}</div>
                                        <div className="py-3 text-black">
                                            {item.date}</div>
                                        <div className="py-3 text-black">
                                            {item.quantity}</div>
                                        <div className="py-3 text-black">
                                            {item.giftName}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                )}
            </main>
        </div>
    );
};

export default Emp_HistoryGift;
