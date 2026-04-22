import React, { useEffect, useState } from "react";
import Emp_Header from "./Emp_Header"; 
import "../assets/css/Emp_HistoryGift.css"; 
import axios from "axios";

const Emp_HistoryGift = () => {
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        // Giả lập dữ liệu API
        const mockData = [
            { customerId: "031224", invoiceId: "0120", date: "15:00 - 03/12/2024", pointsUsed: 50, voucher: "Voucher 5%" },
            { customerId: "031225", invoiceId: "0121", date: "16:00 - 03/12/2024", pointsUsed: 100, voucher: "Voucher 10%" },
            { customerId: "031226", invoiceId: "0122", date: "17:00 - 03/12/2024", pointsUsed: 150, voucher: "Voucher 15%" },
            { customerId: "031227", invoiceId: "0123", date: "18:00 - 03/12/2024", pointsUsed: 200, voucher: "Voucher 20%" },
        ];
        setTimeout(() => setHistoryData(mockData), 500); // Giả lập delay API
    }, []);

    const [err, setErr] = useState("");
    const [exchange, setExchange] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const getExchange = async(e) => {
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
            }
        }
        getExchange();
    }, [])

    return (
        <div>
            <Emp_Header /> {/* Header */}
            <main className="emp-historygift-main-content">
                <h2>LỊCH SỬ ĐỔI QUÀ CỦA KHÁCH HÀNG</h2>
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Tên khách hàng</th>
                            <th>Ngày</th>
                            <th>Số lượng</th>
                            <th>Tên quà</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exchange.map((item, index) => (
                            <tr key={index}>
                                <td>{item.customerName}</td>
                                <td>{item.date}</td>
                                <td>{item.quantity}</td>
                                <td>{item.giftName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Emp_HistoryGift;
