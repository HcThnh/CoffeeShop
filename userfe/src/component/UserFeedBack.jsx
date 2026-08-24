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
        <div className="min-h-screen fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex justify-end">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div className="relative w-full sm:w-[500px] md:w-[600px] lg:w-[500px] xl:w-[600px] bg-white h-screen px-4 sm:px-6 py-6 flex flex-col gap-4 shadow-2xl overflow-y-auto animate-slide-in-right z-10 font-sans">
                <div className="flex justify-between items-center w-full pb-2 border-b border-gray-100">
                    <h3 className="text-xl font-extrabold text-stone-850">Đánh giá sản phẩm</h3>
                    <X size={32} className='p-1.5 rounded-full hover:bg-red-50 hover:text-red-500 text-stone-500 transition-colors duration-200 cursor-pointer'
                        onClick={onClose} />
                </div>

                <div className="flex items-center gap-4 py-4 px-4 border-2 border-gray-100 rounded-2xl bg-stone-50/50">
                    <div className='w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-200'>
                        <img src="/coffee.jpg" alt="sample-image"
                            className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <p className="font-bold text-stone-800 text-base truncate">{product.name}</p>
                            <div className="flex items-center gap-1 bg-amber-100 py-0.5 px-2.5 rounded-lg shrink-0 text-amber-700 font-extrabold text-sm">
                                <p className="font-medium">{avg}</p>
                                <Star size={12} className="fill-yellow-500 stroke-yellow-500" />
                            </div>
                        </div>

                        <p className="text-base font-extrabold text-amber-600 mt-1">{product.unit_price.toLocaleString("vi-VN")} VNĐ</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-1">
                    <p className="text-sm font-bold text-stone-700">Đánh giá của bạn:</p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={24}
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
                        placeholder="Chia sẻ cảm nghĩ của bạn về món đồ uống này..."
                        className="w-full px-4 pt-3 pb-12 rounded-xl bg-stone-100 focus:bg-stone-50 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all text-sm text-stone-800 border border-transparent focus:border-amber-500"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <div className="flex justify-between items-center absolute bottom-2 left-4 right-4">
                        <p className="text-[10px] font-bold text-stone-400">
                            Còn lại {100 - text.length} ký tự
                        </p>

                        <button
                            onClick={SendFeedBack}
                            disabled={isSubmitting}
                            className='bg-amber-600 text-white py-1.5 px-4 rounded-lg text-xs font-bold hover:bg-amber-700 shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
                            {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                        </button>
                    </div>
                </div>
                {err && (
                    <p className="text-red-500 text-xs px-1 font-semibold">{err}</p>
                )}

                <div className="flex flex-col border-t border-gray-200 py-4 flex-1 min-h-0">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <LoaderCircle size={32} className='animate-spin text-amber-500'
                                strokeWidth={3.5} />
                        </div>
                    ) : errReview ? (
                        <div className="flex flex-col items-center bg-red-50 border border-red-200
                        rounded-xl p-4 text-center">
                            <CircleX size={28} className='text-red-600 mb-2' />
                            <p className='font-bold text-red-700 text-sm'>Đã xảy ra lỗi khi tải bình luận.</p>
                            <p className='text-xs text-red-500 mt-1'>Vui lòng thử lại sau.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 h-full min-h-0">
                            <div className="flex gap-2 items-center mb-1">
                                <p className='text-lg font-extrabold text-stone-800'>Bình luận</p>
                                <p className="py-0.5 px-2.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">{response.length}</p>
                            </div>

                            {response.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-stone-200 rounded-2xl bg-stone-50/30">
                                    <p className="text-stone-400 italic text-sm text-center">
                                        Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nhận!
                                    </p>
                                </div>
                            ) : (
                                <div className="flex-1 overflow-y-auto pr-1 space-y-4 divide-y divide-stone-100">
                                    {response.map((item, idx) => {
                                        return (
                                            <div key={item.id?.customerId || idx} className="flex gap-3 pt-4 first:pt-0">
                                                <img src="/Avatar.png" alt="avatar"
                                                    className="object-cover w-8 h-8 rounded-full border border-stone-200 shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-bold text-stone-800 text-sm truncate">{item.customerName}</p>
                                                        <span className="text-[10px] text-stone-400 font-medium">{item.date}</span>
                                                    </div>
                                                    <div className="flex gap-0.5 mt-0.5">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                size={10}
                                                                className={
                                                                    star <= (item.score || 5)
                                                                        ? 'fill-amber-400 stroke-amber-500'
                                                                        : 'stroke-gray-300'
                                                                }
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className='text-stone-600 text-sm mt-2 leading-relaxed whitespace-pre-wrap break-words'>{item.comment}</p>
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