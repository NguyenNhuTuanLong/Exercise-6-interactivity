const drawHistogram = (data) => {
    // 1. CHUẨN BỊ BINS VÀ TÍNH TOÁN SCALES
    // Đưa dữ liệu qua binGenerator để nhóm thành các dải (arrays)
    const bins = binGenerator(data);
    console.log("Bins Data:", bins); // Debug trong Console

    // Tìm giá trị nhỏ nhất (x0 của dải đầu) và lớn nhất (x1 của dải cuối)
    const minXEng = bins[0].x0;
    const maxXEng = bins[bins.length - 1].x1;
    
    // Tìm cột cao nhất (tức là array có length lớn nhất)
    const binsMaxLength = d3.max(bins, d => d.length);

    // Cập nhật Domain cho các Scales (từ shared-constants)
    xScale.domain([minXEng, maxXEng]).range([0, innerWidth]);
    yScale.domain([0, binsMaxLength]).range([innerHeight, 0]).nice(); // .nice() làm tròn trục Y

    // 2. KHỞI TẠO KHUNG VẼ (SVG & innerChart)
    // Nếu vẽ lại biểu đồ, xóa SVG cũ đi để tránh trùng lặp
    d3.select("#histogram").selectAll("*").remove();

    const svg = d3.select("#histogram")
                  .append("svg")
                  .attr("viewBox", `0 0 ${width} ${height}`);

    const innerChart = svg.append("g")
                          .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 3. VẼ CÁC CỘT (BARS)
    innerChart.selectAll("rect")
              .data(bins) // Dùng mảng bins thay vì mảng data gốc
              .join("rect")
              // Tọa độ X bắt đầu từ điểm đầu (x0) của Bin
              .attr("x", d => xScale(d.x0))
              // Tọa độ Y đếm từ trên xuống
              .attr("y", d => yScale(d.length))
              // Chiều rộng = Điểm cuối (x1) - Điểm đầu (x0)
              .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0))) 
              // Chiều cao thực tế của cột
              .attr("height", d => innerHeight - yScale(d.length))
              .attr("fill", barColor)
              // Dùng màu nền tạo viền trắng ngăn cách giữa các cột
              .attr("stroke", bodyBackgroundColor)
              .attr("stroke-width", 2);

    // 4. VẼ TRỤC TỌA ĐỘ (AXIS)
    const bottomAxis = d3.axisBottom(xScale);
    const leftAxis = d3.axisLeft(yScale);

    innerChart.append("g")
              .attr("transform", `translate(0, ${innerHeight})`)
              .call(bottomAxis);

    innerChart.append("g")
              .call(leftAxis);

    // THÊM NHÃN CHO TRỤC X
    innerChart.append("text")
              .text("Labeled Energy Consumption (kWh/year)")
              .attr("x", innerWidth)
              .attr("y", innerHeight + 40) // Đẩy nhãn X xuống dưới trục
              .attr("text-anchor", "end")
              .attr("class", "axis-label");

    // THÊM NHÃN CHO TRỤC Y
    innerChart.append("text")
              .text("Frequency")
              .attr("x", -margin.left)
              .attr("y", -10) // Đẩy nhãn Y lên góc trên
              .attr("text-anchor", "start")
              .attr("class", "axis-label");
};