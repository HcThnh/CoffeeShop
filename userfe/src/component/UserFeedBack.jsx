import { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Star, CircleX, LoaderCircle } from 'lucide-react';

function UserFeedBack({ onClose, product }) {
    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const [selectedRating, setSelectedRating] = useState(5);
    const [err, setErr] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [text, setText] = useState("");
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errReview, setErrReview] = useState("");
    const avg = response.length > 0
        ? (response.reduce((sum, review) => sum + (review.score || 0), 0) / response.length).toFixed(1)
        : (product.rating || 0);

    const fetchReview = async (productID) => {
        setIsLoading(true);

        try {
            const item = await axios.get(
                `https://coffeeshop-api-udqx.onrender.com/public/product/review`,
                {
                    params: { productId: productID },
                    headers: { "Content-Type": "application/json" }
                }
            )
            if (!item.data || (Array.isArray(item.data) && item.data.length === 0)) {
                setResponse([]);
                return;
            }
            setResponse(item.data);
        }
        catch (err) {
            setErrReview(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchReview(product.id);
    }, []);

    const SendFeedBack = async () => {
        const comment = text.trim();
        if (!comment) {
            setErr("Vui lòng nhập nội dung đánh giá!");
            return;
        }

        const token = localStorage.getItem("token");

        setIsSubmitting(true);
        setErr("");

        const cmt = {
            date: getCurrentDate(),
            score: selectedRating,
            comment: comment,
            productId: product.id
        };

        try {
            await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/customer/review/create",
                cmt, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
            );
            fetchReview(product.id);
        } catch (error) {
            setErr(error.response?.data?.message || error.message || "Không thể gửi đánh giá!");
            setIsSubmitting(false);
        }
    }


    return (
        <div className="min-h-screen fixed top-0 left-0 right-0 bg-gray-400/40 z-20
        flex justify-end">
            <div className="w-2/5 bg-white min-h-screen px-6 py-4 flex flex-col gap-4
            animate-slide-in-right">
                <div className="flex justify-end w-full">
                    <X size={32} className='p-1 rounded-full hover:bg-amber-100
                    hover:text-amber-500 transition-colors duration-200 cursor-pointer'
                        onClick={onClose} />
                </div>

                <div className="grid grid-cols-[1fr_4fr] py-4 px-4 gap-4 border-2 border-gray-100 rounded-xl">
                    <div className='overflow-hidden'>
                        <img src="/coffee.jpg" alt="sample-image"
                            className="object-cover" />
                    </div>

                    <div className="flex flex-col justify-start">
                        <div className="flex items-center justify-between">
                            <p className="font-medium text-lg">{product.name}</p>
                            <div className="flex items-center gap-1 bg-amber-100 py-1 px-4 rounded-lg">
                                <p className="font-medium">{avg}</p>
                                <Star size={16} className="fill-yellow-500 stroke-yellow-500" />
                            </div>
                        </div>

                        <p className="text-lg font-semibold">{product.unit_price.toLocaleString("vi-VN")} VNĐ</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-1">
                    <p className="text-sm font-semibold text-stone-700">Đánh giá của bạn:</p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={22}
                                className={`cursor-pointer transition-all duration-150 transform hover:scale-110 ${star <= selectedRating
                                        ? 'fill-amber-400 stroke-amber-500'
                                        : 'stroke-gray-300 hover:stroke-amber-400'
                                    }`}
                                onClick={() => setSelectedRating(star)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col relative">
                    <textarea
                        id="comment"
                        rows={3}
                        maxLength={100}
                        placeholder="Thêm bình luận"
                        className="w-full px-4 pt-3 pb-8 rounded-xl bg-stone-100 focus:outline-none 
                        text-sm text-stone-800"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <p className="text-xs text-gray-500 absolute bottom-3 left-4">
                        Số ký tự còn lại {100 - text.length}</p>

                    <button
                        onClick={SendFeedBack}
                        disabled={isSubmitting}
                        className='bg-amber-200 flex absolute py-1 px-4 rounded-xl
                        bottom-2 right-4 text-sm font-semibold hover:bg-amber-300
                        transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'>
                        {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                    </button>
                </div>
                {err && (
                    <p className="text-red-500 text-xs px-1 font-semibold">{err}</p>
                )}

                <div className="flex flex-col border-t-2 border-gray-200 py-3">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-4">
                            <LoaderCircle size={24} className='animate-spin text-amber-500'
                                strokeWidth={3.5} />
                        </div>
                    ) : errReview ? (
                        <div className="flex flex-col items-center bg-red-300 border-2 border-red-400
                        rounded-lg p-3 mx-auto">
                            <CircleX size={24} className='text-red-700 ' />
                            <p className='font-semibold'>Đã xảy ra lỗi, vui lòng thử lại.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2 items-center">
                                <p className='text-lg font-semibold'>Bình luận</p>
                                <p className="py-0 px-2 rounded-xl bg-amber-200">{response.length}</p>
                            </div>

                            {response.length === 0 ? (
                                <div className="flex flex-1 border-2 border-gray-200 rounded-lg
                                justify-center items-center py-8">
                                    <p className="">
                                        Chưa có bình luận nào, hãy thêm bình luận của bạn.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col max-h-[40vh] overflow-y-auto">
                                    {response.map((item, idx) => {
                                        return (
                                            <div key={item.id.customerId || idx} className="grid grid-cols-[1fr_9fr] py-2 px-2 gap-y-2
                                            grid-rows-2 mb-2">
                                                <div className='flex'>
                                                    <img src="/Avatar.png" alt="avatar"
                                                        className="object-cover w-8 h-8 rounded-full" />
                                                </div>

                                                <div className="flex flex-col justify-center">
                                                    <div className="flex items-center gap-3">
                                                        <p className="font-semibold text-sm">{item.customerName}</p>
                                                        <span className="text-[10px] text-gray-400">{item.date}</span>
                                                    </div>
                                                    <div className="flex gap-0.5 mt-0.5">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                size={11}
                                                                className={
                                                                    star <= (item.score || 5)
                                                                        ? 'fill-amber-400 stroke-amber-500'
                                                                        : 'stroke-gray-300'
                                                                }
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div></div>

                                                <div className="flex items-start">
                                                    <p className='text-stone-700 text-sm'>{item.comment}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserFeedBack;