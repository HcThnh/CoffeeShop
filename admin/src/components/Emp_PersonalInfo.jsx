import { useEffect, useState } from "react";
import Emp_Header from "./Emp_Header"; 
import "../assets/css/Emp_PersonalInfo.css"; 
import axios from "axios";
import { SquarePen, CircleX, LoaderCircle, CircleCheck } from "lucide-react";

const Emp_PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState("");
  const [success, setSuccess] = useState(false);

  const handleButtonEdit = (type) => {
    if (isEditing === type) {
      setIsEditing("");
      return;
    } else {
      setIsEditing(type);
      return;
    }
  }

  const [err, setErr] = useState("");
  const [info, setInfo] = useState([]);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getInfo = async() => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          "https://coffeeshop-api-udqx.onrender.com/employee/get/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        )
        setInfo(res.data);
        setName(res.data.name);
        setDob(res.data.dob);
        setPhone(res.data.phoneNumber);
        setAddress(res.data.address);
        setGender(res.data.gender);
      }
      catch(err) {
        setErr(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    getInfo();
  }, []);

  const updateEmp = async() => {
    const token = localStorage.getItem("token");

    const emp = {
      dob: dob,
      phoneNumber: phone,
      address: address,
      gender: gender,
      name: name
    }

    try {
      await axios.patch(
        "https://coffeeshop-api-udqx.onrender.com/employee/update/info",
        emp, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      )

      setSuccess(true);
    }
    catch(err) {
      setErr(err.message);
    }
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        return setSuccess(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Emp_Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="bg-white flex items-center justify-center 
                min-h-[calc(100vh-150px)] w-full">
            <LoaderCircle className="w-10 h-10 animate-spin text-stone-400" 
            strokeWidth={3.5}/>
          </div>
        ) : (
          err ? (
            <div className="flex items-center justify-center flex-col bg-red-100 border-2 border-red-200
            py-10 rounded-lg gap-2">
              <CircleX className="w-10 h-10 text-red-500 "/>
              <p className="font-semibold">Đã xảy ra lỗi khi truy cập trang web</p>
            </div>
          ) : 
          (
            <div className="border-2 border-gray-100 rounded-lg px-4 py-6">
              <p className="font-semibold text-lg">
                Thông tin cá nhân
              </p>
              <p>Quản lý thông tin cá nhân chi tiết bao gồm tên, ngày sinh, giới tính, số điện thoại và địa chỉ</p>

              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-x-8 gap-y-6">
                <div>
                  <p className="pb-1.5 text-sm font-bold text-stone-700">Họ và tên</p>
                  <div className="flex flex-1 justify-between gap-3 items-center">
                    <input type="text"
                    className="flex-1 border border-stone-200 px-3 rounded-xl text-sm py-2.5
                    focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/30 disabled:bg-stone-100/50 disabled:text-stone-500 transition-all font-medium"
                    id="personalName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isEditing !== "change-name"}/>

                    <button
                    type="button"
                    className="w-10 h-10 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700
                    transition-all duration-200 rounded-xl flex items-center justify-center border border-amber-200/50 focus:outline-none shrink-0"
                    onClick={() => handleButtonEdit("change-name")}>
                      <SquarePen className="w-5 h-5"/>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="pb-1.5 text-sm font-bold text-stone-700">Ngày sinh</p>
                  <div className="flex flex-1 justify-between gap-3 items-center">
                    <input type="date"
                    className="flex-1 border border-stone-200 px-3 rounded-xl text-sm py-2.5
                    focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/30 disabled:bg-stone-100/50 disabled:text-stone-500 transition-all font-medium"
                    id="personalDob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    disabled={isEditing !== "change-dob"}/>

                    <button
                    type="button"
                    className="w-10 h-10 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700
                    transition-all duration-200 rounded-xl flex items-center justify-center border border-amber-200/50 focus:outline-none shrink-0"
                    onClick={() => handleButtonEdit("change-dob")}>
                      <SquarePen className="w-5 h-5"/>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="pb-1.5 text-sm font-bold text-stone-700">Số điện thoại</p>
                  <div className="flex flex-1 justify-between gap-3 items-center">
                    <input type="text" 
                    className="flex-1 border border-stone-200 px-3 rounded-xl text-sm py-2.5
                    focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/30 disabled:bg-stone-100/50 disabled:text-stone-500 transition-all font-medium"
                    id="personalPhone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isEditing !== "change-phone"}/>

                    <button
                    type="button"
                    className="w-10 h-10 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700
                    transition-all duration-200 rounded-xl flex items-center justify-center border border-amber-200/50 focus:outline-none shrink-0"
                    onClick={() => handleButtonEdit("change-phone")}>
                      <SquarePen className="w-5 h-5"/>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="pb-1.5 text-sm font-bold text-stone-700">Địa chỉ</p>
                  <div className="flex flex-1 justify-between gap-3 items-center">
                    <input type="text"
                    className="flex-1 border border-stone-200 px-3 rounded-xl text-sm py-2.5
                    focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/30 disabled:bg-stone-100/50 disabled:text-stone-500 transition-all font-medium"
                    id="personalAddress"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={isEditing !== "change-address"} />

                    <button
                    type="button"
                    className="w-10 h-10 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700
                    transition-all duration-200 rounded-xl flex items-center justify-center border border-amber-200/50 focus:outline-none shrink-0"
                    onClick={() => handleButtonEdit("change-address")}>
                      <SquarePen className="w-5 h-5"/>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="pb-1.5 text-sm font-bold text-stone-700">Giới tính</p>
                  <div className="flex flex-1 justify-between gap-3 items-center">
                    <select
                    className="flex-1 border border-stone-200 px-3 rounded-xl text-sm py-2.5
                    focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/30 disabled:bg-stone-100/50 disabled:text-stone-500 transition-all font-medium cursor-pointer"
                    id="personalGender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={isEditing !== "change-gender"}>
                      <option value="M">Nam</option>
                      <option value="F">Nữ</option>
                    </select>

                    <button
                    type="button"
                    className="w-10 h-10 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700
                    transition-all duration-200 rounded-xl flex items-center justify-center border border-amber-200/50 focus:outline-none shrink-0"
                    onClick={() => handleButtonEdit("change-gender")}>
                      <SquarePen className="w-5 h-5"/>
                    </button>
                  </div>  
                </div>

                <div className="md:col-span-2 flex justify-end mt-4">
                  <button className="w-full sm:w-auto py-2.5 px-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-emerald-500/20 focus:outline-none"
                  onClick={() => updateEmp()}>
                    Lưu thay đổi
                  </button>
                </div>
              </div>

              {success && <div className="absolute z-10 left-1/2 -translate-x-1/2 top-[80px] flex 
              bg-emerald-300 py-3 px-6 rounded-lg gap-2 items-center">
                <CircleCheck className="w-8 h-8 text-emerald-700"/>
                <p className="font-semibold">Cập nhật thông tin thành công!</p>
              </div>}
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default Emp_PersonalInfo;
