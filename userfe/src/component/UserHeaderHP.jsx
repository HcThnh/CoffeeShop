import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, ArrowLeft } from 'lucide-react';

function HeaderHomePage() {
    const navigate = useNavigate();

    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        navigate("/login");
    }

    return (
        <nav className="w-full sticky top-0 z-10 bg-amber-50">
            <div className="max-w-7xl mx-auto xl:px-8 py-4 grid grid-cols-[1fr_4fr_1fr] gap-4">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.866 8.21 8.21 0 0 0 3 2.48Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                        </svg>
                    </div>

                    <p className="font-bold text-xl">Coffee<span className="text-amber-500">Shop</span></p>
                </div>

                <div className="flex items-center justify-center gap-8">
                    <Link to="/customer/product"
                    className={`text-lg font-semibold hover:text-amber-600 transition-colors
                    duration-200 ${location.pathname === "/customer/product" ? "text-amber-500" : ""}`}>
                        Sản phẩm
                    </Link>

                    <Link to="/customer/exchange"
                    className={`text-lg font-semibold hover:text-amber-600 transition-colors
                    duration-200 
                    ${location.pathname === "/customer/exchange" ? "text-amber-500" : ""}`}>
                        Đổi quà
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <Link className="rounded-full w-8 h-8 border-2 border-amber-300 flex 
                    items-center justify-center group hover:border-amber-500
                    transition-colors duration-200"
                    to="/customer/info">
                        <User size={24} className="group-hover:text-amber-900
                        text-amber-700"/>
                    </Link>

                    <div className="w-0.5 h-full bg-gray-200"></div>

                    <button className="flex items-center gap-2 bg-amber-500/20 py-2 px-4
                    rounded-lg hover:bg-amber-200 transition-colors duration-200 group"
                    onClick={handleLogout}>
                        <span className="w-6 h-6 flex items-center text-gray-700
                        group-hover:text-gray-800"><ArrowLeft/></span>
                        <p className='font-medium text-gray-700
                        group-hover:text-gray-800 xl:flex hidden'>Đăng xuất</p>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default HeaderHomePage;