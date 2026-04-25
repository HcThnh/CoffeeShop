import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function UserFeedBack({toggleVisibility, response, proID, selectedProduct}) {
    const getCurrentDate = () => {
        const today = new Date(); 
        const day = String(today.getDate()).padStart(2, '0'); 
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const FeedBackRef = useRef();
    const [selectedRating, setSelectedRating] = useState(5);
    const [err, setErr] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem("token") || "");
    }, []);

    const SendFeedBack = async () => {
        const comment = FeedBackRef.current?.value.trim();
        if (!comment) {
            setErr("Vui lòng nhập nội dung đánh giá!");
            return;
        }

        setIsSubmitting(true);
        setErr("");

        const cmt = {
            date: getCurrentDate(),
            score: selectedRating,
            comment: comment,
            productId: proID
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
            toggleVisibility(); // Đóng form sau khi thành công
        } catch(error) {
            setErr(error.response?.data?.message || error.message || "Không thể gửi đánh giá!");
            setIsSubmitting(false);
        }
    }

    // Lấy tên sản phẩm từ selectedProduct (truyền từ UserProduct.jsx) 
    // hoặc lấy fallback từ response (nếu có review cũ)
    const productName = selectedProduct?.name || (response && response[0] ? response[0].productName : "Sản phẩm");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Blur Overlay */}
            <div 
                className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" 
                onClick={toggleVisibility}
            ></div>
            
            {/* Modal Container */}
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row relative z-10 font-sans transform transition-all scale-100 opacity-100">
                
                {/* Left Side: Product Info (Avatar & Name) */}
                <div className="bg-stone-50 w-full md:w-2/5 p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-stone-100">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-4 border-white mb-4">
                        <img 
                            src={require(`../img/270_crop_Phindi_Cassia_Highlands_products_Image1.jpg`)} 
                            alt={productName} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-stone-800 text-center leading-snug">{productName}</h3>
                    <p className="text-sm text-stone-500 mt-2 text-center px-4">Chúng tôi luôn trân trọng mọi ý kiến đóng góp của bạn.</p>
                </div>

                {/* Right Side: Feedback Form */}
                <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col relative">
                    {/* Close Button */}
                    <button 
                        onClick={toggleVisibility}
                        className="absolute top-4 right-4 p-2 bg-stone-50 hover:bg-red-50 text-stone-400 hover:text-red-500 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h2 className="text-2xl font-extrabold text-stone-800 mb-6 mt-2 md:mt-0">Đánh giá sản phẩm</h2>
                    
                    {/* Error Banner */}
                    {err && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100 mb-4 flex items-start animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {err}
                        </div>
                    )}

                    {/* Star Rating System */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-stone-700 mb-2">Bạn chấm mấy điểm?</label>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setSelectedRating(star)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all transform hover:scale-110 ${
                                        selectedRating >= star 
                                            ? 'bg-amber-100 text-amber-500 shadow-sm border border-amber-200' 
                                            : 'bg-stone-100 text-stone-300 hover:bg-stone-200'
                                    }`}
                                >
                                    &#9733;
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Text Area */}
                    <div className="flex-1 mb-6 flex flex-col">
                        <label htmlFor="comment" className="block text-sm font-bold text-stone-700 mb-2">Chia sẻ trải nghiệm của bạn</label>
                        <textarea 
                            id="comment"
                            ref={FeedBackRef}
                            className="w-full flex-1 min-h-[120px] px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-stone-50 focus:bg-white text-stone-800 resize-none"
                            placeholder="Sản phẩm này tuyệt vời như thế nào?..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button 
                        onClick={SendFeedBack}
                        disabled={isSubmitting}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(217,119,6,0.39)] hover:shadow-[0_6px_20px_rgba(217,119,6,0.23)] transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {isSubmitting ? (
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Gửi đánh giá"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserFeedBack;