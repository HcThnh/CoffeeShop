import React, { useState, useEffect, useRef } from 'react';
import Admin_Header from './Admin_Header'; 
import "../assets/css/Admin_Revenue.css"; 
import axios from 'axios';

const Admin_Revenue = () => {
    const [filters, setFilters] = useState({
        productId: '',
        productName: '',
        price: '',
        quantity: '',
        total: ''
    });
    const [revenueData, setRevenueData] = useState([
        { id: "0001", name: "Trà sen vàng", price: 45000, quantity: 250, total: 11250000 },
        { id: "0002", name: "Phindi Choco", price: 50000, quantity: 200, total: 10000000 },
        { id: "0003", name: "Phindi Cafe", price: 47000, quantity: 300, total: 14100000 },
    ]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    // Tính tổng doanh thu
    useEffect(() => {
        const total = revenueData.reduce((sum, item) => sum + item.total, 0);
        setTotalRevenue(total);
    }, [revenueData]);

    // Sắp xếp theo các tiêu chí
    const handleSort = (column, type = 'string') => {
        const sortedData = [...revenueData];
        sortedData.sort((a, b) => {
            if (type === 'string') {
                return a[column].localeCompare(b[column]);
            }
            return a[column] - b[column];
        });

        setRevenueData(sortedData);
    };

    // Lọc và sắp xếp dữ liệu
    const filteredData = revenueData.filter((item) => {
        return (
            (!filters.productId || item.id.toString().includes(filters.productId)) &&
            (!filters.productName || item.name.toLowerCase().includes(filters.productName)) &&
            (!filters.price || item.price.toString().includes(filters.price)) &&
            (!filters.quantity || item.quantity.toString().includes(filters.quantity)) &&
            (!filters.total || item.total.toString().includes(filters.total))
        );
    });

    const dateRef = useRef("");
    const [err, setErr] = useState("");
    const [income, setIncome] = useState(""); 

    const CalIncome = async (e) => {
        const token = localStorage.getItem("token");

        if (!dateRef || !dateRef.current || !dateRef.current.value) {
            alert("Vui lòng chọn tháng và năm!");
            return;
        }
    
        const dateValue = dateRef.current.value;
        const [year, month] = dateValue.split("-").map(Number); 

        try {
            const res = await axios.get(
                "https://coffeeshop-api-udqx.onrender.com/manager/income",
                {
                    params: { year, month }, // Truyền params đúng cách
                    headers: {
                        Authorization: `Bearer ${token}`, // Sửa đúng header
                        "Content-Type": "application/json",
                    },
                }
            );
            setIncome(res.data); // Lưu kết quả vào state
        } catch (err) {
            setErr(err.message); // Xử lý lỗi
        }
    };

    return (
        <div>
            {/* Header */}
            <Admin_Header />

            {/* Nội dung chính */}
            <h2 className="revenue-title">BÁO CÁO DOANH THU HÀNG THÁNG</h2>

            {/* Tổng Doanh thu */}
            <div className="revenue-summary">
                <div className="left-summary">
                    <input
                        type="month"
                        className="revenue-input"
                        placeholder="Chọn tháng và năm"
                        ref={dateRef}
                    />
                </div>
                <div className="right-summary">
                    
                    <strong className="total-revenue">{income} VNĐ</strong>
                </div>
            </div>
            <button className="income-button" onClick={CalIncome}>
                Tính lợi nhuận
            </button>

            {/* Bảng doanh thu */}
            {/* <div className="revenue-table-container">
                <table id="revenue-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('id', 'number')}>ID sản phẩm</th>
                            <th onClick={() => handleSort('name', 'string')}>Tên sản phẩm</th>
                            <th onClick={() => handleSort('price', 'number')}>Đơn giá</th>
                            <th onClick={() => handleSort('quantity', 'number')}>Số lượng</th>
                            <th onClick={() => handleSort('total', 'number')}>Tổng</th>
                        </tr>
                    </thead>
                    <tbody id="revenue-data">
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price.toLocaleString('vi-VN')} đ</td>
                                <td>{item.quantity}</td>
                                <td>{item.total.toLocaleString('vi-VN')} đ</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    );
};

export default Admin_Revenue;
