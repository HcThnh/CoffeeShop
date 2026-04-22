import React, { useState, useRef } from 'react';
import Admin_Header from './Admin_Header'; 
import "../assets/css/Admin_ManageProduct_Edit.css"; 
import axios from 'axios';

const Admin_ManageProduct_Edit = () => {
    const [successMessage, setSuccessMessage] = useState(""); // Thông báo thành công cho mỗi khối

    // Hàm hiển thị thông báo sau khi nhấn nút xác nhận
    const handleConfirm = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000); // Ẩn thông báo sau 3 giây
    };

    const [err, setErr] = useState("");
    const nameCreateRef = useRef("");
    const priceCreateRef = useRef("");

    const addProduct = async(e) => {
        const token = localStorage.getItem("token");
        const nameCreate = nameCreateRef.current.value;
        const priceCreate = priceCreateRef.current.value;

        const prodCreate = {
            name: nameCreate,
            unit_price: priceCreate,
        }
        console.log(prodCreate);

        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/manager/create/product",
                prodCreate, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
        }
        catch(err) {
            setErr(err.message);
        }
    }

    const idModRef = useRef("");
    const nameModRef = useRef("");
    const priceModRef = useRef("");
    const disCModRef = useRef("");

    const modifyProduct = async(e) => {
        const token = localStorage.getItem("token");

        const idMod = idModRef.current.value;
        const nameMod = nameModRef.current.value;
        const priceMod = priceModRef.current.value;
        const discount = disCModRef.current.value;

        const modify = {
            name: nameMod,
            unit_price: priceMod,
            discount: discount,
            id: idMod,
        }

        console.log(modify);
        try {
            const res = await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/manager/update/product",
                modify, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
        }
        catch(err) {
            setErr(err.message);
        }
    }

    const idDeleteRef = useRef("");

    const deleteProduct = async(e) => {
        const token = localStorage.getItem("token");

        const idDelete = idDeleteRef.current.value;
        const deleteP = {
            id: idDelete,
        }

        try {
            const res = await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/manager/delete/product", 
                {}, {
                    params: {id: idDelete},
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
        }
        catch(err) {
            setErr(err.message);
        }
    }

    const gNameCreateRef = useRef("");
    const gPointCreateRef = useRef("");

    const createGift = async(e) => {
        const token = localStorage.getItem("token");

        const gNameCreate = gNameCreateRef.current.value;
        const gPointCreate = gPointCreateRef.current.value;

        const gift = {
            name: gNameCreate,
            point: gPointCreate,
        }

        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/manager/create/gift",
                gift, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )

        }
        catch(err) {
            setErr(err.message);
        }
    } 

    const gModIDRef = useRef("");
    const gModNameRef = useRef("");
    const gModPointRef = useRef("");

    const modifyGift = async(e) => {
        const token = localStorage.getItem("token");

        const gModID = gModIDRef.current.value;
        const gModName = gModNameRef.current.value;
        const gModPoint = gModPointRef.current.value;

        const modify = {
            id: gModID,
            name: gModName,
            point: gModPoint
        }

        try {
            const res = await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/manager/update/gift",
                modify, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
        }
        catch(err) {
            setErr(err.message);
        }
    }

    const gIDdelRef = useRef("");

    const deleteGift = async(e) => {
        const token = localStorage.getItem("token");

        const idDel = gIDdelRef.current.value;
        const del = {
            id: idDel
        }

        try {
            const res = await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/manager/delete/gift",
                {}, {
                    params: {id: idDel},
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
        }
        catch(err) {
            setErr(err.message);
        }
    }

    return (
        <div>
            {/* Header */}
            <Admin_Header />

            {/* Nội dung chính */}
            <div className="manage-product-edit-content">
                {/* Vùng I */}
                <div className="section section-1">
                    {/* Khối 1 - Thêm Sản Phẩm */}
                    <div className="block">
                        <h3 className="block-title">THÊM SẢN PHẨM</h3>
                        <input type="text" className="input-field" placeholder="Tên sản phẩm" 
                        ref={nameCreateRef}/>
                        <input type="text" className="input-field" placeholder="Đơn giá" 
                        ref={priceCreateRef}/>
                        <button className="confirm-button" onClick={() => addProduct()}>Xác nhận</button>
                    </div>

                    {/* Khối 2 - Chỉnh Sửa Sản Phẩm */}
                    <div className="block">
                        <h3 className="block-title">CHỈNH SỬA SẢN PHẨM</h3>
                        <input type="text" className="input-field" placeholder="Mã ID" 
                        ref={idModRef}/>
                        <input type="text" className="input-field" placeholder="Tên sản phẩm" 
                        ref={nameModRef}/>
                        <input type="text" className="input-field" placeholder="Đơn giá" 
                        ref={priceModRef}/>
                        <input type="text" className="input-field" placeholder="Giảm giá" 
                        ref={disCModRef}/>
                        <button className="confirm-button" onClick={modifyProduct}>Xác nhận</button>
                    </div>

                    {/* Khối 3 - Xóa Sản Phẩm */}
                    <div className="block">
                        <h3 className="block-title">XÓA SẢN PHẨM</h3>
                        <input type="text" className="input-field" placeholder="Mã ID" 
                        ref={idDeleteRef}/>
                        <button className="confirm-button" onClick={() => deleteProduct()}>Xác nhận</button>
                    </div>
                </div>

                {/* Vùng II */}
                <div className="section section-2">
                    {/* Khối 1 - Thêm Quà */}
                    <div className="block">
                        <h3 className="block-title">THÊM QUÀ</h3>
                        <input type="text" className="input-field" placeholder="Tên quà" 
                        ref={gNameCreateRef}/>
                        <input type="text" className="input-field" placeholder="Điểm" 
                        ref={gPointCreateRef}/>
                        <button className="confirm-button" onClick={() => createGift()}>Xác nhận</button>
                    </div>

                    {/* Khối 2 - Chỉnh Sửa Quà */}
                    <div className="block">
                        <h3 className="block-title">CHỈNH SỬA QUÀ</h3>
                        <input type="text" className="input-field" placeholder="Mã ID" 
                        ref={gModIDRef}/>
                        <input type="text" className="input-field" placeholder="Tên quà" 
                        ref={gModNameRef}/>
                        <input type="text" className="input-field" placeholder="Điểm" 
                        ref={gModPointRef}/>
                        <button className="confirm-button" onClick={() => modifyGift()}>Xác nhận</button>
                    </div>

                    {/* Khối 3 - Xóa Quà */}
                    <div className="block">
                        <h3 className="block-title">XÓA QUÀ</h3>
                        <input type="text" className="input-field" placeholder="Mã ID" 
                        ref={gIDdelRef}/>
                        <button className="confirm-button" onClick={() => deleteGift()}>Xác nhận</button>
                    </div>
                </div>
            </div>

            {/* Thông báo */}
            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}
        </div>
    );
};

export default Admin_ManageProduct_Edit;
