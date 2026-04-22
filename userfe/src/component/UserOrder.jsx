import './UserOrder.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserOrder() {
    const [order, setOrder] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchOrder = async(e) => {
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
                console.log(res.data);
            }
            catch(err) {
                setErr(err.message || "Something went wrong!")
            }
        }

        fetchOrder();
    }, [])

    const [prodList, setProdList] = useState([]);

    useEffect(() => {
        const combinedProductList = order.reduce((acc, item) => {
            if (item.producList) {
                return [...acc, ...item.producList];
            }
            return acc;
        }, []);
        setProdList(combinedProductList);
    }, [order]);

    return (
        <>
            <div className="userOrder-fullscreen">
                <div className="userOrder-center">
                    <p className="userOrder-title">
                        Đơn hàng
                    </p>
                    {order.map((item, index) => (
                        <div className="userOrder-box" key={index}>
                            <div className="userOrder-leftBox">
                                <ul className="userOrder-leftBox-ul"
                                key={index}>
                                    <li className="userOrder-leftBox-li">
                                        ID: {item.id}
                                    </li>
                                    <li className="userOrder-leftBox-li">
                                        Tổng giá tiền: {item.total_charge}
                                    </li>
                                    <li className="userOrder-leftBox-li">
                                        Thời gian: {item.order_time}
                                    </li>
                                    <li className="userOrder-leftBox-li">
                                        Tên nhân viên: {item.employeeName}
                                    </li>
                                    <li className="userOrder-leftBox-li">
                                        Tên khách hàng: {item.customerName}
                                    </li>
                                </ul>
                            </div>
                            <div className="userOrder-rightBox">
                                {item.producList.map((item, index) => (
                                    <ul className="userOrder-right-ul"
                                    key={index}>
                                        <li className="userOrder-right-li">
                                            <div className="userOrder-right-li-box">
                                                <p className="userOrder-right-li-name">
                                                    Tên: {item.productResponseDto.name}
                                                </p>
                                                <p className="userOrder-right-li-price">
                                                    Số lượng: {item.quantity}
                                                </p>
                                            </div>
                                            <div className="userOrder-right-li-box">
                                                <p className="userOrder-right-li-discount">
                                                    Giảm giá: {item.productResponseDto.discount}
                                                </p>
                                                <p className="userOrder-right-li-rate">
                                                    Đánh giá: {item.productResponseDto.rating}
                                                </p>
                                                <p className="userOrder-right-li-id">
                                                    ID: {item.productResponseDto.id}
                                                </p>
                                            </div>
                                            <p className="userOrder-right-description">
                                                Mô tả: {item.productResponseDto.description}
                                            </p>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default UserOrder;