import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import UserOrder from './UserOrder';
import { useNavigate } from 'react-router-dom';

function UserFormInfo({ fetchUserInfo, initialData }) {
    const nameRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();
    const dobRef = useRef();

    const [selectedGender, setSelectedGender] = useState("");
    const [msg, setMsg] = useState({ text: "", type: "" });
    const [isLoading, setIsLoading] = useState(false);

    // Điền dữ liệu cũ vào form
    useEffect(() => {
        if (initialData) {
            if (nameRef.current) nameRef.current.value = initialData.name || "";
            if (addressRef.current) addressRef.current.value = initialData.address || "";
            if (phoneRef.current) phoneRef.current.value = initialData.phoneNumber || "";
            if (dobRef.current) dobRef.current.value = initialData.dob || "";
            setSelectedGender(initialData.gender || "");
        }
    }, [initialData]);

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        
        const name = nameRef.current?.value.trim();
        const address = addressRef.current?.value.trim();
        const dob = dobRef.current?.value;

        if (!name || !address || !dob || !selectedGender) {
            setMsg({ text: "Vui lòng điền đầy đủ thông tin!", type: "error" });
            return;
        }

        setIsLoading(true);
        setMsg({ text: "", type: "" });
        const token = localStorage.getItem("token");
        const userPhone = localStorage.getItem("phone") || phoneRef.current.value;

        const user = {
            dob: dob, 
            phoneNumber: userPhone, 
            address: address,
            name: name,
            gender: selectedGender,
        };

        try {
            await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/customer/updateInfo",
                user, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            setMsg({ text: "Cập nhật thông tin thành công!", type: "success" });
            fetchUserInfo(); // Tải lại thẻ Profile bên trái
        } catch(err) {
            setMsg({ text: err.response?.data?.message || err.message || "Đã có lỗi xảy ra", type: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className='bg-white p-8 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 relative overflow-hidden'>
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10"></div>
            
            <h3 className="text-2xl font-extrabold text-stone-800 mb-6">Chỉnh sửa thông tin</h3>
            
            {msg.text && (
                <div className={`p-4 rounded-xl text-sm font-medium mb-6 flex items-start ${
                    msg.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'
                }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {msg.text}
                </div>
            )}

            <div className="space-y-5">
                <div>
                    <label htmlFor='userName' className="block text-sm font-bold text-stone-700 mb-1.5 ml-1">Họ tên</label>
                    <input 
                        type="text" id="userName" ref={nameRef} placeholder='Nhập họ tên của bạn'
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-stone-50 focus:bg-white text-stone-800" 
                    />
                </div>
                
                <div>
                    <label htmlFor="userAddress" className="block text-sm font-bold text-stone-700 mb-1.5 ml-1">Địa chỉ</label>
                    <input 
                        type="text" id='userAddress' ref={addressRef} placeholder='Nhập địa chỉ của bạn'
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-stone-50 focus:bg-white text-stone-800" 
                    />
                </div>
                
                <div>
                    <label htmlFor="userPhone" className="block text-sm font-bold text-stone-700 mb-1.5 ml-1">Số điện thoại (Không thể đổi)</label>
                    <input 
                        type="text" id='userPhone' ref={phoneRef} disabled
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-100 text-stone-500 cursor-not-allowed outline-none font-medium" 
                    />
                </div>
                
                <div>
                    <label htmlFor="userDoB" className="block text-sm font-bold text-stone-700 mb-1.5 ml-1">Ngày sinh</label>
                    <input 
                        type="date" id='userDoB' ref={dobRef}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-stone-50 focus:bg-white text-stone-800" 
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">Giới tính</label>
                    <div className="flex space-x-6">
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="radio" name="gender" value="M" checked={selectedGender === "M"} onChange={handleGenderChange}
                                className="w-5 h-5 text-amber-600 border-stone-300 focus:ring-amber-500"
                            />
                            <span className="ml-2 text-stone-700 font-medium group-hover:text-amber-600 transition-colors">Nam</span>
                        </label>
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="radio" name="gender" value="F" checked={selectedGender === "F"} onChange={handleGenderChange}
                                className="w-5 h-5 text-amber-600 border-stone-300 focus:ring-amber-500"
                            />
                            <span className="ml-2 text-stone-700 font-medium group-hover:text-amber-600 transition-colors">Nữ</span>
                        </label>
                    </div>
                </div>
            </div>

            <button 
                onClick={handleClick} disabled={isLoading}
                className="w-full mt-8 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(217,119,6,0.39)] hover:shadow-[0_6px_20px_rgba(217,119,6,0.23)] transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Đang lưu...' : 'Lưu thông tin'}
            </button>
        </form>
    );
}

function UserPersonalInfo({ toggle, userInfo, fetchError }) {
    const navigate = useNavigate();

    const deleteCus = async() => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản vĩnh viễn? Mọi dữ liệu sẽ không thể khôi phục!")) {
            return;
        }

        const token = localStorage.getItem("token");
        try {
            await axios.delete(
                "https://coffeeshop-api-udqx.onrender.com/customer/delete",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            localStorage.removeItem("token");
            localStorage.removeItem("roles");
            alert("Tài khoản đã được xóa thành công.");
            navigate('/login');
        } catch(err) {
            alert(err.response?.data?.message || err.message || "Xóa tài khoản thất bại");
        }
    }

    return (
        <div className="bg-stone-800 text-stone-100 p-8 rounded-3xl shadow-xl shadow-stone-900/20 relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-amber-600 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
            
            <div className="flex items-center space-x-5 mb-8">
                <div className="w-20 h-20 rounded-full border-4 border-stone-600 overflow-hidden shadow-lg bg-stone-200 shrink-0">
                    <img src={require(`../img/Avatar.png`)} alt="Avatar" className="w-full h-full object-cover"/>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                        {userInfo?.name || "Tên khách hàng"}
                    </h2>
                </div>
            </div>

            {fetchError ? (
                <div className="bg-red-500/20 text-red-200 p-4 rounded-xl border border-red-500/30 text-sm mb-6">
                    {fetchError}
                </div>
            ) : null}

            <div className="space-y-5 flex-1 relative z-10">
                <div className="flex items-start">
                    <div className="w-10 flex justify-center text-stone-400 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs text-stone-400 uppercase tracking-wider font-bold mb-0.5">Số điện thoại</p>
                        <p className="font-medium text-white">{userInfo?.phoneNumber || "Chưa cập nhật"}</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="w-10 flex justify-center text-stone-400 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs text-stone-400 uppercase tracking-wider font-bold mb-0.5">Địa chỉ</p>
                        <p className="font-medium text-white">{userInfo?.address || "Chưa cập nhật"}</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="w-10 flex justify-center text-stone-400 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs text-stone-400 uppercase tracking-wider font-bold mb-0.5">Ngày sinh</p>
                        <p className="font-medium text-white">{userInfo?.dob || "Chưa cập nhật"}</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="w-10 flex justify-center text-stone-400 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs text-stone-400 uppercase tracking-wider font-bold mb-0.5">Giới tính</p>
                        <p className="font-medium text-white">
                            {userInfo?.gender === 'M' ? "Nam" : (userInfo?.gender === 'F' ? "Nữ" : "Chưa cập nhật")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-stone-700/50 space-y-3 relative z-10">
                <button 
                    onClick={toggle}
                    className="w-full flex items-center justify-center space-x-2 bg-stone-700 hover:bg-stone-600 text-white font-bold py-3.5 px-4 rounded-xl transition-colors border border-stone-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Lịch sử đơn hàng</span>
                </button>
                
                <button 
                    onClick={deleteCus}
                    className="w-full text-stone-400 hover:text-red-400 font-bold py-2 px-4 rounded-xl transition-colors text-sm hover:bg-red-500/10"
                >
                    Xóa tài khoản vĩnh viễn
                </button>
            </div>
        </div>
    );
}

function UserInfo() {
    const [order, setOrder] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    const HandleOrder = () => {
        setOrder(!order);
    }

    const fetchUserInfo = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(
                "https://coffeeshop-api-udqx.onrender.com/customer/info",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
            setUserInfo(res.data);
            localStorage.setItem("phone", res.data.phoneNumber);
        } catch(err) {
            setError(err.response?.data?.message || err.message || "Không thể lấy thông tin cá nhân");
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    return (
        <div className='bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans'>
            <div className="max-w-6xl mx-auto mt-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 tracking-tight">
                        Hồ Sơ <span className="text-amber-600">Cá Nhân</span>
                    </h2>
                    <p className="mt-3 text-lg text-stone-500">
                        Quản lý thông tin cá nhân và xem lại lịch sử các đơn hàng của bạn.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 h-full">
                        <UserPersonalInfo toggle={HandleOrder} userInfo={userInfo} fetchError={error} />
                    </div>
                    <div className="lg:col-span-7">
                        <UserFormInfo fetchUserInfo={fetchUserInfo} initialData={userInfo} />
                    </div>
                </div>
            </div>

            {order && <UserOrder onClose={HandleOrder} />}
        </div>
    );
}

export default UserInfo;