# Dự án CoffeeShop

Hệ thống quản lý và đặt hàng Coffee Shop bao gồm backend Java Spring Boot và hai phân hệ giao diện người dùng React + Vite (Admin/Nhân viên và Khách hàng).

---

## Liên kết Triển khai (Production Links)

* **Khởi động Backend API**: [https://coffeeshop-api-udqx.onrender.com](https://coffeeshop-api-udqx.onrender.com)
* **Giao diện Admin & Nhân viên**: [https://coffee-shop-itfn.vercel.app](https://coffee-shop-itfn.vercel.app)
* **Giao diện Khách hàng**: [https://coffee-shop-bice.vercel.app/login](https://coffee-shop-bice.vercel.app/login)

---

## Cấu trúc Thư mục Dự án

```
CoffeeShop/
├── admin/               # Giao diện dành cho Admin & Nhân viên (React + Vite)
├── userfe/              # Giao diện dành cho Khách hàng (React + Vite)
├── src/                 # Mã nguồn backend Spring Boot (Java 17)
├── pom.xml              # File cấu hình Maven cho backend
├── Dockerfile           # Dockerfile để build backend
└── README.md            # Tài liệu hướng dẫn này (File hiện tại)
```

---

## Yêu cầu Hệ thống (Prerequisites)

Trước khi khởi động ứng dụng dưới local, hãy chắc chắn máy tính của bạn đã cài đặt:
1. **Java JDK 17** trở lên.
2. **Node.js** (Phiên bản LTS từ v18 hoặc v20 trở lên) và **npm**.
3. **Maven** (không bắt buộc, có thể dùng trực tiếp Maven Wrapper `./mvnw` đi kèm dự án).

---

## Hướng dẫn Khởi động Dự án dưới Local

### 1. Khởi động Backend (Spring Boot)

Backend sử dụng cơ sở dữ liệu PostgreSQL lưu trữ trên đám mây (Neon DB) được cấu hình mặc định trong file `src/main/resources/application.properties`. Bạn không cần thiết lập database local trừ khi muốn thay đổi cấu hình.

#### Bước 1: Mở terminal tại thư mục gốc của dự án.
#### Bước 2: Chạy dự án bằng lệnh:

* **Trên Windows (PowerShell / Command Prompt):**
  ```powershell
  .\mvnw.cmd spring-boot:run
  ```
* **Trên Linux / macOS:**
  ```bash
  chmod +x mvnw
  ./mvnw spring-boot:run
  ```

Mặc định, backend sẽ khởi động tại địa chỉ: `http://localhost:8080`

> [!NOTE]
> Nếu bạn muốn thay đổi thông tin kết nối database (ví dụ chạy database cục bộ), hãy cập nhật các biến môi trường hoặc thay đổi trực tiếp các cấu hình sau trong file [application.properties](file:///d:/Documents/BK4/CoffeeShop/src/main/resources/application.properties):
> - `spring.datasource.url`
> - `spring.datasource.username`
> - `spring.datasource.password`

---

### 2. Khởi động Frontend Admin & Nhân viên (`admin`)

Dành cho quản lý quán, nhân viên tạo đơn và quản lý hệ thống.

#### Bước 1: Di chuyển vào thư mục `admin`:
```bash
cd admin
```

#### Bước 2: Cài đặt các thư viện phụ thuộc (dependencies):
```bash
npm install
```

#### Bước 3: Khởi động server phát triển (Development mode):
```bash
npm run dev
```

Ứng dụng sẽ chạy tại địa chỉ mặc định: `http://localhost:5173` (hoặc cổng hiển thị trong Terminal của bạn).

---

### 3. Khởi động Frontend Khách hàng (`userfe`)

Dành cho khách hàng xem thực đơn, tích điểm và đổi quà.

#### Bước 1: Di chuyển vào thư mục `userfe`:
```bash
cd userfe
```

#### Bước 2: Cài đặt các thư viện phụ thuộc (dependencies):
```bash
npm install
```

#### Bước 3: Khởi động ứng dụng:
```bash
npm run start
```

Ứng dụng sẽ tự động mở hoặc chạy tại địa chỉ: `http://localhost:3000`

---

## Khởi động Backend bằng Docker (Optional)

Dự án đã cấu hình sẵn [Dockerfile](file:///d:/Documents/BK4/CoffeeShop/Dockerfile) cho backend. Để chạy backend bằng Docker:

1. **Build Docker Image:**
   ```bash
   docker build -t coffeeshop-backend .
   ```
2. **Chạy Docker Container:**
   ```bash
   docker run -p 8080:8080 coffeeshop-backend
   ```
