import React, { useState, useRef } from 'react';
import Admin_Header from './Admin_Header'; 
import "../assets/css/Admin_ManageProduct_Edit.css"; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, Gift, Coffee, Check, AlertCircle } from 'lucide-react';

const Admin_ManageProduct_Edit = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [err, setErr] = useState("");

    const handleConfirm = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    const nameCreateRef = useRef("");
    const priceCreateRef = useRef("");

    const addProduct = async() => {
        const token = localStorage.getItem("token");
        const nameCreate = nameCreateRef.current.value.trim();
        const priceCreate = priceCreateRef.current.value.trim();

        if (!nameCreate || !priceCreate) {
            setErr("Vui lòng nhập đầy đủ thông tin sản phẩm!");
            return;
        }

        const prodCreate = {
            name: nameCreate,
            unit_price: priceCreate,
        }

        try {
            await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/manager/create/product",
                prodCreate, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
            handleConfirm("Thêm sản phẩm thành công!");
            nameCreateRef.current.value = "";
            priceCreateRef.current.value = "";
            setErr("");
        }
        catch(err) {
            setErr(err.response?.data?.message || err.message || "Lỗi khi thêm sản phẩm!");
        }
    }

    const idModRef = useRef("");
    const nameModRef = useRef("");
    const priceModRef = useRef("");
    const disCModRef = useRef("");

    const modifyProduct = async() => {
        const token = localStorage.getItem("token");

        const idMod = idModRef.current.value.trim();
        const nameMod = nameModRef.current.value.trim();
        const priceMod = priceModRef.current.value.trim();
        const discount = disCModRef.current.value.trim();

        if (!idMod) {
            setErr("Vui lòng nhập mã ID sản phẩm cần chỉnh sửa!");
            return;
        }

        const modify = {
            name: nameMod || undefined,
            unit_price: priceMod || undefined,
            discount: discount || undefined,
            id: idMod,
        }

        try {
            await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/manager/update/product",
                modify, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
            handleConfirm("Chỉnh sửa sản phẩm thành công!");
            idModRef.current.value = "";
            nameModRef.current.value = "";
            priceModRef.current.value = "";
            disCModRef.current.value = "";
            setErr("");
        }
        catch(err) {
            setErr(err.response?.data?.message || err.message || "Lỗi khi chỉnh sửa sản phẩm!");
        }
    }

    const idDeleteRef = useRef("");

    const deleteProduct = async() => {
        const token = localStorage.getItem("token");
        const idDelete = idDeleteRef.current.value.trim();

        if (!idDelete) {
            setErr("Vui lòng nhập mã ID sản phẩm cần xóa!");
            return;
        }

        try {
            await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/manager/delete/product", 
                {}, {
                    params: {id: idDelete},
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
            handleConfirm("Xóa sản phẩm thành công!");
            idDeleteRef.current.value = "";
            setErr("");
        }
        catch(err) {
            setErr(err.response?.data?.message || err.message || "Lỗi khi xóa sản phẩm!");
        }
    }

    const gNameCreateRef = useRef("");
    const gPointCreateRef = useRef("");

    const createGift = async() => {
        const token = localStorage.getItem("token");

        const gNameCreate = gNameCreateRef.current.value.trim();
        const gPointCreate = gPointCreateRef.current.value.trim();

        if (!gNameCreate || !gPointCreate) {
            setErr("Vui lòng nhập đầy đủ thông tin quà tặng!");
            return;
        }

        const gift = {
            name: gNameCreate,
            point: gPointCreate,
        }

        try {
            await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/manager/create/gift",
                gift, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
            handleConfirm("Thêm quà thành công!");
            gNameCreateRef.current.value = "";
            gPointCreateRef.current.value = "";
            setErr("");
        }
        catch(err) {
            setErr(err.response?.data?.message || err.message || "Lỗi khi thêm quà!");
        }
    } 

    const gModIDRef = useRef("");
    const gModNameRef = useRef("");
    const gModPointRef = useRef("");

    const modifyGift = async() => {
        const token = localStorage.getItem("token");

        const gModID = gModIDRef.current.value.trim();
        const gModName = gModNameRef.current.value.trim();
        const gModPoint = gModPointRef.current.value.trim();

        if (!gModID) {
            setErr("Vui lòng nhập mã ID quà cần chỉnh sửa!");
            return;
        }

        const modify = {
            id: gModID,
            name: gModName || undefined,
            point: gModPoint || undefined
        }

        try {
            await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/manager/update/gift",
                modify, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
            handleConfirm("Chỉnh sửa quà thành công!");
            gModIDRef.current.value = "";
            gModNameRef.current.value = "";
            gModPointRef.current.value = "";
            setErr("");
        }
        catch(err) {
            setErr(err.response?.data?.message || err.message || "Lỗi khi chỉnh sửa quà!");
        }
    }

    const gIDdelRef = useRef("");

    const deleteGift = async() => {
        const token = localStorage.getItem("token");
        const idDel = gIDdelRef.current.value.trim();

        if (!idDel) {
            setErr("Vui lòng nhập mã ID quà cần xóa!");
            return;
        }

        try {
            await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/manager/delete/gift",
                {}, {
                    params: {id: idDel},
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
            handleConfirm("Xóa quà thành công!");
            gIDdelRef.current.value = "";
            setErr("");
        }
        catch(err) {
            setErr(err.response?.data?.message || err.message || "Lỗi khi xóa quà!");
        }
    }

    return (
        <div className="min-h-screen bg-stone-100 font-sans pb-12">
            <Admin_Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                    <div>
                        <h2 className="text-4xl font-black text-stone-900 mt-0 tracking-tight">
                            Quản lý Đồ uống & Quà tặng
                        </h2>
                        <p className="text-sm text-stone-500 mt-2 font-medium">
                            Cập nhật thông tin thực đơn đồ uống và danh sách đổi quà tích lũy
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate('/admin/manage-product')}
                        className="bg-stone-900 hover:bg-black text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-stone-900/20 transition-transform transform hover:-translate-y-0.5 flex items-center shrink-0 w-fit"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Quay về
                    </button>
                </div>

                {err && (
                    <div className="mb-8 bg-red-50 text-red-600 p-5 rounded-2xl text-sm font-bold border border-red-100 flex items-center shadow-sm">
                        <AlertCircle className="h-6 w-6 mr-3 shrink-0" />
                        {err}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* COLUMN 1: SẢN PHẨM */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                            <Coffee className="h-6 w-6 text-amber-600" />
                            <h3 className="text-xl font-bold text-stone-850">Thực Đơn Sản Phẩm</h3>
                        </div>

                        {/* Thêm Sản Phẩm */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Plus className="h-5 w-5 text-amber-500" />
                                <h4 className="text-lg font-bold text-stone-800">Thêm sản phẩm mới</h4>
                            </div>
                            <div className="space-y-3">
                                <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-medium" placeholder="Tên sản phẩm" ref={nameCreateRef}/>
                                <input type="number" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-medium" placeholder="Đơn giá (VNĐ)" ref={priceCreateRef}/>
                            </div>
                            <button className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm" onClick={addProduct}>
                                <Check className="h-4 w-4" /> Xác nhận thêm
                            </button>
                        </div>

                        {/* Chỉnh Sửa Sản Phẩm */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Pencil className="h-4 w-4 text-amber-500" />
                                <h4 className="text-lg font-bold text-stone-800">Chỉnh sửa thông tin</h4>
                            </div>
                            <div className="space-y-3">
                                <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-medium" placeholder="Mã ID sản phẩm" ref={idModRef}/>
                                <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-medium" placeholder="Tên sản phẩm mới (để trống nếu không đổi)" ref={nameModRef}/>
                                <input type="number" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-medium" placeholder="Đơn giá mới (VNĐ)" ref={priceModRef}/>
                                <input type="number" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-medium" placeholder="Giảm giá (%)" ref={disCModRef}/>
                            </div>
                            <button className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm" onClick={modifyProduct}>
                                <Check className="h-4 w-4" /> Xác nhận cập nhật
                            </button>
                        </div>

                        {/* Xóa Sản Phẩm */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Trash2 className="h-5 w-5 text-red-500" />
                                <h4 className="text-lg font-bold text-stone-800">Xóa sản phẩm</h4>
                            </div>
                            <div className="space-y-3">
                                <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm font-medium" placeholder="Mã ID sản phẩm cần xóa" ref={idDeleteRef}/>
                            </div>
                            <button className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm" onClick={deleteProduct}>
                                <Trash2 className="h-4 w-4" /> Xác nhận xóa
                            </button>
                        </div>
                    </div>

                    {/* COLUMN 2: QUÀ TẶNG */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                            <Gift className="h-6 w-6 text-amber-600" />
                            <h3 className="text-xl font-bold text-stone-850">Bộ Sưu Tập Quà Tặng</h3>
                        </div>

                        {/* Thêm Quà */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Plus className="h-5 w-5 text-amber-500" />
                                <h4 className="text-lg font-bold text-stone-800">Thêm quà tặng mới</h4>
                            </div>
                            <div className="space-y-3">
                                <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-medium" placeholder="Tên món quà" ref={gNameCreateRef}/>
                                <input type="number" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-medium" placeholder="Điểm yêu cầu" ref={gPointCreateRef}/>
                            </div>
                            <button className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm" onClick={createGift}>
                                <Check className="h-4 w-4" /> Xác nhận thêm
                            </button>
                        </div>

                        {/* Chỉnh Sửa Quà */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Pencil className="h-4 w-4 text-amber-500" />
                                <h4 className="text-lg font-bold text-stone-800">Chỉnh sửa thông tin quà</h4>
                            </div>
                            <div className="space-y-3">
                                <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-medium" placeholder="Mã ID quà" ref={gModIDRef}/>
                                <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-medium" placeholder="Tên quà mới (để trống nếu không đổi)" ref={gModNameRef}/>
                                <input type="number" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-medium" placeholder="Điểm yêu cầu mới" ref={gModPointRef}/>
                            </div>
                            <button className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm" onClick={modifyGift}>
                                <Check className="h-4 w-4" /> Xác nhận cập nhật
                            </button>
                        </div>

                        {/* Xóa Quà */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Trash2 className="h-5 w-5 text-red-500" />
                                <h4 className="text-lg font-bold text-stone-800">Xóa quà tặng</h4>
                            </div>
                            <div className="space-y-3">
                                <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm font-medium" placeholder="Mã ID quà cần xóa" ref={gIDdelRef}/>
                            </div>
                            <button className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm" onClick={deleteGift}>
                                <Trash2 className="h-4 w-4" /> Xác nhận xóa
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            {/* Toast Notification */}
            {successMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white py-3.5 px-6 rounded-2xl shadow-xl flex items-center gap-2 animate-fade-in-up font-bold text-sm border border-emerald-400/20">
                    <Check className="h-5 w-5" />
                    <span>{successMessage}</span>
                </div>
            )}
        </div>
    );
};

export default Admin_ManageProduct_Edit;
