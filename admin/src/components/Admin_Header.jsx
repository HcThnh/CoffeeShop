import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import "../assets/css/Admin_Header.css"; 

const Admin_Header = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        navigate("/login");
    };

    const isActive = (path) => {
        return location.pathname.includes(path);
    }

    return (
        <header className="font-sans sticky z-50 top-0 w-full border-b border-stone-100 bg-white">
            <div className='flex max-w-7xl px-4 sm:px-6 lg:px-8 py-4 mx-auto justify-between items-center'>
                <div className='flex items-center'>
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.866 8.21 8.21 0 0 0 3 2.48Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                        </svg>
                    </div>
                    <h1 className='text-2xl font-black text-stone-800 tracking-tight'>
                        Coffee<span className='text-amber-600'>Shop</span>
                    </h1>
                </div>
                <nav className='items-center space-x-4 xl:space-x-10 hidden xl:flex'>
                    <Link to="/admin/manage-work-schedule"
                    className={`font-bold group text-sm md:text-base transition-colors
                    ${isActive("manage-work-schedule") ? "text-amber-600" : "text-stone-600 hover:text-amber-600"}`}>
                        Lịch làm việc
                    </Link>
                    <Link to="/admin/manage-employee"
                    className={`font-bold group text-sm md:text-base transition-colors
                    ${isActive("manage-employee") ? "text-amber-600" : "text-stone-600 hover:text-amber-600"}`}>
                        Nhân viên
                    </Link>
                    <Link to="/admin/manage-product"
                    className={`font-bold group text-sm md:text-base transition-colors
                    ${isActive("manage-product") ? "text-amber-600" : "text-stone-600 hover:text-amber-600"}`}>
                        Sản phẩm
                    </Link>
                    <Link to="/admin/manage-order"
                    className={`font-bold group text-sm md:text-base transition-colors
                    ${isActive("manage-order") ? "text-amber-600" : "text-stone-600 hover:text-amber-600"}`}>
                        Đơn đặt hàng
                    </Link>
                    <Link to="/admin/revenue"
                    className={`font-bold group text-sm md:text-base transition-colors
                    ${isActive("revenue") ? "text-amber-600" : "text-stone-600 hover:text-amber-600"}`}>
                        Lợi nhuận
                    </Link>
                </nav>
                <div className="hidden xl:block">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center space-x-1 bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-600 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                        <span>Đăng xuất</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
                
                {/* Hamburger menu for mobile */}
                <div className="flex xl:hidden items-center">
                    <button 
                        onClick={() => setMobileMenuOpen(prev => !prev)}
                        className="text-stone-500 hover:text-stone-900 p-2 rounded-xl hover:bg-stone-50 focus:outline-none transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Collapsible Mobile Navigation */}
            <div className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-stone-100 bg-white ${
                mobileMenuOpen ? 'max-h-120 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            }`}>
                <div className="px-4 py-2 space-y-1">
                    <Link to="/admin/manage-work-schedule"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex font-bold px-4 py-3 rounded-xl text-base transition-all duration-200
                    ${isActive("manage-work-schedule") ? "bg-amber-600/10 text-amber-700" : "text-stone-600 hover:bg-stone-50"}`}>
                        Lịch làm việc
                    </Link>
                    <Link to="/admin/manage-employee"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex font-bold px-4 py-3 rounded-xl text-base transition-all duration-200
                    ${isActive("manage-employee") ? "bg-amber-600/10 text-amber-700" : "text-stone-600 hover:bg-stone-50"}`}>
                        Nhân viên
                    </Link>
                    <Link to="/admin/manage-product"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex font-bold px-4 py-3 rounded-xl text-base transition-all duration-200
                    ${isActive("manage-product") ? "bg-amber-600/10 text-amber-700" : "text-stone-600 hover:bg-stone-50"}`}>
                        Sản phẩm
                    </Link>
                    <Link to="/admin/manage-order"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex font-bold px-4 py-3 rounded-xl text-base transition-all duration-200
                    ${isActive("manage-order") ? "bg-amber-600/10 text-amber-700" : "text-stone-600 hover:bg-stone-50"}`}>
                        Đơn đặt hàng
                    </Link>
                    <Link to="/admin/revenue"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex font-bold px-4 py-3 rounded-xl text-base transition-all duration-200
                    ${isActive("revenue") ? "bg-amber-600/10 text-amber-700" : "text-stone-600 hover:bg-stone-50"}`}>
                        Lợi nhuận
                    </Link>
                    <hr className="my-2 border-stone-100" />
                    <button 
                        onClick={() => {
                            setMobileMenuOpen(false);
                            handleLogout();
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-3 rounded-xl text-base font-bold text-red-600 hover:bg-red-50 transition-all text-left"
                    >
                        <span>Đăng xuất</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Admin_Header;
