import './UserGiftHistory.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function UserGiftHistory() {
    const [, setErr] = useState("");
    const [gift, setGift] = useState([]);

    useEffect(() => {

        const fetchGiftHistory = async(e) => {
            const token = localStorage.getItem("token");

            try {
                const res = await axios.get(
                    "https://coffeeshop-api-udqx.onrender.com/customer/gift/exchange/history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }
                )
                setGift(res.data);
                console.log(res.data);
            }
            catch(err) {
                setErr(err.message || "Something went wrong!");
            }
        }
        
        fetchGiftHistory();
    }, [])


    return (
        <>
            <div className="History-fullBox">
                <div className="History-fullBox-center">
                    <p className="History-fullBox-title">
                        Lịch sử đổi quà
                    </p>
                    <ul className="History-ul">
                        {gift.map((item, index) => (
                            <li key={index}
                            className={`History-li 
                            ${index === 0 ? 'History-li1' : ''}
                            ${index === item.length ? 'History-lastli' : ''}`}>
                                <p className="History-li-gift-name">
                                    {item.giftName}
                                </p>
                                <div className="History-li-box">
                                    <p className="History-li-box-p">
                                        Tên khách hàng:
                                    </p>
                                    <p className="History-li-box-name">
                                        {item.customerName}
                                    </p>
                                </div>
                                <div className="History-li-box">
                                    <p className="History-li-box-p">
                                        Ngày thực hiện:
                                    </p>
                                    <p className="History-li-box-date">
                                        {item.date}
                                    </p>
                                    <p className="History-li-box-p">
                                        Số lượng:
                                    </p>
                                    <p className="History-li-box-quantity">
                                        {item.quantity}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default UserGiftHistory;