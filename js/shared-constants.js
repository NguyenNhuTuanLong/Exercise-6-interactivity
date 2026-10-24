// Thiết lập kích thước, lề, màu sắc chung
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 1000;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const barColor = "#696464";
const bodyBackgroundColor = "#fffaf0";

// Khởi tạo Scales chung
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Khởi tạo Bin generator (Lưu ý: Bạn phải xóa binGenerator ở file histogram.js nếu từng để bên đó)
const binGenerator = d3.bin()
                       .value(d => d.energyConsumption);

// --- THÊM MỚI: Mảng quản lý trạng thái của 4 nút bấm ---
const filters_screen = [
    { id: "all", label: "All", isActive: true },   // Mặc định mở trang là chọn "All"
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];