import { useState } from 'react';
import Admin_Header from './Admin_Header'; 
import "../assets/css/Admin_ManageEmployee_Edit.css"; 
import axios from 'axios';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin_ManageEmployee_Edit = () => {
    const navigate = useNavigate();

    const [phoneEmp, setPhoneEmp] = useState("");
    const [passEmp, setPassEmp] = useState("");
    const [posEmp, setPosEmp] = useState("");
    const [salEmp, setSalEmp] = useState("");

    const handlePhoneChange = (e) => {
        const value = e.target.value;

        const input = value.replace(/[^0-9]/g, "");
        const trimmed = input.substring(0, 10);

        if (phoneEmp.endsWith('.') && !value.includes(phoneEmp)) {
            trimmed = trimmed.slice(0, -1);
        }

        let formatted = trimmed;
        if (trimmed.length > 7) {
            formatted = `${trimmed.slice(0, 4)}.${trimmed.slice(4,7)}.${trimmed.slice(7)}`;
        } else if (trimmed.length > 4) {
            formatted = `${trimmed.slice(0, 4)}.${trimmed.slice(4)}`;
        }
        
        setPhoneEmp(formatted);
    }
    const handlePassChange = (e) => {
        setPassEmp(e.target.value)
    }
    const handlePosChange = (e) => {
        setPosEmp(e.target.value)
    }
    const handleSalChange = (e) => {
        setSalEmp(e.target.value)
    }

    const CreateEmp = async() => {
        if (!phoneEmp || !passEmp || !posEmp || !salEmp) {
            return;
        }

        const phoneEmployee = phoneEmp.replace(/\./g, "");

        const EMP = {
            phoneNumber: phoneEmployee,
            password: passEmp,
            position: posEmp,
            unitSalary: salEmp
        }

        const token = localStorage.getItem("token");

        try {
            await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/manager/create/employee",
                EMP, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )

            setPhoneEmp("");
            setPassEmp("");
            setPosEmp("");
            setSalEmp("");
        }
        catch(err) {
            setErr(err.message);
        }
    }

    return (
        <div>
            <Admin_Header />

            <main className="mx-auto px-4 py-8 sm:px-6 max-w-7xl font-sans">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <h2 className="text-4xl font-black text-stone-900 mt-0 tracking-tight">
                        Thêm nhân viên
                    </h2>

                    <button className="bg-stone-900 hover:bg-black text-white font-bold
                    py-3 px-6 rounded-2xl shadow-xl shadow-stone-900/20 transition-transform
                    transform hover:-translate-y-1 flex items-center gap-2"
                    onClick={() => navigate('/admin/manage-employee')}>
                        <span className=""><ArrowLeft/></span>Quay về
                    </button>
                </div>

                <h4 className="font-semibold font-sans text-xl text-stone-700 pb-8">
                    Vui lòng điền thông tin</h4>

                <div className="flex justify-between items-start">
                    <form 
                    className="flex flex-col border border-gray-100
                    w-3/5 font-sans gap-3">
                        <div className="flex flex-col py-4 px-2 bg-white rounded-lg">
                            <p className="font-semibold pb-2">
                                Số điện thoại</p>
                            <input type="text" 
                            className="border-gray-300 border rounded-md p-2
                            text-sm text-gray-800 focus:outline-none focus:border-gray-500"
                            placeholder="Nhập số điện thoại"
                            value={phoneEmp}
                            onChange={handlePhoneChange}/>
                        </div>

                        <div className="flex flex-col py-4 px-2 bg-white rounded-lg">
                            <p className="font-semibold pb-2">Mật khẩu</p>
                            <input type="password" 
                            className="border-gray-300 border rounded-md p-2
                            text-sm text-gray-800 focus:outline-none focus:border-gray-500"
                            placeholder="Nhập mật khẩu"
                            value={passEmp}
                            onChange={handlePassChange} />
                        </div>

                        <div className="flex flex-col py-4 px-2 bg-white rounded-lg">
                            <p className="font-semibold pb-2">Vị trí</p>
                            <input type="text" 
                            className="border-gray-300 border rounded-md p-2
                            text-sm text-gray-800 focus:outline-none focus:border-gray-500"
                            placeholder="Nhập vị trí"
                            value={posEmp}
                            onChange={handlePosChange}/>
                        </div>

                        <div className="flex flex-col py-4 px-2 bg-white rounded-lg">
                            <p className="font-semibold pb-2">Lương</p>
                            <input type="number" 
                            className="border-gray-300 border rounded-md p-2
                            text-sm text-gray-800 focus:outline-none focus:border-gray-500"
                            placeholder="Nhập lương"
                            value={salEmp}
                            onChange={handleSalChange}/>
                        </div>
                    </form>

                    <button className="bg-emerald-300 rounded-lg text-stone-800 
                    flex py-4 px-10 items-center gap-1
                    hover:bg-emerald-500 hover:text-gray-800 transition-all
                    duration-200 hover:shadow-lg hover:shadow-emerald-300/30"
                    onClick={CreateEmp}>
                        <span className="">
                            <Check/>
                        </span>  <p className="font-semibold">Tạo nhân viên</p>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Admin_ManageEmployee_Edit;
