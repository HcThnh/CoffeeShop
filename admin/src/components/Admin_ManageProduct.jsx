import { useState, useEffect } from 'react';
import Admin_Header from './Admin_Header'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Tag, ALargeSmall } from 'lucide-react';

const Admin_ManageProduct = () => {
    const navigate = useNavigate(); 
    const [prod, setProd] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState("");

    const [filters, setFilters] = useState({
        id: '',
        name: '',
        rating: '',
        description: '',
        price: '',
        discount: '',
    });

    useEffect(() => {
        const getProduct = async() => {
            try {
                setIsLoading(true);
                const res = await axios.get(
                    "https://coffeeshop-api-udqx.onrender.com/public/menu",
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                );
                setProd(res.data);
                setIsLoading(false);
            }
            catch(err) {
                setErr(err.response?.data?.message || err.message || "Đã xảy ra lỗi khi tải danh sách sản phẩm!");
                setIsLoading(false);
            }
        };

        getProduct();
    }, []);

    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        setFilters((prev) => ({ ...prev, [id]: value.toLowerCase() }));
    };

    const filteredProd = prod.filter((product) => {
        const nameMatch = !filters.name || (product.name && product.name.toLowerCase().includes(filters.name));
        const priceMatch = !filters.price || (product.unit_price && product.unit_price.toString().toLowerCase().includes(filters.price));

        return nameMatch && priceMatch;
    });

    const handleEditProductClick = () => {
        navigate("/admin/manage-product/edit");
    };

    return (
        <div className="min-h-screen bg-stone-100 font-sans pb-12">
            <Admin_Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                    <div>
                        <h2 className="text-4xl font-black text-stone-900 mt-0 tracking-tight mt-0">Thực Đơn Đồ Uống</h2>
                    </div>
                    <button 
                        onClick={handleEditProductClick}
                        className="bg-stone-900 hover:bg-black text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-stone-900/20 transition-transform transform hover:-translate-y-1 flex items-center shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Thông tin quà & sản phẩm
                    </button>
                </div>

                {err && (
                    <div className="mb-8 bg-red-50 text-red-600 p-5 rounded-2xl text-sm font-bold border border-red-100 flex items-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {err}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
                    <div className="relative group xl:col-span-2">
                        <ALargeSmall className="absolute top-1/2 -translate-y-1/2 left-3 text-stone-400
                        group-focus-within:text-amber-500"/>
                        <input type="text"
                        id='name'
                        placeholder='Tên sản phẩm...'
                        onChange={handleFilterChange}
                        className="w-full pl-11 pr-4 py-3 rounded-lg border-none bg-white
                        focus:ring-2 focus:ring-amber-500 outline-none
                        font-medium text-stone-700 transition-all
                        placeholder-stone-400 text-sm"/>
                    </div>

                    <div className="relative group">
                        <Tag className="absolute top-1/2 -translate-y-1/2 left-3 text-stone-400
                        group-focus-within:text-amber-500"/>

                        <input type="text" 
                        id="price"
                        placeholder="Đơn giá"
                        onChange={handleFilterChange}
                        className="w-full pl-11 pr-4 py-3 rounded-lg border-none bg-white
                        focus:ring-2 focus:ring-amber-500 outline-none
                        font-medium text-stone-700 transition-all
                        placeholder-stone-400 text-sm"/>
                    </div>
                </div>

                {/* Data Grid */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <svg className="animate-spin h-10 w-10 text-amber-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-stone-500 font-medium">Đang tải danh sách sản phẩm...</p>
                    </div>
                ) : filteredProd.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-stone-200 border-dashed">
                        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-stone-700 mb-1">Không tìm thấy sản phẩm</h3>
                        <p className="text-stone-500">Vui lòng thử điều chỉnh lại bộ lọc tìm kiếm.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProd.map((product, index) => {
                            // Calculate display price
                            const hasDiscount = parseFloat(product.discount) > 0;
                            
                            return (
                                <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative flex flex-col h-full overflow-hidden">
                                    
                                    {/* Decorative Top Border */}
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-amber-600"></div>

                                    {/* Badges Row */}
                                    <div className="flex justify-between items-start mb-4 pt-2">
                                        <div className="bg-stone-100 text-stone-500 px-2.5 py-1 rounded-lg text-xs font-bold font-mono border border-stone-200">
                                            #{product.id}
                                        </div>
                                        {hasDiscount && (
                                            <div className="bg-red-100 text-red-600 px-2.5 py-1 rounded-lg text-xs font-black border border-red-200 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                -{product.discount}%
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Image Placeholder */}
                                    <div className="w-full h-40 bg-stone-50 rounded-2xl mb-5 flex flex-col items-center justify-center border border-stone-100 group-hover:bg-amber-50 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-stone-300 group-hover:text-amber-300 transition-colors mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-black text-stone-800 mb-2 leading-tight line-clamp-2 group-hover:text-amber-700 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-stone-500 mb-4 line-clamp-3 leading-relaxed">
                                            {product.description && product.description !== "#N/A" ? product.description : "Chưa có mô tả cho sản phẩm này."}
                                        </p>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="pt-4 border-t border-stone-100 mt-auto">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-1">Giá bán</p>
                                                <div className="flex items-baseline">
                                                    <span className="text-2xl font-black text-amber-600">
                                                        {product.unit_price ? product.unit_price.toLocaleString() : "0"}
                                                    </span>
                                                    <span className="text-sm font-bold text-amber-600 ml-1">VNĐ</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center bg-stone-50 px-2 py-1.5 rounded-lg border border-stone-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400 mr-1 pb-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-sm font-bold text-stone-700">{product.rating || "N/A"}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Admin_ManageProduct;
