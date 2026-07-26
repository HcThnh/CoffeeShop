import { useState, useEffect } from "react";
import Emp_Header from "./Emp_Header"; 
import "../assets/css/Emp_OrderForm.css"; 
import axios from "axios";

import traSenVangImage from "../assets/img/tra-sen-vang.svg";
import { useRef, useMemo } from "react";
import { LoaderCircle, CircleCheck } from "lucide-react";

const formatPrice = (price) => {
  return price.toLocaleString("vi-VN") + "đ";
};

const Emp_OrderForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productName, setProductName] = useState("");

  const [selectedProducts, setSelectedProducts] = useState([]);

  const [success, setSuccess] = useState(false);

  const addProductToOrder = (product) => {
    setSelectedProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((item) =>
            item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 } // Tạo object mới
                : item
        );

        if (!updatedProducts.some((item) => item.productId === product.id)) {
            updatedProducts.push({ productId: product.id, quantity: 1 }); // Thêm sản phẩm mới
        }

        return updatedProducts;
    });
  };  

  const updateQuantity = (productId, action) => {
    setSelectedProducts((prevProducts) =>
      prevProducts
        .map((item) =>
          item.productId === productId
            ? { 
                ...item, 
                quantity: action === "increase" 
                  ? item.quantity + 1 
                  : item.quantity === 1 
                  ? 0 
                  : item.quantity - 1 
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const [err, setErr] = useState("");
  const [ord, setOrd] = useState([]);

  useEffect(() => {
    const getOrder = async() => {
      setIsLoading(true);

      try {
        const token = await axios.get(
          "https://coffeeshop-api-udqx.onrender.com/public/menu",
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        )
        setOrd(token.data);
      }
      catch(error) {
        setErr(error.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getOrder();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const [phone, setPhone] = useState("");

  const createOrder = async(e) => {
    e.preventDefault();

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const dateString = `${year}-${month}-${day}`;
    
    if (!phone || phone.trim() === "") {
      alert("Vui lòng nhập số điện thoại khách hàng.");
      return;
    }
    if (!selectedProducts || selectedProducts.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm.");
      return;
    }

    const order = {
      order_time: dateString,
      customerPhoneNumber: phone,
      producList: selectedProducts
    }
    const token = localStorage.getItem("token");
    console.log(order);
    try {
      await axios.post(
        "https://coffeeshop-api-udqx.onrender.com/employee/order/create",
        order, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      )

      setPhone("");
      setSuccess(true);
    }
    catch(err) {
      setErr(err.message);
    }
    setSelectedProducts([]);
  }

  const filterProduct = useMemo(() => {
    const searchTerm = productName.toLowerCase().trim();

    return ord.filter((product) => {
      return (product?.name ?? "").toLowerCase().includes(searchTerm);
    })
  }, [productName, ord]);

  return (
    <div className="min-h-screen bg-stone-100 font-sans">
      <Emp_Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between gap-4">
        {isLoading ? (
          <div className="bg-stone-100 flex items-center justify-center 
                min-h-[calc(100vh-150px)] w-full">
            <LoaderCircle className="w-10 h-10 animate-spin text-stone-400" 
            strokeWidth={3.5}/>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="p-2 flex-1">
              <input type="text"
              placeholder="Nhập tên sản phẩm..."
              className="lg:w-[400px] px-2 py-2 placeholder:text-sm border border-gray-300 
              rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300"
              id="nameProduct"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}/>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 p-2">
              {filterProduct.map((product, index) => (
                <div 
                  key={product.id || index} 
                  onClick={() => addProductToOrder(product)}
                  className="group relative bg-white border border-gray-100 rounded-2xl p-3
                            shadow-sm hover:shadow-xl 
                            transition-all duration-300 cursor-pointer flex flex-col justify-between
                            overflow-hidden"
                >
                  <div>
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
                      <img 
                        src={traSenVangImage} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>

                    <p className="font-sans font-semibold text-gray-800 text-sm md:text-base line-clamp-2 mb-1 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-2">
                    <p className="font-sans font-bold text-amber-600 text-sm md:text-base">
                      {formatPrice(product.unit_price)}
                    </p>
                    
                    <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                      +
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="md:flex flex-col hidden">
          <div className="py-2 px-3 border border-gray-300 rounded-lg max-h-fit flex flex-col
          bg-white">
            <h2 className="m-4 font-semibold ">
              Đơn hàng</h2>
            <div>
              <p className="flex flex-col gap-2">
                Khách hàng: 
                <input 
                  type="text" 
                  placeholder="Nhập số điện thoại khách hàng"
                  className="font-sans mb-4 text-sm text-gray-800 bg-transparent border-0 border-b-2
                  border-gray-300 rounded-none placeholder:text-gray-400 placeholder:font-normal
                  focus:outline-none focus:border-amber-500 transition-colors duration-200
                  py-2 px-1"
                  id="phoneNumber"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </p>
              {selectedProducts.map((selectedItem, index) => {
                const ordItem = ord.find((item) => item.id === selectedItem.productId);

                if (!ordItem) return null;

                return (
                  <div className="py-1 grid grid-cols-[1fr_1fr_1fr] items-center gap-3" key={index}>
                    <span className="font-semibold">{ordItem.name}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQuantity(selectedItem.productId, "decrease")}
                      className="cursor-pointer p-1 rounded-full hover:bg-stone-300
                      bg-stone-100 w-6 h-6 flex items-center justify-center font-bold text-gray-700
                      transition-colors select-none"
                      type="button">-</button>
                      <span>{selectedItem.quantity}</span>
                      <button onClick={() => updateQuantity(selectedItem.productId, "increase")}
                      className="cursor-pointer p-1 rounded-full hover:bg-stone-300
                      bg-stone-100 w-6 h-6 flex items-center justify-center font-bold text-gray-700
                      transition-colors select-none"
                      type="button">+</button>
                    </div>
                    <span className="flex justify-end">
                      {formatPrice(ordItem.unit_price * selectedItem.quantity)}</span>
                  </div>
                );
              })}

              <div className="flex justify-center">
                <button id="confirm-order"
                className="mt-5 mb-3 py-1 px-3 rounded-lg bg-emerald-300 font-semibold
                hover:bg-emerald-400 transition-all duration-200"
                onClick={createOrder}>
                  Xác nhận
                </button>
              </div>
            </div>
          </div>

          {err && (
            <div className="mt-4 p-3 border-2 border-red-200 bg-red-50 rounded-lg">
              <p className="text-red-600 font-semibold">Không thể tạo đơn hàng</p>
              <p className="text-red-500">Kiểm tra lại số điện thoại khách hàng</p>
            </div>
          )}
        </div>
      </main>

      {success && <div className="absolute z-10 top-[80px] left-1/2 -translate-x-1/2 flex
      bg-emerald-300 py-3 px-6 rounded-lg items-center gap-2">
        <CircleCheck className="w-8 h-8 text-emerald-700 " />  
        <p className="font-semibold">Tạo đơn hàng thành công</p>
      </div>}
    </div>
  );
};

export default Emp_OrderForm;
