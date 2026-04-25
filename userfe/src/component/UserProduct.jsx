import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import UserFeedBack from './UserFeedBack';

function UserDetailProduct({ toggle, toggleVisibility, response, toggleFeedBack, selectedProduct }) {
    return (
        <>
            {toggle && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
                    onClick={toggleVisibility}
                ></div>
            )}
            
            <div 
                className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${toggle ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Chi tiết sản phẩm</h2>
                    <button 
                        onClick={toggleVisibility}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-md">
                        <img 
                            src={require(`../img/270_crop_Phindi_Cassia_Highlands_products_Image1.jpg`)} 
                            alt={selectedProduct?.name || "Product"} 
                            className="w-full h-64 object-cover"
                        />
                    </div>
                    
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">
                                {selectedProduct?.name || (response[0] ? response[0].productName : "Sản phẩm")}
                            </h3>
                            <p className="text-amber-600 font-bold text-xl">{selectedProduct?.unit_price || "0"} đ</p>
                        </div>
                        <button 
                            onClick={toggleFeedBack}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-colors whitespace-nowrap"
                        >
                            Thêm đánh giá
                        </button>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-lg font-bold text-gray-800">Đánh giá từ khách hàng</h4>
                            <div className="flex items-center bg-amber-50 px-3 py-1 rounded-lg">
                                <span className="text-amber-500 mr-1">&#9733;</span>
                                <span className="font-bold text-amber-700">{localStorage.getItem("rating") || "0"} / 5</span>
                            </div>
                        </div>

                        {response && response.length > 0 ? (
                            <div className="space-y-4">
                                {response.map((item, index) => (
                                    <div key={index} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-amber-200 overflow-hidden mr-3 border-2 border-white shadow-sm">
                                                    <img src={require(`../img/Avatar.png`)} alt="avatar" className="w-full h-full object-cover"/>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 text-sm">{item.customerName}</p>
                                                    <p className="text-xs text-gray-500">{item.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-amber-400 text-sm">
                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <span key={value} className={value <= item.score ? "text-amber-500" : "text-gray-300"}>
                                                        &#9733;
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed bg-white p-3 rounded-xl border border-gray-100">
                                            {item.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p className="text-gray-500 font-medium">Chưa có đánh giá nào cho sản phẩm này.</p>
                                <p className="text-sm text-gray-400 mt-1">Hãy là người đầu tiên đánh giá!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

function UserProduct() {
    const [toggle, settoggle] = useState(false);
    const [showFeedBack, setShowFeedBack] = useState(false);
    const [error, seterror] = useState("");
    const [product, setproduct] = useState([]);
    const [response, setResponse] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const proIdRef = useRef("");

    const toggleDetail = () => {
        settoggle(!toggle);
        setShowFeedBack(false);
    }

    const toggleFeedBack = () => {
        setShowFeedBack(true);
    }

    useEffect(() => {
        const FetchProduct = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    "https://coffeeshop-api-udqx.onrender.com/public/menu",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }
                )
                setproduct(res.data);
            }
            catch(err) {
                seterror(err.message || "Something went wrong!")
            }
        }
        FetchProduct();
    }, [])

    const fetchReview = async(productID) => {
        try {
            const item = await axios.get(
                `https://coffeeshop-api-udqx.onrender.com/public/product/review`,
                {
                    params: {productId: productID},
                    headers: { "Content-Type": "application/json" }
                }
            )
            if (!item.data || (Array.isArray(item.data) && item.data.length === 0)) {
                setResponse([]);
                return;
            }
            setResponse(item.data);
        }
        catch(err) {
            console.error(err);
        }
    }

    const handleProductClick = async(product, productId, prodRate) => {
        setSelectedProduct(product);
        toggleDetail();
        fetchReview(productId);
        localStorage.setItem("rating", prodRate || "0");
        proIdRef.current = productId;
    }

    const bestChoiceProducts = product.slice(0, 4);

    return (
        <div className="bg-gray-50 min-h-screen pb-20 font-sans">
            <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        
                        <div className="lg:w-1/3 space-y-6">
                            <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full font-bold text-sm">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                                </span>
                                <span>Bộ sưu tập đặc biệt</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                                Tinh Hoa <span className="text-amber-600">Cà Phê</span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Khám phá bộ sưu tập cà phê tinh tế của chúng tôi, nơi tôn vinh hương vị đậm đà và nghệ thuật pha chế. Mỗi sản phẩm đều là minh chứng cho chất lượng, phong cách, và sự quyến rũ vượt thời gian.
                            </p>
                            <button className="bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all transform hover:-translate-y-1">
                                Khám phá ngay
                            </button>
                        </div>

                        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                            {bestChoiceProducts.map((item, index) => (
                                <div 
                                    key={index}
                                    onClick={() => handleProductClick(item, item.id, item.rating)}
                                    className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
                                >
                                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200">
                                        <img 
                                            src={require(`../img/270_crop_Phindi_Cassia_Highlands_products_Image1.jpg`)} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                        <h3 className="text-xl font-bold mb-1 truncate">{item.name}</h3>
                                        <p className="text-amber-400 font-bold text-lg">{item.unit_price} đ</p>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Most Popular Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3 relative inline-block">
                        Phổ biến nhất
                        <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-amber-500 rounded-full"></div>
                    </h2>
                    <p className="text-gray-500 text-lg">Khám phá những sản phẩm được yêu thích nhất tại cửa hàng</p>
                </div>

                {error && <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center mb-8">{error}</div>}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {product.map((item, index) => (
                        <div 
                            key={index} 
                            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                            onClick={() => handleProductClick(item, item.id, item.rating)}
                        >
                            <div className="relative aspect-square overflow-hidden bg-gray-100">
                                <img 
                                    src={require(`../img/270_crop_Phindi_Cassia_Highlands_products_Image1.jpg`)} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm flex items-center space-x-1">
                                    <span className="text-amber-500 text-xs">&#9733;</span>
                                    <span className="text-xs font-bold text-gray-700">{item.rating || "5.0"}</span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-gray-800 font-bold text-lg mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                                    {item.name}
                                </h3>
                                <div className="mt-auto flex items-center justify-between">
                                    <p className="text-amber-600 font-extrabold text-lg">
                                        {item.unit_price} <span className="text-sm font-medium text-amber-600/70">đ</span>
                                    </p>
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Overlays */}
            {showFeedBack ? (
                <UserFeedBack toggleVisibility={toggleDetail} response={response} proID={proIdRef.current}/>
            ) : (
                <UserDetailProduct 
                    toggle={toggle} 
                    toggleVisibility={toggleDetail} 
                    response={response}
                    selectedProduct={selectedProduct}
                    toggleFeedBack={toggleFeedBack}
                />
            )}
            
        </div>
    );
}

export default UserProduct;