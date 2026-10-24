// Thiết lập kích thước và lề
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 1000;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Thiết lập màu sắc để gọi lại nhiều lần
const barColor = "#696464"; // Màu xám đậm theo mẫu
const bodyBackgroundColor = "#fffaf0"; // Phải trùng màu nền CSS để tạo vạch ngăn cách

// Khởi tạo trước các Scales, giá trị domain sẽ được nạp sau
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Khởi tạo bộ tạo Bin (Bin generator) chia dữ liệu thành các cột
const binGenerator = d3.bin()
                       .value(d => d.energyConsumption); // Chỉ định cột dữ liệu tính toán