import { useState, useRef } from 'react';
import Admin_Header from './Admin_Header'; 
import "../assets/css/Admin_ManageEmployee_Edit.css"; 
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin_ManageEmployee_Edit = () => {
    const navigate = useNavigate();

    const [updateMessage, setUpdateMessage] = useState(""); 

    // Thêm nhân viên mới
    const handleAddEmployeeClick = () => {
        setUpdateMessage("Thêm nhân viên thành công");
        document.querySelector('.add-employee-message-custom').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.add-employee-message-custom').style.display = 'none';
        }, 3000);
    };

    // Thay đổi vị trí nhân viên
    const handleChangePositionClick = () => {
        setUpdateMessage("Thay đổi vị trí thành công");
        document.querySelector('.change-position-message-custom').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.change-position-message-custom').style.display = 'none';
        }, 3000);
    };

    // Xóa nhân viên
    const handleDeleteEmployeeClick = () => {
        setUpdateMessage("Đã xóa nhân viên");
        document.querySelector('.delete-employee-message-custom').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.delete-employee-message-custom').style.display = 'none';
        }, 3000);
    };

    const phoneRef = useRef("");
    const passRef = useRef("");
    const posRef = useRef("");
    const salRef = useRef("");

    const [err, setErr] = useState("");

    const CreateEmp = async(e) => {
        const phoneEmp = phoneRef.current.value;
        const passEmp = passRef.current.value;
        const posEmp = posRef.current.value;
        const salEmp = salRef.current.value;

        const EMP = {
            phoneNumber: phoneEmp,
            password: passEmp,
            position: posEmp,
            unitSalary: salEmp
        }

        console.log(EMP);
        const token = localStorage.getItem("token");

        try {
            const res = await axios.post(
                "https://coffeeshop-api-udqx.onrender.com/manager/create/employee",
                EMP, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
            console.log(res.status);

        }
        catch(err) {
            setErr(err.message);
        }
    }

    const idChangeRef = useRef("");
    const newposRef = useRef("");
    const newsalRef = useRef("");

    const UpdateEmp = async(e) => {
        const token = localStorage.getItem("token");

        const idChange = idChangeRef.current.value;
        const newpos = newposRef.current.value;
        const newsal = newsalRef.current.value;

        const update = {
            position: newpos,
            unitSalary: newsal,
            id: idChange,
        }

        console.log(update);
        try {
            const res = await axios.patch(
                "https://coffeeshop-api-udqx.onrender.com/manager/update/employee/job",
                update, {
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

    const DeleteEmp = async(e) => {
        const token = localStorage.getItem("token");

        const idDelete =  idDeleteRef.current.value;

        try {
            const res = await axios.delete(
                "https://coffeeshop-api-udqx.onrender.com/manager/delete/employee",
                {
                    params: {id: idDelete},
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
        }
        catch(err) {
            setErr(err);
        }
    }

    return (
        <div>
            {/* Header */}
            <Admin_Header />

            {/* Nội dung chính */}
            {/* <div className="work-schedule-edit-content">
                <div className="add-employee-section">
                    <h2 className="add-employee-title">THÊM NHÂN VIÊN MỚI</h2>
                    <input type="text" placeholder="Số điện thoại" className="input-field" 
                    ref={phoneRef}/>
                    <input type="password" placeholder="Mật khẩu" className="input-field" 
                    ref={passRef}/>
                    <input type="text" placeholder="Vị trí" className="input-field" 
                    ref={posRef}/>
                    <input type="number" placeholder="Lương" className="input-field" 
                    ref={salRef}/>
                    <button className="submit-button-custom" onClick={CreateEmp}>Thêm mới</button>

                    <div className="add-employee-message-custom">
                        {updateMessage}
                    </div>
                </div>

                <div className="change-position-section">
                    <h2 className="change-position-title">THAY ĐỔI VỊ TRÍ NHÂN VIÊN</h2>
                    <input type="text" placeholder="Mã nhân viên" className="input-field"
                    ref={idChangeRef} />
                    <input type="text" placeholder="Vị trí mới" className="input-field" 
                    ref={newposRef}/>
                    <input type="text" placeholder="Lương mới" className="input-field" 
                    ref={newsalRef}/>
                    <button className="submit-button-custom" onClick={UpdateEmp}>Cập nhật</button>

                    <div className="change-position-message-custom">
                        {updateMessage}
                    </div>
                </div>

                <div className="delete-employee-section">
                    <h2 className="delete-employee-title">XÓA NHÂN VIÊN</h2>
                    <input type="text" placeholder="Mã nhân viên" className="input-field" 
                    ref={idDeleteRef}/>
                    <button className="submit-button-custom" onClick={DeleteEmp}>Xóa</button>

                    <div className="delete-employee-message-custom">
                        {updateMessage}
                    </div>
                </div>
            </div> */}

            <main className="mx-auto px-4 py-8 sm:px-6 max-w-7xl font-sans">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <h2 className="text-4xl font-black text-stone-900 mt-0 tracking-tight">
                        Chỉnh sửa thông tin nhân viên
                    </h2>

                    <button className="bg-stone-900 hover:bg-black text-white font-bold
                    py-3 px-6 rounded-2xl shadow-xl shadow-stone-900/20 transition-transform
                    transform hover:-translate-y-1 flex items-center gap-2"
                    onClick={() => navigate('/admin/manage-employee')}>
                        <span className=""><ArrowLeft/></span>Quay về
                    </button>
                </div>

                
            </main>
        </div>
    );
};

export default Admin_ManageEmployee_Edit;
