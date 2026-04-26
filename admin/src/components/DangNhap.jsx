import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CoffeeShopImage from "../assets/img/CoffeeShop.jpg";
import axios from 'axios'; 

const DangNhap = ({ onLog }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const userRef = useRef("");
    const passRef = useRef("");

    const LoginClick = async(e) => {
        e.preventDefault();
        
        setErrorMessage('');
        setIsLoading(true);

        const uName = userRef.current.value.trim();
        const pWord = passRef.current.value.trim();

        if (!uName || !pWord) {
            setErrorMessage("Vui lòng nhập đầy đủ thông tin đăng nhập!");
            setIsLoading(false);
            return;
        }

        const admin = {
            username: uName,
            password: pWord,
        }

        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/public/signin",
                admin, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )

            localStorage.setItem("token", res.data.jwtToken);
            localStorage.setItem("roles", res.data.roles[0]);
            
            if (onLog) onLog();

            if (res.data.roles[0] === "ROLE_EMPLOYEE") {
                navigate("/employee");
            } else if (res.data.roles[0] === "ROLE_MANAGER") {
                navigate("/admin");
            } else {
                setErrorMessage("Tài khoản không có quyền truy cập!");
                setIsLoading(false);
            }
        }
        catch (err) {
            setErrorMessage(err.response?.data?.message || "Tên đăng nhập hoặc mật khẩu không chính xác!");
            setIsLoading(false);
        }
    }

    return (
        <div 
            className="min-h-screen w-full flex items-center justify-center font-sans relative overflow-hidden bg-stone-900"
            style={{
                backgroundImage: `url(${CoffeeShopImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

            <div className="relative z-10 w-full max-w-md p-8 md:p-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] text-white animate-fade-in-up">
                
                <div className="flex flex-col items-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-white mb-6 shadow-lg shadow-orange-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.866 8.21 8.21 0 0 0 3 2.48Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-light tracking-widest uppercase text-white/90">WorkSpace</h1>
                    <p className="text-sm text-stone-300 mt-2 font-light">Internal Coffee Shop Management</p>
                </div>

                {errorMessage && (
                    <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm flex items-center animate-shake backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{errorMessage}</span>
                    </div>
                )}

                <form className="space-y-5" onSubmit={LoginClick}>
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                                placeholder="Username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                id="password"
                                ref={passRef}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                                placeholder="Password"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full mt-6 py-3.5 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white font-semibold rounded-xl shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.23)] transition-all duration-300 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "SIGN IN"
                        )}
                    </button>
                </form>
            </div>
            
            <div className="absolute bottom-6 w-full text-center z-10">
                <p className="text-white/40 text-xs tracking-wider">SECURE INTERNAL SYSTEM • COFFEE SHOP</p>
            </div>
        </div>
    );
};

export default DangNhap;
