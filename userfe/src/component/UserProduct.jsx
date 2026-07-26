import { useEffect, useState } from 'react';
import axios from 'axios';
import UserFeedBack from './UserFeedBack';
import { LoaderCircle, CircleX, Star } from 'lucide-react';
import HeaderHomePage from './UserHeaderHP';
import FooterPage from "./UserFooter.jsx";

function UserProduct() {
    const [error, seterror] = useState("");
    const [product, setproduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const FetchProduct = async () => {
            setIsLoading(true);

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
                setIsLoading(false);
            }
            catch (err) {
                seterror(err.message || "Something went wrong!")
            } finally {
                setIsLoading(false);
            }
        }
        FetchProduct();
    }, []);

    const [isOpenDetail, setIsOpenDetail] = useState(false);

    return (
        <div className="min-h-screen font-sans">
            <HeaderHomePage />

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <LoaderCircle size={48} className="animate-spin text-amber-500"
                        strokeWidth={3.5} />
                </div>
            ) : (
                error ? (
                    <div className="max-w-lg bg-red-300 border-2 border-red-400 rounded-lg flex
                items-center justify-center flex-col gap-1 mx-auto py-6">
                        <CircleX size={32} className="text-red-800" />
                        <p className="font-semibold">Đã xảy ra lỗi, vui lòng thử lại.</p>
                    </div>
                ) : (
                    <div className="w-full">
                        <div className="max-w-7xl mx-auto xl:px-8 pt-8">
                            <div className="flex flex-col gap-2">
                                <div className="grid grid-cols-[2fr_3fr] mb-12">
                                    <div className="space-y-6">
                                        <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full font-bold text-sm">
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                                            </span>
                                            <span>Bộ sưu tập đặc biệt</span>
                                        </div>
                                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                                            Tinh Hoa <span className="text-amber-600">Cà Phê</span>
                                        </h1>
                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            Khám phá bộ sưu tập cà phê tinh tế của chúng tôi, nơi tôn vinh hương vị đậm đà và nghệ thuật pha chế. Mỗi sản phẩm đều là minh chứng cho chất lượng, phong cách, và sự quyến rũ vượt thời gian.
                                        </p>
                                    </div>

                                    <div className="xl:flex hidden justify-end py-16 pl-16">
                                        <img 
                                        src="https://image.pollinations.ai/prompt/A%20professional%20specialty%20coffee%20bar%20counter%20interior%2C%20industrial%20loft%20style%20with%20red%20and%20white%20brick%20walls%2C%20stainless%20steel%20espresso%20equipment%2C%20commercial%20coffee%20grinder%2C%20glass%20pendant%20lights%2C%20pour%20over%20v60%20dripper%20set%2C%20warm%20ambient%20lighting%2C%20cinematic%20photography%2C%20high%20resolution?width=1280&height=720&seed=42&nologo=true" 
                                        alt="Góc quầy pha chế"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform 
                                        duration-500 rounded-bl-[48px]"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col border-t-2 border-amber-200 items-center
                                py-8 gap-3 mb-24">
                                    <div className="relative text-3xl font-bold text-gray-900 inline-block">
                                        Danh mục sản phẩm

                                        <div className="absolute -bottom-2 left-4 right-4 h-1
                                    bg-amber-500 rounded-full"></div>
                                    </div>

                                    <p className="text-lg text-gray-500">Khám phá các loại đồ uống tại cửa hàng</p>

                                    <div className="xl:grid xl:grid-cols-4 gap-6 w-full mt-8">
                                        {product.map((item) => {
                                            return (
                                                <button key={item.id}
                                                    className="flex flex-col rounded-lg gap-4 group
                                                    hover:border-amber-300 hover:-translate-y-1 transition-all
                                                    duration-300"
                                                    type='button'
                                                    onClick={() => {
                                                        setSelectedProduct(item);
                                                        setIsOpenDetail(true);
                                                    }}>
                                                    <div className="aspect-square overflow-hidden rounded-xl border-2 border-gray-200">
                                                        <img src="/coffee.jpg" alt="sample-image"
                                                            className="w-full object-cover
                                                            group-hover:scale-105 transition-transform duration-200"/>
                                                    </div>

                                                    <div className="flex flex-col px-3">
                                                        <div className="flex justify-between items-end">
                                                            <p className="text-stone-500 text-lg font-semibold truncate flex-1
                                                        group-hover:text-amber-600 transition-colors text-left">
                                                                {item.name}</p>
                                                            <p className="font-medium text-xl flex gap-3">
                                                                <span className='flex items-center'>
                                                                    <Star size={20} className="fill-yellow-500 stroke-yellow-500" />
                                                                </span>{item.rating}
                                                            </p>
                                                        </div>

                                                        {item.discount === 0 ? (
                                                            <p className="text-lg font-bold text-stone-800 text-left">
                                                                {item.unit_price.toLocaleString("vi-VN")} VNĐ</p>
                                                        ) : (
                                                            <div className="flex items-center gap-6">
                                                                <p className="text-lg font-bold text-stone-800">
                                                                    {(item.unit_price - item.discount).toLocaleString("vi-VN")} VNĐ</p>

                                                                <p className="text-xs font-medium text-gray-600 line-through">
                                                                    {item.unit_price.toLocaleString("vi-VN")} VNĐ
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FooterPage />

                        {isOpenDetail && 
                            <UserFeedBack
                                onClose={() => {
                                    setIsOpenDetail(false)
                                    setSelectedProduct(null);
                                }}
                                product={selectedProduct}
                            />}
                    </div> 
                ))}
        </div>
    );
}

export default UserProduct;