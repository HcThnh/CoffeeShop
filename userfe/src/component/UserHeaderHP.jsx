import './UserHeaderHP.css'
import { Link, useNavigate } from 'react-router-dom';

function HeaderHomePage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        navigate('/login');
        const token = localStorage.getItem("token");
        console.log(token);
    };

    return (
        <>
            <div className="header-homepage">
                <div className="header-homepage-withmargin">
                    <div className="nav-header-homepage">
                        <div className="sub-nav-header-homepage sub-nav-header-homepage-name">
                            CoffeeShop
                        </div>
                        <div className="sub-nav-header-homepage sub-nav-header-homepage2">
                            <ul className="list-nav-header-homepage">
                                <li>
                                    <Link to="/customer">Giới thiệu</Link>
                                </li>
                                <li>
                                    <Link to="/customer/product">Sản phẩm</Link>
                                </li>
                                <li>
                                    <Link to="/customer/exchange">Đổi quà</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Đăng xuất</button>
                                </li>
                            </ul>
                        </div>
                        <div className="sub-nav-header-homepage">
                            <div className="sub-nav-header-homepage-contain-avt">
                                <Link to="/customer/info">
                                    <img src={require(`../img/Avatar.png`)} alt=""/>
                                </Link>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 576 512" className="sub-nav-header-homepage-bell">
                                    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="header-homepage-under-nav">
                        <div className="header-homepage-under-nav-introduce">
                            <p>Chào mừng đến với Coffee Shop</p>
                            <p className="header-homepage-under-nav-logan">Thưởng thức các loại cà phê nổi tiếng trong và ngoài nước với mức giá tốt nhất.</p>
                        </div>
                        <div className="header-homepage-under-nav-image">
                            <div className="header-homepage-under-nav-i1">
                                <img src={require(`../img/cf.jpg`)} alt=""/>
                            </div>
                            <div className="header-homepage-under-nav-i2">
                                <img src={require(`../img/pexels-goumbik-942768.jpg`)} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderHomePage;