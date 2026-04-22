import React, { useState, useEffect } from 'react';
import Admin_Header from './Admin_Header'; 
import "../assets/css/Admin_ManageOrder.css";
import axios from 'axios';

const Admin_ManageOrder = () => {
    const [orderData, setOrderData] = useState([]);
    const [filters, setFilters] = useState({
        id: '',
        date: '',
        employee: '',
        customer: '',
        orderList: '',
        total: '',
        payment: '',
    });

    const [sortOrder, setSortOrder] = useState(1); // 1: ASC, -1: DESC

    const [err, setErr] = useState("");
    const [order, setOrd] = useState([]);

    // Giả lập API lấy dữ liệu đơn hàng
    useEffect(() => {
        const getOrder = async(e) => {
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
                // console.log(res.data);
            }
            catch(err) {
                setErr(err.message);
            }
        }


        getOrder();
    }, []);

    // Lọc dữ liệu
    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        setFilters((prev) => ({ ...prev, [id]: value.toLowerCase() }));
    };

    const filteredData = orderData.filter((order) => {
        return (
            (!filters.id || order.id.toLowerCase().includes(filters.id)) &&
            (!filters.date || order.date.toLowerCase().includes(filters.date)) &&
            (!filters.employee || order.employee.toLowerCase().includes(filters.employee)) &&
            (!filters.customer || order.customer.toLowerCase().includes(filters.customer)) &&
            (!filters.orderList || order.orderList.toLowerCase().includes(filters.orderList)) &&
            (!filters.total || order.total.toLowerCase().includes(filters.total)) &&
            (!filters.payment || order.payment.toLowerCase().includes(filters.payment))
        );
    });

    // Sắp xếp tổng tiền
    const sortTotal = () => {
        const sorted = [...orderData].sort((a, b) => {
            const totalA = parseFloat(a.total.replace(' VNĐ', '').replace('.', ''));
            const totalB = parseFloat(b.total.replace(' VNĐ', '').replace('.', ''));
            return sortOrder * (totalA - totalB);
        });
        setOrderData(sorted);
        setSortOrder(-sortOrder);
    };

    return (
        <div>
            {/* Header */}
            <Admin_Header />

            {/* Nội dung chính */}
            <h2 className="order-title">QUẢN LÝ ĐƠN HÀNG</h2>

            {/* Bảng đơn hàng */}
            <div className="order-table-container">
                <table id="order-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ngày</th>
                            <th>Tên nhân viên</th>
                            <th>Tên khách hàng</th>
                            <th className='order-list'>Danh sách đơn</th>
                            <th>
                                Tổng tiền
                                <span className="sort-icon">
                                    <i className="fa fa-sort"></i>
                                </span>
                            </th>
                            {/* <th>Phương thức thanh toán</th> */}
                        </tr>
                    </thead>
                    <tbody className="filter-row">
                        <tr>
                            <td><input type="text" id="id" className="filter-input" placeholder="Lọc theo ID" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="date" className="filter-input" placeholder="Lọc theo ngày" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="employee" className="filter-input" placeholder="Lọc theo nhân viên" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="customer" className="filter-input" placeholder="Lọc theo khách hàng" onChange={handleFilterChange} /></td>
                            <td className='order-list'><input type="text" id="orderList" className="filter-input" placeholder="Lọc theo danh sách đơn" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="total" className="filter-input" placeholder="Lọc theo tổng tiền" onChange={handleFilterChange} /></td>
                            {/* <td><input type="text" id="payment" className="filter-input" placeholder="Lọc theo phương thức thanh toán" onChange={handleFilterChange} /></td> */}
                        </tr>
                    </tbody>
                    <tbody id="order-data">
                        {order.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.order_time}</td>
                                <td>{item.employeeName}</td>
                                <td>{item.customerName}</td>
                                <td className='order-list'>
                                    {item.producList.map((it, idx) => (
                                        <div key={idx} className='order-list-box'>
                                            Tên sản phẩm: {it.productName ? it.productName : "NULL"};  
                                            số lượng: {it.quantity ? it.quantity : "NULL"}
                                            {/* {it.productResponseDto.unit_price ? it.productResponseDto.unit_price : "NULL"}, 
                                            {it.productResponseDto.discount ? it.productResponseDto.discount : 'NULL'}, 
                                            {it.productResponseDto.rating ? it.productResponseDto.rating : "NULL"}, 
                                            {it.productResponseDto.description ? it.productResponseDto.description : "NULL"}, 
                                            {it.productResponseDto.id ? it.productResponseDto.id : "NULL"}  */}
                                        </div>
                                    ))}
                                </td>
                                <td>{item.total_charge}</td>
                                {/* <td>{order.payment}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin_ManageOrder;
