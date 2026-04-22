import React, { useState, useEffect } from 'react';
import Admin_Header from './Admin_Header'; 
import "../assets/css/Admin_ManageProduct.css"; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Admin_ManageProduct = () => {
    const [productData, setProductData] = useState([]);
    const [filters, setFilters] = useState({
        id: '',
        name: '',
        rating: '',
        description: '',
        price: '',
        discount: '',
    });

    const navigate = useNavigate(); 
    const [prod, setProd] = useState([]);
    const [err, setErr] = useState("");

    // Giả lập API để lấy dữ liệu sản phẩm
    useEffect(() => {
        const getProduct = async(e) => {
            try {
                const res = await axios.get(
                    "https://coffeeshop-api-udqx.onrender.com/public/menu",
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                )
                setProd(res.data);
                console.log(res.data);
            }
            catch(err) {
                setErr(err.message);
            }
        }

        getProduct();

        const data = [
            { id: "001", name: "Phindi cafe", rating: "4.8", description: "#N/A", price: "47,000 VNĐ", discount: "0%" },
            { id: "002", name: "Trà Sen Vàng", rating: "4.6", description: "#N/A", price: "45,000 VNĐ", discount: "10%" },
            { id: "003", name: "Phindi Choco", rating: "4.9", description: "#N/A", price: "50,000 VNĐ", discount: "5%" },
            { id: "004", name: "Trà Xanh Đậu Đỏ", rating: "4.7", description: "#N/A", price: "42,000 VNĐ", discount: "0%" },
            { id: "005", name: "Phindi Vanilla", rating: "4.5", description: "#N/A", price: "48,000 VNĐ", discount: "15%" },
        ];
        setProductData(data);
    }, []);

    // Lọc dữ liệu
    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        setFilters((prev) => ({ ...prev, [id]: value.toLowerCase() }));
    };

    const filteredData = productData.filter((product) => {
        return (
            (!filters.id || product.id.toLowerCase().includes(filters.id)) &&
            (!filters.name || product.name.toLowerCase().includes(filters.name)) &&
            (!filters.rating || product.rating.toLowerCase().includes(filters.rating)) &&
            (!filters.description || product.description.toLowerCase().includes(filters.description)) &&
            (!filters.price || product.price.toLowerCase().includes(filters.price)) &&
            (!filters.discount || product.discount.toLowerCase().includes(filters.discount))
        );
    });

    const handleEditProductClick = () => {
        navigate("/admin/manage-product/edit");
    };

    return (
        <div>
            {/* Header */}
            <Admin_Header />

            {/* Nội dung chính */}
            <h2 className="product-title">QUẢN LÝ SẢN PHẨM</h2>

            {/* Nút Thông tin quà & sản phẩm */}
            <button className="edit-product-button" onClick={handleEditProductClick}>Thông tin quà & sản phẩm</button>

            {/* Bảng sản phẩm */}
            <div className="product-table-container">
                <table id="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Rating</th>
                            <th>Mô tả</th>
                            <th>Đơn giá</th>
                            <th>Giảm giá</th>
                        </tr>
                    </thead>
                    <tbody className="filter-row">
                        <tr>
                            <td><input type="text" id="id" className="filter-input" placeholder="Lọc theo ID" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="name" className="filter-input" placeholder="Lọc theo tên sản phẩm" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="rating" className="filter-input" placeholder="Lọc theo rating" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="description" className="filter-input" placeholder="Lọc theo mô tả" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="price" className="filter-input" placeholder="Lọc theo đơn giá" onChange={handleFilterChange} /></td>
                            <td><input type="text" id="discount" className="filter-input" placeholder="Lọc theo giảm giá" onChange={handleFilterChange} /></td>
                        </tr>
                    </tbody>
                    <tbody id="product-data">
                        {prod.map((product, index) => (
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.rating}</td>
                                <td>{product.description}</td>
                                <td>{product.unit_price}</td>
                                <td>{product.discount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin_ManageProduct;
