import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function HeaderHomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const isHome = location.pathname === '/customer' || location.pathname === '/customer/';

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname.includes(path);
    };

    return (
        <>
            <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-white py-4'
            } border-b border-stone-100 font-sans`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        
                        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/customer/product')}>
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.866 8.21 8.21 0 0 0 3 2.48Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-black text-stone-800 tracking-tight hidden sm:block">
                                Coffee<span className="text-amber-600">Shop</span>
                            </span>
                        </div>

                        <div className="flex space-x-6 md:space-x-10">
                            <Link 
                                to="/customer/product" 
                                className={`text-sm md:text-base font-bold transition-colors relative group ${
                                    isActive('product') ? 'text-amber-600' : 'text-stone-600 hover:text-amber-600'
                                }`}
                            >
                                SẢN PHẨM
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-amber-500 rounded-full transform origin-left transition-transform duration-300 ${isActive('product') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                            </Link>
                            <Link 
                                to="/customer/exchange" 
                                className={`text-sm md:text-base font-bold transition-colors relative group ${
                                    isActive('exchange') ? 'text-amber-600' : 'text-stone-600 hover:text-amber-600'
                                }`}
                            >
                                ĐỔI QUÀ
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-amber-500 rounded-full transform origin-left transition-transform duration-300 ${isActive('exchange') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4 md:space-x-6">
                            <button className="relative p-2 text-stone-400 hover:text-amber-500 transition-colors rounded-full hover:bg-stone-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                            </button>

                            <div className="relative group cursor-pointer">
                                <Link to="/customer/info">
                                    <div className="w-10 h-10 rounded-full border-2 border-amber-200 overflow-hidden group-hover:border-amber-500 transition-colors shadow-sm bg-stone-100">
                                        <img 
                                            src={require(`../img/Avatar.png`)} 
                                            alt="User Avatar" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </Link>
                            </div>

                            {/* Nút Đăng xuất */}
                            <button 
                                onClick={handleLogout}
                                className="hidden md:flex items-center space-x-1 bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-600 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                            >
                                <span>Đăng xuất</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {isHome && (
                <div className="relative bg-stone-50 overflow-hidden font-sans">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative z-10 pb-8 bg-stone-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-16 lg:pt-24 px-4 sm:px-6 lg:px-8">
                            <main className="mx-auto max-w-7xl">
                                <div className="sm:text-center lg:text-left">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-stone-900 sm:text-5xl md:text-6xl">
                                        <span className="block xl:inline">Chào mừng đến với</span>{' '}
                                        <span className="block text-amber-600 xl:inline mt-1">Coffee Shop</span>
                                    </h1>
                                    <p className="mt-5 text-base text-stone-500 sm:mt-6 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-8 md:text-xl lg:mx-0 leading-relaxed">
                                        Thưởng thức các loại cà phê nổi tiếng trong và ngoài nước với mức giá tốt nhất. Trải nghiệm không gian thư giãn và hương vị tuyệt hảo đánh thức mọi giác quan của bạn.
                                    </p>
                                    <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                                        <div className="rounded-xl shadow-lg shadow-amber-500/20">
                                            <Link to="/customer/product" className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-amber-600 hover:bg-amber-700 md:text-lg transition-colors">
                                                Đặt hàng ngay
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex h-64 sm:h-80 md:h-96 lg:h-full">
                        <div className="w-1/2 h-full">
                            <img className="w-full h-full object-cover" src={require(`../img/cf.jpg`)} alt="Coffee" />
                        </div>
                        <div className="w-1/2 h-full">
                            <img className="w-full h-full object-cover" src={require(`../img/pexels-goumbik-942768.jpg`)} alt="Coffee shop interior" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default HeaderHomePage;