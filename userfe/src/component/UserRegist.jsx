import { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UserRegistInterface({ toggle }) {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [response, setResponse] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const HandleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        const regist = {
            phoneNumber: username,
            password: password
        };

        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/public/customer/createAccount",
                regist,
                { headers: { "Content-Type": "application/json" } }
            );
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={HandleClick} className="space-y-5 animate-fade-in-up">
            {error && <div className="p-3 bg-red-100/80 text-red-700 rounded-xl text-sm font-medium border border-red-200">{error}</div>}
            {response && <div className="p-3 bg-green-100/80 text-green-700 rounded-xl text-sm font-medium border border-green-200">{response}</div>}
            
            <div className="space-y-1.5">
                <label htmlFor="userRegist-username" className="text-sm font-bold text-stone-700 ml-1">
                    Số điện thoại
                </label>
                <input 
                    type="text" 
                    id="userRegist-username"
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none bg-white/70 focus:bg-white text-stone-800 font-medium placeholder-stone-400"
                    placeholder="Nhập số điện thoại"
                    required
                    ref={usernameRef}
                />
            </div>
            
            <div className="space-y-1.5">
                <label htmlFor="userRegist-password" className="text-sm font-bold text-stone-700 ml-1">
                    Mật khẩu
                </label>
                <input 
                    type="password" 
                    id="userRegist-password"
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none bg-white/70 focus:bg-white text-stone-800 font-medium placeholder-stone-400"
                    placeholder="Tạo mật khẩu"
                    required
                    ref={passwordRef}
                />
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-stone-800 hover:bg-stone-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 mt-8 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isLoading ? 'Đang xử lý...' : 'Đăng Ký Ngay'}
            </button>

            <div className="text-center pt-4">
                <p className="text-stone-500 font-medium">
                    Đã có tài khoản?{' '}
                    <span onClick={toggle} className="text-amber-600 hover:text-amber-700 font-extrabold cursor-pointer transition-colors underline decoration-2 underline-offset-4">
                        Đăng Nhập
                    </span>
                </p>
            </div>
        </form>
    );
}

function UserLoginInterface({ toggle }) {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const HandleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        const regist = {
            username: username,
            password: password
        };

        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/public/signin",
                regist,
                { headers: { "Content-Type": "application/json" } }
            );
            localStorage.setItem("token", res.data.jwtToken);
            localStorage.setItem("roles", res.data.roles[0]);
            if (res.data.roles[0] === "ROLE_CUSTOMER") {
                navigate("/customer");
            }
        } catch (err) {
            setError(err.message || "Tài khoản hoặc mật khẩu không đúng");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={HandleClick} className="space-y-5 animate-fade-in-up">
            {error && <div className="p-3 bg-red-100/80 text-red-700 rounded-xl text-sm font-medium border border-red-200">{error}</div>}
            
            <div className="space-y-1.5">
                <label htmlFor="userLogin-username" className="text-sm font-bold text-stone-700 ml-1">
                    Số điện thoại
                </label>
                <input 
                    type="text" 
                    id="userLogin-username"
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none bg-white/70 focus:bg-white text-stone-800 font-medium placeholder-stone-400"
                    placeholder="Nhập số điện thoại"
                    required
                    ref={usernameRef}
                />
            </div>
            
            <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                    <label htmlFor="userLogin-password" className="text-sm font-bold text-stone-700">
                        Mật khẩu
                    </label>
                    <span className="text-xs text-amber-600 hover:text-amber-700 font-bold cursor-pointer transition-colors">Quên mật khẩu?</span>
                </div>
                <input 
                    type="password" 
                    id="userLogin-password"
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none bg-white/70 focus:bg-white text-stone-800 font-medium placeholder-stone-400"
                    placeholder="Nhập mật khẩu"
                    required
                    ref={passwordRef}
                />
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(217,119,6,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(217,119,6,0.6)] transition-all transform hover:-translate-y-1 mt-8 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>

            <div className="text-center pt-4">
                <p className="text-stone-500 font-medium">
                    Chưa có tài khoản?{' '}
                    <span onClick={toggle} className="text-stone-800 hover:text-amber-600 font-extrabold cursor-pointer transition-colors underline decoration-2 underline-offset-4">
                        Tạo Tài Khoản Mới
                    </span>
                </p>
            </div>
        </form>
    );
}

function UserRegist() {
    const [isLogin, setIsLogin] = useState(true);

    const toggle = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100 relative overflow-hidden font-sans">
            {/* Background Gradient Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
            <div className="absolute top-[20%] left-[60%] w-72 h-72 bg-stone-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-md p-6">
                <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-[2rem] overflow-hidden border border-white/50">
                    <div className="p-8 sm:p-10">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-white mb-6 shadow-lg shadow-orange-500/30">
                                {/* Coffee Icon SVG */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.866 8.21 8.21 0 0 0 3 2.48Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight mb-2">
                                Coffee Shop
                            </h1>
                            <p className="text-stone-500 font-medium text-sm">
                                {isLogin ? 'Chào mừng bạn quay trở lại!' : 'Tham gia cộng đồng yêu cà phê'}
                            </p>
                        </div>
                        
                        <div className="transition-all duration-500 ease-in-out">
                            {isLogin ? 
                                (<UserLoginInterface toggle={toggle} />) : 
                                (<UserRegistInterface toggle={toggle} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRegist;