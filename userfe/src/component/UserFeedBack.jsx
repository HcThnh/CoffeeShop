import './UserFeedBack.css';
import './UserProduct.css';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function UserFeedBack({toggleVisibility, response, proID}) {
    const getCurrentDate = () => {
        const today = new Date(); 
    
        const day = String(today.getDate()).padStart(2, '0'); 
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
    
        return `${year}-${month}-${day}`;
    };

    const FeedBackRef = useRef();
    const [selectedRating, setSelectedRating] = useState(null);

    const handleRatingChange = (event) => {
        setSelectedRating(Number(event.target.value)); 
    };

    const [err, setErr] = useState("");
    const [token, setToken] = useState("");

    const CheckToken = () => {
        const t = localStorage.getItem("token");
        setToken(t);
    }

    useEffect(() => {
        CheckToken();
    })

    const SendFeedBack = async(token) => {
        const comment = FeedBackRef.current.value;
        const score = selectedRating;
        const date = getCurrentDate();
        const productId = proID;

        const cmt = {
            date: date,
            score: score,
            comment: comment,
            productId: productId
        }

        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/customer/review/create",
                cmt, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                },
            )
            console.log(res.data);
        }
        catch(err) {
            setErr(err.message || "Something went wrong!")
        }
    }

    const HandleClick = () => {
        CheckToken();
        SendFeedBack(token);
        toggleVisibility();
    }

    return (
        <>
            <div className="fullScreen">
                <div className="detail-product-middle">
                    <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="detail-product-middle-svg"
                    onClick={toggleVisibility}>
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                    <div className="detail-product-middle-left">
                        <div className="detail-product-middle-left-box">
                            <img src={require(`../img/270_crop_Phindi_Cassia_Highlands_products_Image1.jpg`)} 
                            alt="" className="detail-product-middle-left-img"/>
                            <p className="detail-product-middle-left-name">
                                {response[0] ? response[0].productName : ""}
                            </p>
                        </div>
                    </div>
                    <div className="detail-product-middle-right">
                        <div className="detail-product-middle-right-box">
                            <p className="detail-product-middle-right-evaluate
                            userFeedBack-p">
                                Thêm bình luận
                            </p>
                            <div className="userFB-middle-right-box">
                                <p>Đánh giá</p>
                                <div className="star-rating">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <label key={star} className="star-label">
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={star}
                                                className="star-input"
                                                onChange={handleRatingChange}
                                                checked={selectedRating === star}
                                            />
                                            {star}
                                            <span>&#9733;</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <textarea id="userFB-textarea"
                            rows={12} placeholder='Nhập bình luận của bạn'
                            ref={FeedBackRef}>

                            </textarea>
                            <button className="userFB-button"
                            onClick={() => HandleClick()}>
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserFeedBack;