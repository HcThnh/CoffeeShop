import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin_Header from './Admin_Header';
import "../assets/css/Admin_ManageEmployee.css";
import axios from 'axios';
import {
    Phone, User, Info, Search, UserPen, Loader2, Trash,
    Check, X, Plus
} from 'lucide-react';
import DeleteEmployeeModal from './Admin_DeleteEmployeeModal';

const Admin_ManageEmployee = () => {
    const navigate = useNavigate();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const [updateMessage,] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [emp, setEmp] = useState([]);
    const [_err, setErr] = useState("");

    const [hoveredBtnIdx, setHoveredBtnIdx] = useState(null);
    const [selectedEmp, setSelectedEmp] = useState(null);

    const [toggleEdit, setToggleEdit] = useState(false);
    const [editedSalary, setEditedSalary] = useState("");

    const GetEmployee = async () => {
        const token = localStorage.getItem("token");
        setIsLoading(true);

        try {
            const res = await axios.get(
                "https://coffeeshop-api-udqx.onrender.com/manager/view/employees",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
            setEmp(res.data);
            return res.data;
        }
        catch (err) {
            setErr(err.message || "Something went wrong!")
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        GetEmployee();
    }, []);


    const formatSalary = (salary) => {
        return salary.toLocaleString('vi-VN') + ' VNĐ';
    };

    const handleDetailEmployee = (id) => {
        setToggleEdit(false);
        for (let i = 0; i < emp.length; i++) {
            if (emp[i].id === id) {
                setSelectedEmp(emp[i]);
                break;
            }
        }
    }

    const handleEditButton = async (id) => {
        if (!selectedEmp) return;

        const token = localStorage.getItem("token");

        const update = {
            id: selectedEmp.id,
            position: selectedEmp.position,
            unitSalary: Number(editedSalary) || 0,
        }

        try {
            await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/manager/update/employee/job",
                update, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
            )
            setToggleEdit(false);
            const updatedEmployees = await GetEmployee();
            if (updatedEmployees) {
                const updated = updatedEmployees.find(e => e.id === id);
                if (updated) setSelectedEmp(updated);
            }
        }
        catch (err) {
            setErr(err.message);
        }
    }

    const handleDeleteEmployee = async () => {
        if (!selectedEmp) return;
        const token = localStorage.getItem("token");

        const idDelete = selectedEmp.id;

        try {
            await axios.delete(
                "https://coffeeshop-api-udqx.onrender.com/manager/delete/employee",
                {
                    params: {id: idDelete},
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )

            setIsOpenDeleteModal(false);
            setSelectedEmp(null);
            await GetEmployee();
        }
        catch(err) {
            setErr(err);
        }
    }

    return (
        <div>
            <Admin_Header />

            <main className="mx-auto px-4 py-8 sm:px-6 max-w-7xl font-sans">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <h2 className="text-4xl font-black text-stone-900 mt-0 tracking-tight">
                        Quản lý nhân viên
                    </h2>
                    <button className="bg-stone-900 hover:bg-black text-white font-bold
                    py-3 px-6 rounded-2xl shadow-xl shadow-stone-900/20 transition-transform
                    transform hover:-translate-y-1 flex items-center gap-2"
                        onClick={() => navigate('/admin/manage-employee/edit')}>
                        <span><Plus/></span>Thêm nhân viên
                    </button>
                </div>

                <div className="md:grid md:grid-cols-5 gap-3">
                    <div className="md:col-span-2 border-r pr-3">
                        {isLoading ?
                            (
                                <div className="flex items-center justify-center p-4 min-h-[calc(100vh-250px)]">
                                    <Loader2 className="w-10 h-10 animate-spin text-amber-500"
                                    strokeWidth={3.5}>
                                    </Loader2>
                                </div>) :
                            (<ul className="gap-4 flex flex-col min-h-[calc(100vh-250px)] overflow-y-auto">
                                {emp.map((employee, idx) => (
                                    <li className={`flex justify-between p-2 rounded-xl
                                border-y-2 border-r-2 border-l-8 bg-gray-100
                                ${hoveredBtnIdx === idx ? 'border-amber-500 transition-all shadow-lg border-l-amber-400'
                                            : ''}
                                ${selectedEmp?.id === employee.id ? 'border-amber-500 border-l-amber-500' : ''}`}
                                        key={idx}>
                                        <div className="font-sans">
                                            <p className="flex items-center gap-2">
                                                <span>
                                                    <Phone className='size-4' /></span>
                                                {employee.phoneNumber}</p>
                                        </div>

                                        <button className={`cursor-pointer hover:text-amber-600
                                    ${selectedEmp?.id === employee.id ? "text-amber-500" : ""}`}
                                            onMouseEnter={() => setHoveredBtnIdx(idx)}
                                            onMouseLeave={() => setHoveredBtnIdx(null)}
                                            onClick={() => handleDetailEmployee(employee.id)}>
                                            <Info />
                                        </button>
                                    </li>
                                ))}
                            </ul>)}
                    </div>

                    {!selectedEmp ? (
                        <div className="md:col-span-3 border-2 rounded-xl flex border-dashed
                    border-stone-300 items-center justify-center">
                            <div className="flex gap-2">
                                <Search className="text-gray-500" />
                                <p className="text-gray-500">
                                    Chọn một nhân viên để xem chi tiết</p>
                            </div>
                        </div>) : (
                        <div className="md:col-span-3 border-2 rounded-2xl flex flex-col border-stone-200 bg-white shadow-sm overflow-hidden">
                            <div className="h-10 bg-gradient-to-r from-stone-900 to-stone-850 relative">
                                <div className="absolute -bottom-6 left-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 border-4 border-white shadow-md flex items-center justify-center text-white text-2xl font-black">
                                        {selectedEmp.name ? selectedEmp.name.split(' ').pop().charAt(0) : '?'}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 px-8 pb-8 flex-1 flex flex-col">
                                <div>
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <div>
                                            <h3 className="text-2xl font-bold text-stone-900 m-0">
                                                {selectedEmp.name}
                                            </h3>
                                            <p className="text-sm text-stone-500 mt-1 flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                                                Đang làm việc
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full">
                                                {selectedEmp.position || "Nhân viên"}
                                            </span>
                                            <span className="bg-stone-100 text-stone-600 text-xs font-mono px-3 py-1.5 rounded-full">
                                                ID: #{selectedEmp.id ? selectedEmp.id.toString().padStart(3, '0') : ''}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                        <div className="p-4 rounded-xl border border-stone-100 bg-stone-50/50 flex items-center gap-3">
                                            <div className="p-2.5 bg-white text-stone-600 rounded-lg shadow-sm border border-stone-100">
                                                <Phone className="size-5 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider m-0">Số điện thoại</p>
                                                <p className="text-sm font-bold text-stone-800 m-0 mt-0.5">{selectedEmp.phoneNumber || "Chưa cập nhật"}</p>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl border border-stone-100 bg-stone-50/50 flex items-center gap-3">
                                            <div className="p-2.5 bg-white text-stone-600 rounded-lg shadow-sm border border-stone-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days text-amber-600"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                                            </div>
                                            <div>
                                                <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider m-0">Ngày bắt đầu</p>
                                                <p className="text-sm font-bold text-stone-800 m-0 mt-0.5">
                                                    {selectedEmp.startDate ? (isNaN(new Date(selectedEmp.startDate).getTime()) ? selectedEmp.startDate : new Date(selectedEmp.startDate).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' })) : 'Chưa cập nhật'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl border border-stone-100 bg-stone-50/50 flex items-center gap-3">
                                            <div className="p-2.5 bg-white text-stone-600 rounded-lg shadow-sm border border-stone-100">
                                                <User className="size-5 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider m-0">Chức vụ</p>
                                                <p className="text-sm font-bold text-stone-800 m-0 mt-0.5">{selectedEmp.position || "Nhân viên"}</p>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl border border-stone-100 bg-stone-50/50 flex items-center gap-3">
                                            <div className="p-2.5 bg-white text-stone-600 rounded-lg shadow-sm border border-stone-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coins text-amber-600"><circle cx="8" cy="8" r="6" /><circle cx="18" cy="18" r="4" /><path d="M12 18a6 6 0 0 0-6-6" /><path d="M20 14a4 4 0 0 0-4-4" /></svg>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider m-0">Lương cơ bản</p>
                                                {toggleEdit ? (
                                                    <input
                                                        className="w-full max-w-xs text-xl font-bold text-amber-950 bg-white/70 backdrop-blur-sm
                                                    px-3 py-1 rounded-xl border border-amber-200/60 shadow-inner
                                                    placeholder:text-amber-700/40 placeholder:font-normal placeholder:text-sm
                                                    focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 
                                                    focus:bg-white transition-all duration-200"
                                                        type="number"
                                                        placeholder="Lương/giờ..."
                                                        value={editedSalary}
                                                        onChange={(e) => setEditedSalary(e.target.value)}
                                                    />
                                                ) : (
                                                    <p className="text-sm font-bold text-stone-800 m-0 mt-0.5">
                                                        {selectedEmp.unitSalary !== undefined ? `${formatSalary(selectedEmp.unitSalary)} / giờ` : "Chưa thiết lập"}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-6">
                                        {!toggleEdit ? <button className="flex items-center"
                                            onClick={() => {
                                                setToggleEdit(true);
                                                setEditedSalary(selectedEmp.unitSalary !== undefined ? selectedEmp.unitSalary : "");
                                            }}>
                                            <span className='p-2 rounded-full bg-amber-500/10 hover:bg-amber-500
                                            transition-all duration-200 hover:text-amber-700'><UserPen /></span>
                                        </button> :
                                            <div className="flex items-center gap-4">
                                                <button className="flex items-center"
                                                    onClick={() => setToggleEdit(false)}>
                                                    <span className='p-2 rounded-full bg-amber-500/10 hover:bg-red-200
                                                transition-all duration-200 hover:text-red-400'><X /></span>
                                                </button>
                                                <button className="flex items-center">
                                                    <span className="p-2 rounded-full bg-emerald-500/10 hover:bg-emerald-300
                                                transition-all duration-200 hover:text-emerald-600"
                                                        onClick={() => handleEditButton(selectedEmp.id)}>
                                                        <Check /></span>
                                                </button>
                                            </div>}
                                        <button className="flex items-center">
                                            <span className="p-2 rounded-full bg-amber-500/10 hover:bg-red-200
                                            transition all duration-200 hover:text-red-400"
                                            onClick={() => setIsOpenDeleteModal(true)}>
                                                <Trash /></span>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-stone-100 pt-6 flex items-center justify-between text-xs text-stone-400">
                                    <span>Hệ thống CoffeeShop - Hồ sơ nhân sự</span>
                                    <span>Trạng thái: Hoạt động bình thường</span>
                                </div>
                            </div>
                        </div>)}
                </div>
            </main>

            <DeleteEmployeeModal
                isOpen={isOpenDeleteModal}
                onClose={() => setIsOpenDeleteModal(false)}
                onConfirm={handleDeleteEmployee}
            />

            {updateMessage && (
                <div className="success-message">{updateMessage}</div>
            )}
        </div>
    );
};

export default Admin_ManageEmployee;
