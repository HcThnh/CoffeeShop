import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Coffee, ShoppingBag, Gift, User, LogOut, Menu, X, ChevronDown } from "lucide-react";
import AvatarImg from "../assets/img/avatar.svg";

const Emp_Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const cachedName = localStorage.getItem("empName");
    const [empName, setEmpName] = useState(cachedName || "Nhân viên");

    // Fetch employee name dynamically on mount if not cached
    useEffect(() => {
        if (token && !cachedName) {
            axios.get("https://coffeeshop-api-udqx.onrender.com/employee/get/info", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            .then((res) => {
                if (res.data && res.data.name) {
                    setEmpName(res.data.name);
                    localStorage.setItem("empName", res.data.name);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch employee info:", err);
            });
        }
    }, [token, cachedName]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !event.target.closest(".avatar-btn")
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        localStorage.removeItem("empName");
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-stone-100 bg-white/90 backdrop-blur-md transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left Brand/Logo */}
                    <Link to="/emp/order-form" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.866 8.21 8.21 0 0 0 3 2.48Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                            </svg>
                        </div>
                        <span className="text-xl font-black text-stone-800 tracking-tight">
                            Coffee<span className="text-amber-600">Shop</span>
                        </span>
                    </Link>

                    {/* Center Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2">
                        <NavLink
                            to="/emp/order-form"
                            className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                isActive 
                                    ? 'bg-amber-600/10 text-amber-700' 
                                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                            }`}
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Tạo Đơn Hàng</span>
                        </NavLink>
                        <NavLink
                            to="/emp/history-gift"
                            className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                isActive 
                                    ? 'bg-amber-600/10 text-amber-700' 
                                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                            }`}
                        >
                            <Gift className="w-4 h-4" />
                            <span>Lịch Sử Đổi Quà</span>
                        </NavLink>
                    </nav>

                    {/* Right Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex flex-col text-right">
                            <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Xin chào</span>
                            <span className="text-sm font-bold text-stone-700">{empName}</span>
                        </div>
                        <div className="relative">
                            <button 
                                onClick={toggleDropdown}
                                className="avatar-btn flex items-center space-x-1.5 focus:outline-none rounded-full p-0.5 transition-all hover:opacity-90"
                            >
                                <div className="relative">
                                    <img 
                                        src={AvatarImg} 
                                        alt="User Avatar" 
                                        className="w-9 h-9 rounded-full object-cover border border-stone-200 shadow-sm" 
                                    />
                                </div>
                                <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${dropdownVisible ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {/* Desktop Dropdown Menu */}
                            <div 
                                ref={dropdownRef}
                                className={`absolute right-0 mt-2.5 w-48 rounded-2xl bg-white border border-stone-100 shadow-xl py-2 z-50 origin-top-right transition-all duration-200 ${
                                    dropdownVisible 
                                        ? 'opacity-100 scale-100 translate-y-0' 
                                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                }`}
                            >
                                <Link 
                                    to="/emp/personal-info" 
                                    onClick={() => setDropdownVisible(false)}
                                    className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                                >
                                    <User className="w-4 h-4 text-stone-400" />
                                    <span>Thông tin cá nhân</span>
                                </Link>
                                <hr className="my-1 border-stone-100" />
                                <button 
                                    onClick={() => {
                                        setDropdownVisible(false);
                                        handleLogout();
                                    }}
                                    className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                >
                                    <LogOut className="w-4 h-4 text-red-500" />
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <div className="flex md:hidden items-center">
                        <button 
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                            className="text-stone-500 hover:text-stone-900 p-2 rounded-xl hover:bg-stone-50 focus:outline-none transition-colors"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Panel */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-stone-100 bg-white ${
                mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            }`}>
                <div className="px-4 pt-2 pb-4 space-y-1.5">
                    <NavLink
                        to="/emp/order-form"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                            isActive 
                                ? 'bg-amber-600/10 text-amber-700' 
                                : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                        }`}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span>Tạo Đơn Hàng</span>
                    </NavLink>
                    <NavLink
                        to="/emp/history-gift"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                            isActive 
                                ? 'bg-amber-600/10 text-amber-700' 
                                : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                        }`}
                    >
                        <Gift className="w-5 h-5" />
                        <span>Lịch Sử Đổi Quà</span>
                    </NavLink>
                    
                    <hr className="my-2 border-stone-100" />
                    
                    <div className="flex items-center justify-between px-4 py-2.5 bg-stone-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                            <img 
                                src={AvatarImg} 
                                alt="User Avatar" 
                                className="w-8 h-8 rounded-full border border-stone-200 shadow-sm" 
                            />
                            <span className="text-sm font-bold text-stone-700">{empName}</span>
                        </div>
                        <Link 
                            to="/emp/personal-info" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-xs font-bold text-amber-600 hover:text-amber-700"
                        >
                            Hồ sơ cá nhân
                        </Link>
                    </div>
                    
                    <button 
                        onClick={() => {
                            setMobileMenuOpen(false);
                            handleLogout();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold text-red-600 hover:bg-red-50 transition-all text-left"
                    >
                        <LogOut className="w-5 h-5 text-red-500" />
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Emp_Header;
