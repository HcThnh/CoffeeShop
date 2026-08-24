import { useState, useEffect } from "react";
import Emp_Header from "./Emp_Header"; 
import "../assets/css/Emp_OrderForm.css"; 
import axios from "axios";

import traSenVangImage from "../assets/img/tra-sen-vang.svg";
import { useRef, useMemo } from "react";
import { LoaderCircle, CircleCheck, X, ShoppingBag } from "lucide-react";

const formatPrice = (price) => {
  return price.toLocaleString("vi-VN") + "đ";
};

const Emp_OrderForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
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

        <div className="md:flex flex-col hidden w-80 shrink-0">
          <div className="py-4 px-5 border border-stone-200 rounded-3xl flex flex-col bg-white shadow-sm">
            <h2 className="text-xl font-bold text-stone-850 mb-4 pb-2 border-b border-stone-100">
              Đơn hàng
            </h2>
            <div>
              <div className="flex flex-col gap-1.5 mb-4">
                <label htmlFor="phoneNumber" className="text-xs font-bold text-stone-400 uppercase tracking-wider">Số điện thoại khách</label>
                <input 
                  type="text" 
                  placeholder="Nhập số điện thoại"
                  className="w-full px-3 py-2 text-sm text-stone-850 bg-stone-50 border border-stone-200
                  rounded-xl placeholder:text-stone-400 placeholder:font-normal focus:outline-none focus:border-amber-500
                  focus:bg-white transition-all font-medium"
                  id="phoneNumber"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                {selectedProducts.map((selectedItem, index) => {
                  const ordItem = ord.find((item) => item.id === selectedItem.productId);
                  if (!ordItem) return null;

                  return (
                    <div className="flex justify-between items-center py-2 border-b border-stone-100 text-sm" key={index}>
                      <div className="flex flex-col max-w-[120px]">
                        <span className="font-semibold text-stone-800 truncate">{ordItem.name}</span>
                        <span className="text-xs text-amber-600 font-bold">{formatPrice(ordItem.unit_price)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(selectedItem.productId, "decrease")}
                        className="cursor-pointer p-1 rounded-full hover:bg-stone-200 bg-stone-100 w-6 h-6 flex items-center justify-center font-bold text-stone-600 focus:outline-none"
                        type="button">-</button>
                        <span className="font-bold text-xs text-stone-800 w-4 text-center">{selectedItem.quantity}</span>
                        <button onClick={() => updateQuantity(selectedItem.productId, "increase")}
                        className="cursor-pointer p-1 rounded-full hover:bg-stone-200 bg-stone-100 w-6 h-6 flex items-center justify-center font-bold text-stone-600 focus:outline-none"
                        type="button">+</button>
                      </div>
                      <span className="font-bold text-stone-700 text-xs">
                        {formatPrice(ordItem.unit_price * selectedItem.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {selectedProducts.length > 0 && (
                <div className="pt-4 border-t border-stone-100 mt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-stone-500">Tổng thanh toán</span>
                    <span className="text-lg font-black text-amber-600">
                      {formatPrice(selectedProducts.reduce((sum, item) => {
                        const prodItem = ord.find((p) => p.id === item.productId);
                        return sum + (prodItem ? prodItem.unit_price * item.quantity : 0);
                      }, 0))}
                    </span>
                  </div>
                  <button id="confirm-order"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none text-sm"
                  onClick={createOrder}>
                    Xác nhận
                  </button>
                </div>
              )}
            </div>
          </div>

          {err && (
            <div className="mt-4 p-3 border border-red-100 bg-red-50 rounded-2xl flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-red-700 font-bold text-xs">Không thể tạo đơn hàng</p>
                <p className="text-red-500 text-[11px] mt-0.5">Kiểm tra lại số điện thoại khách hàng</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Floating Action Cart Bar */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden w-[90%] max-w-sm">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-amber-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-xl flex items-center justify-between hover:bg-amber-700 transition-all focus:outline-none animate-fade-in-up"
          >
            <div className="flex items-center gap-2">
              <span className="bg-white text-amber-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-sm">
                {selectedProducts.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
              <span>Xem đơn hàng</span>
            </div>
            <span className="font-black">
              {formatPrice(selectedProducts.reduce((sum, item) => {
                const prodItem = ord.find((p) => p.id === item.productId);
                return sum + (prodItem ? prodItem.unit_price * item.quantity : 0);
              }, 0))}
            </span>
          </button>
        </div>
      )}

      {/* Mobile Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm flex flex-col justify-end">
          <div className="flex-1" onClick={() => setIsCartOpen(false)}></div>
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl border-t border-stone-100 flex flex-col transition-transform duration-300 transform translate-y-0">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-stone-100">
              <h3 className="text-lg font-bold text-stone-850">Chi tiết đơn hàng</h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-xl bg-stone-50 text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-all focus:outline-none shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 overflow-y-auto max-h-[40vh] pr-1">
              <div className="flex flex-col gap-1.5 mb-2">
                <label htmlFor="phoneNumberMobile" className="text-xs font-bold text-stone-400 uppercase tracking-wider">Số điện thoại khách hàng</label>
                <input 
                  type="text" 
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-3 text-sm text-stone-850 bg-stone-50 border border-stone-200
                  rounded-xl placeholder:text-stone-400 placeholder:font-normal focus:outline-none focus:border-amber-500
                  focus:bg-white transition-all font-medium"
                  id="phoneNumberMobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              <div className="space-y-3.5">
                {selectedProducts.map((selectedItem, index) => {
                  const ordItem = ord.find((item) => item.id === selectedItem.productId);
                  if (!ordItem) return null;

                  return (
                    <div className="flex justify-between items-center py-2 border-b border-stone-100 text-sm" key={index}>
                      <div className="flex flex-col max-w-[150px]">
                        <span className="font-semibold text-stone-800 truncate">{ordItem.name}</span>
                        <span className="text-xs text-amber-600 font-bold">{formatPrice(ordItem.unit_price)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(selectedItem.productId, "decrease")}
                        className="cursor-pointer p-1 rounded-full hover:bg-stone-200 bg-stone-100 w-7 h-7 flex items-center justify-center font-bold text-stone-600 focus:outline-none"
                        type="button">-</button>
                        <span className="font-bold text-stone-850 text-sm w-4 text-center">{selectedItem.quantity}</span>
                        <button onClick={() => updateQuantity(selectedItem.productId, "increase")}
                        className="cursor-pointer p-1 rounded-full hover:bg-stone-200 bg-stone-100 w-7 h-7 flex items-center justify-center font-bold text-stone-600 focus:outline-none"
                        type="button">+</button>
                      </div>
                      <span className="font-bold text-stone-700 text-xs">
                        {formatPrice(ordItem.unit_price * selectedItem.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="pt-6 border-t border-stone-100 mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-stone-500 text-sm">Tổng thanh toán</span>
                <span className="text-xl font-black text-amber-600">
                  {formatPrice(selectedProducts.reduce((sum, item) => {
                    const prodItem = ord.find((p) => p.id === item.productId);
                    return sum + (prodItem ? prodItem.unit_price * item.quantity : 0);
                  }, 0))}
                </span>
              </div>
              
              <button 
                onClick={(e) => {
                  createOrder(e);
                  setIsCartOpen(false);
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all focus:outline-none"
              >
                Xác nhận đơn hàng
              </button>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed z-50 top-20 left-1/2 -translate-x-1/2 flex bg-emerald-500 text-white py-3.5 px-6 rounded-2xl shadow-xl items-center gap-2 border border-emerald-400/20 animate-fade-in-up font-bold text-sm">
          <CircleCheck className="w-5 h-5 text-white" />  
          <span>Tạo đơn hàng thành công!</span>
        </div>
      )}
    </div>
  );
};

export default Emp_OrderForm;
