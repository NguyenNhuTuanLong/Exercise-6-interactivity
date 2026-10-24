// Sử dụng hàm row conversion để biến các cột chứa số thành kiểu Number (Float/Int)
d3.csv("data/Ex6_TVdata_withStar.csv", d => {
    return {
        brand: d.brand,
        model: d.model,
        screenSize: +d.screenSize, // Thêm dấu + để ép kiểu
        screenTech: d.screenTech,
        star: +d.star,
        energyConsumption: +d.energyConsumption // Cột quan trọng nhất của bài này
    };
}).then(data => {
    // In dữ liệu ra console để kiểm tra
    console.log("Original Data:", data);

    // TÙY CHỌN (Gợi ý cuối Canvas): Lọc bỏ ngoại lệ cực cao (>1800 kWh) để biểu đồ dễ nhìn hơn
    // const filteredData = data.filter(d => d.energyConsumption <= 1800);
    // drawHistogram(filteredData);

    // Gọi hàm vẽ biểu đồ mặc định nằm trong file histogram.js
    drawHistogram(data);
    
    // Hàm này sẽ dùng cho Exercise 6.2 (hiện tại cứ truyền vào)
    if(typeof populateFilters === "function") populateFilters(data);
}).catch(error => {
    console.error("Error loading the CSV file!", error);
});