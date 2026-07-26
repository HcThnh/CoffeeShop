function FooterPage() {
  return (
    <footer className="bg-amber-100/80 text-stone-700 py-10 border-t border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-amber-200/70 text-sm">
          
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-base text-stone-800">COFFEE HOUSE</h3>
            <p className="text-stone-600 leading-relaxed">
              Chuyên cung cấp các dòng cà phê rang xay nguyên chất, mang lại hương vị đậm đà và trải nghiệm tuyệt vời cho mỗi ngày làm việc.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-stone-800">THÔNG TIN LIÊN HỆ</h4>
            <p className="text-stone-600">Địa chỉ: 123 Lý Thường Kiệt, Quận 10, TP.HCM</p>
            <p className="text-stone-600">Hotline: 0909 123 456</p>
            <p className="text-stone-600">Email: contact@coffeehouse.com</p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-stone-800">GIỜ MỞ CỬA</h4>
            <p className="text-stone-600">Thứ Hai - Thứ Sáu: 07:00 - 22:00</p>
            <p className="text-stone-600">Thứ Bảy - Chủ Nhật: 07:30 - 22:30</p>
            <p className="text-amber-700 font-medium pt-1">Phục vụ tại chỗ & Mang đi</p>
          </div>

        </div>

        {/* Dòng Bản quyền (Copyright) bên dưới */}
        <div className="pt-6 text-center text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Coffee House. Tất cả quyền được bảo lưu.</p>
        </div>

      </div>
    </footer>
  );
}

export default FooterPage;