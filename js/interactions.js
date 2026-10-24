// Hàm này được gọi từ file load-data.js sau khi dữ liệu CSV tải xong
const populateFilters = (data) => {
    
    // 1. TẠO GIAO DIỆN NÚT BẤM DỰA TRÊN MẢNG CONSTANTS
    d3.select("#filters_screen")
      .selectAll(".filter")
      .data(filters_screen)
      .join("button")
      // Nếu nút đang isActive = true thì thêm class "active" để CSS tô màu vàng
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      // 2. BẮT SỰ KIỆN CLICK CHUỘT
      .on("click", (e, d) => {
          // Bỏ qua nếu click vào nút đang bật sẵn
          if (d.isActive) return;

          // Cập nhật trạng thái mảng: nút được click thì true, các nút khác false
          filters_screen.forEach(filter => {
              filter.isActive = filter.id === d.id;
          });

          // Cập nhật lại giao diện CSS bằng cách gỡ/gắn class "active"
          d3.selectAll("#filters_screen .filter")
            .classed("active", filter => filter.id === d.id);

          // Gọi hàm cập nhật biểu đồ
          updateHistogram(d.id, data);
      });

    // 3. HÀM CẬP NHẬT BIỂU ĐỒ (Lọc dữ liệu + Hiệu ứng chuyển động)
    const updateHistogram = (filterId, allData) => {
        // Lọc dữ liệu: Nếu chọn "all" thì lấy gốc, nếu chọn khác thì filter theo screenTech
        const updatedData = filterId === "all" 
            ? allData 
            : allData.filter(tv => tv.screenTech === filterId);

        // Nhóm dữ liệu mới lọc vào các Bins
        const updatedBins = binGenerator(updatedData);

        // Chọn các cột (rect) hiện có trên biểu đồ và nạp dữ liệu mới
        d3.selectAll("#histogram rect")
          .data(updatedBins)
          .transition() // Bật hiệu ứng chuyển động
          .duration(500) // Thời gian chuyển động: nửa giây (500 mili-giây)
          .ease(d3.easeCubicInOut) // Kiểu chuyển động (nhanh dần ở giữa, chậm ở 2 đầu)
          .attr("y", d => yScale(d.length)) // Chỉnh lại tọa độ Y mới
          .attr("height", d => innerHeight - yScale(d.length)); // Chỉnh lại chiều cao mới
    };
};