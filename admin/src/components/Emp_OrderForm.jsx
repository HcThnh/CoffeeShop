import React, { useState, useEffect } from "react";
import Emp_Header from "./Emp_Header"; 
import "../assets/css/Emp_OrderForm.css"; 
import axios from "axios";

import traSenVangImage from "../assets/img/tra-sen-vang.svg";
import phindiChocoImage from "../assets/img/phindi.svg";
import phindiCassiaImage from "../assets/img/Phindi-Cassia.jpg";
import freezeTraxanhImage from "../assets/img/FREEZE-TRA-XANH.jpg";
import freezeChocoImage from "../assets/img/FREEZE-CHOCO.jpg";
import traThachDaoImage from "../assets/img/TRA_THANH_DAO.jpg";
import traThachVaiImage from "../assets/img/TRA_TACH_VAI.jpg";
import { useRef } from "react";

// Hàm định dạng giá tiền
const formatPrice = (price) => {
  return price.toLocaleString("vi-VN") + "đ";
};

const Emp_OrderForm = () => {
  const [notification, setNotification] = useState(""); // Trạng thái thông báo
  const [orderDetails, setOrderDetails] = useState([]); // Lưu thông tin đơn hàng
  const [customerId, setCustomerId] = useState(""); // Mã khách hàng
  const [pointsUsed, setPointsUsed] = useState(0); // Điểm sử dụng

  // Dữ liệu sản phẩm
  const mockProductData = [
    { id: "001", name: "Trà sen vàng", price: 46000, image: traSenVangImage },
    { id: "002", name: "Phindi choco", price: 47000, image: phindiChocoImage },
    { id: "003", name: "Phindi Cassia", price: 50000, image: phindiCassiaImage },
    { id: "004", name: "Freeze trà xanh", price: 42000, image: freezeTraxanhImage },
    { id: "005", name: "Freeze Choco", price: 44000, image: freezeChocoImage },
    { id: "006", name: "Trà thanh đào", price: 45000, image: traThachDaoImage },
    { id: "007", name: "Trà thanh vải", price: 40000, image: traThachVaiImage },
    { id: "001", name: "Trà sen vàng", price: 46000, image: traSenVangImage },
    { id: "002", name: "Phindi choco", price: 47000, image: phindiChocoImage },
    { id: "003", name: "Phindi Cassia", price: 50000, image: phindiCassiaImage },
    { id: "004", name: "Freeze trà xanh", price: 42000, image: freezeTraxanhImage },
    { id: "005", name: "Freeze Choco", price: 44000, image: freezeChocoImage },
    { id: "006", name: "Trà thanh đào", price: 45000, image: traThachDaoImage },
    { id: "007", name: "Trà thanh vải", price: 40000, image: traThachVaiImage },
    { id: "001", name: "Trà sen vàng", price: 46000, image: traSenVangImage },
    { id: "002", name: "Phindi choco", price: 47000, image: phindiChocoImage },
    { id: "003", name: "Phindi Cassia", price: 50000, image: phindiCassiaImage },
    { id: "004", name: "Freeze trà xanh", price: 42000, image: freezeTraxanhImage },
    { id: "005", name: "Freeze Choco", price: 44000, image: freezeChocoImage },
    { id: "006", name: "Trà thanh đào", price: 45000, image: traThachDaoImage },
    { id: "007", name: "Trà thanh vải", price: 40000, image: traThachVaiImage },
  ];

  const [selectedProducts, setSelectedProducts] = useState([]);

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

  // Cập nhật số lượng món
  const updateQuantity = (id, action) => {
    setOrderDetails(orderDetails.map(item =>
      item.id === id
        ? { 
            ...item, 
            quantity: action === "increase" 
              ? item.quantity + 1 
              : item.quantity === 1 
              ? 0 // Xóa món khi số lượng là 1 và nhấn nút giảm
              : item.quantity - 1
        }
        : item
    ).filter(item => item.quantity > 0)); // Xóa món khỏi đơn hàng nếu số lượng là 0
  };

  // Tính tổng tiền và tích điểm
  const calculateTotal = () => {
    let subtotal = 0;
    orderDetails.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    // Tính voucher giảm giá
    const discountAmount = (pointsUsed / 10 > 25 ? 25 : pointsUsed / 10) / 100;
    const totalAfterDiscount = subtotal * (1 - discountAmount);

    const pointsEarned = Math.floor(totalAfterDiscount / 100); // Tích điểm

    return {
      totalAfterDiscount,
      pointsEarned,
      discountAmount: discountAmount * 100, // Chuyển đổi về % để hiển thị
    };
  };

  // Xử lý xác nhận đơn hàng
  const handleConfirmOrder = () => {
    setNotification("Tạo đơn hàng thành công");
    setTimeout(() => {
      setNotification(""); // Reset thông báo
      setOrderDetails([]); // Reset đơn hàng
      setCustomerId(""); // Reset ID khách hàng
      setPointsUsed(0); // Reset điểm sử dụng
    }, 3000); // Sau 3 giây reset đơn hàng
  };

  const { totalAfterDiscount, pointsEarned, discountAmount } = calculateTotal();

  const [err, setErr] = useState("");
  const [ord, setOrd] = useState([]);

  useEffect(() => {
    const getOrder = async(e) => {
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
      catch(err) {
        setErr(err.message);
      }
    }

    getOrder();
  }, []);

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }

  const orderChunks = chunkArray(ord, 5);
  const phoneRef = useRef("");

  const createOrder = async(e) => {
    e.preventDefault();

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const dateString = `${year}-${month}-${day}`;
    const phone = phoneRef.current.value;
    
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
      const res = await axios.post(
        "https://coffeeshop-api-udqx.onrender.com/employee/order/create",
        order, {
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
    setSelectedProducts([]);
  }

  return (
    <div>
      <Emp_Header /> {/* Header */}
      <main className="orderform-main-content">
        <div className="menu">
          {orderChunks.map((chunk, rowIndex) => (
            <div className="inMenu" key={rowIndex}>
              {chunk.map((product, index) => (
                <div className="item" key={index} onClick={() => addProductToOrder(product)}>
                  <a href="#" className="product-link">
                    <img src={traSenVangImage} alt={product.name} className="product-image" />
                  </a>
                  <p>{product.name}</p>
                  <p>{formatPrice(product.unit_price)}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="order">
          <h2>Đơn hàng</h2>
          <div className="order-details" id="order-details">
            <p>Khách hàng: 
              <input 
                type="text" 
                placeholder="Nhập ID khách hàng" 
                ref={phoneRef}
              />
            </p>
            {selectedProducts.map((selectedItem, index) => {
              // Tìm sản phẩm trong mảng 'ord' có id trùng với selectedItem.id
              const ordItem = ord.find((item) => item.id === selectedItem.productId);

              // Nếu không tìm thấy sản phẩm trong 'ord', bỏ qua phần tử này
              if (!ordItem) return null;

              return (
                <div className="order-item" key={index}>
                  <span>{ordItem.name}</span>
                  <div className="quantity-control">
                    <span onClick={() => updateQuantity(selectedItem.productId, "decrease")}>-</span>
                    <span>{selectedItem.quantity}</span>
                    <span onClick={() => updateQuantity(selectedItem.productId, "increase")}>+</span>
                  </div>
                  <span>{formatPrice(ordItem.unit_price * selectedItem.quantity)}</span>
                </div>
              );
            })}
            {/* <div className="summary">
              <p>Điểm sử dụng: 
                <input 
                  type="number" 
                  value={pointsUsed} 
                  onChange={(e) => setPointsUsed(Number(e.target.value))} 
                  min="0" 
                />
              </p>
              <p>Voucher giảm giá: {discountAmount}%</p>
              <p>Tích điểm: {pointsEarned}</p>
              <p><strong>Tổng: {formatPrice(totalAfterDiscount)}</strong></p>
            </div> */}
            <button id="confirm-order" onClick={createOrder}>Xác nhận</button>
          </div>
        </div>
      </main>

      {/* Thông báo */}
      {notification && (
        <div className="notification show">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Emp_OrderForm;
