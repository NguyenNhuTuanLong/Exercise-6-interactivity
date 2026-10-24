// Thiết lập kích thước và lề chung cho các biểu đồ
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 1000;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Khai báo biến innerChart riêng cho Scatterplot (tránh xung đột với Histogram)
let innerChartS; 

// Kích thước tooltip (chuẩn bị sẵn cho bài 6.4)
const tooltipWidth = 65;
const tooltipHeight = 32;

// Màu sắc
const barColor = "#696464";
const bodyBackgroundColor = "#fffaf0";

// Scales cho Histogram
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// --- THÊM MỚI: Scales và Color Scale cho Scatterplot ---
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal(); // Thang màu phân loại (categorical color scale)

// Bin generator cho Histogram
const binGenerator = d3.bin()
                       .value(d => d.energyConsumption);

// Mảng quản lý nút bấm bộ lọc
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];