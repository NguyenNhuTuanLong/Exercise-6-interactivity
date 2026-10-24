const drawScatterplot = (data) => {
    // 1. KHỞI TẠO KHUNG SVG VÀ INNERCHART CHO SCATTERPLOT
    const svg = d3.select("#scatterplot")
                  .append("svg")
                  .attr("viewBox", `0 0 ${width} ${height}`);

    innerChartS = svg.append("g")
                     .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 2. THIẾT LẬP DOMAIN CHO SCALES
    // Trục X: Star Rating (Từ 0 đến số sao lớn nhất)
    xScaleS.domain([0, d3.max(data, d => d.star)])
           .range([0, innerWidth]);

    // Trục Y: Energy Consumption (Từ 0 đến mức tiêu thụ điện lớn nhất)
    yScaleS.domain([0, d3.max(data, d => d.energyConsumption)])
           .range([innerHeight, 0])
           .nice();

    // Thang màu cho Screen Tech (LED, LCD, OLED) dùng bảng màu schemeCategory10
    colorScale.domain(data.map(d => d.screenTech))
              .range(d3.schemeCategory10);

    // 3. VẼ CÁC CHẤM TRÒN (CIRCLES - SCATTER PLOT)
    innerChartS.selectAll("circle")
               .data(data)
               .join("circle")
               .attr("cx", d => xScaleS(d.star)) // Tọa độ X theo số sao
               .attr("cy", d => yScaleS(d.energyConsumption)) // Tọa độ Y theo năng lượng
               .attr("r", 4) // Bán kính chấm tròn
               .attr("fill", d => colorScale(d.screenTech)) // Tô màu theo công nghệ màn hình
               .attr("opacity", 0.5); // Làm mờ nhẹ để dễ nhìn các điểm bị chồng chéo lên nhau

    // 4. THÊM TRỤC TỌA ĐỘ (AXES)
    const bottomAxis = d3.axisBottom(xScaleS);
    const leftAxis = d3.axisLeft(yScaleS);

    innerChartS.append("g")
               .attr("transform", `translate(0, ${innerHeight})`)
               .call(bottomAxis);

    innerChartS.append("g")
               .call(leftAxis);

    // Nhãn trục X
    innerChartS.append("text")
               .text("Star Rating")
               .attr("x", innerWidth)
               .attr("y", innerHeight + 40)
               .attr("text-anchor", "end")
               .attr("class", "axis-label");

    // Nhãn trục Y
    innerChartS.append("text")
               .text("Labeled Energy Consumption (kWh/year)")
               .attr("x", -margin.left)
               .attr("y", -10)
               .attr("text-anchor", "start")
               .attr("class", "axis-label");

    // 5. TẠO BẢNG CHÚ THÍCH (LEGEND) Ở GÓC TRÊN BÊN PHẢI
    const legendGroup = innerChartS.append("g")
                                   .attr("transform", `translate(${innerWidth - 100}, 20)`);

    // Lấy danh sách các loại công nghệ màn hình độc lập (LED, LCD, OLED)
    const categories = colorScale.domain();

    categories.forEach((category, i) => {
        const legendItem = legendGroup.append("g")
                                      .attr("transform", `translate(0, ${i * 20})`);

        // Ô vuông màu chú thích
        legendItem.append("rect")
                  .attr("width", 12)
                  .attr("height", 12)
                  .attr("fill", colorScale(category));

        // Chữ tên công nghệ màn hình
        legendItem.append("text")
                  .attr("x", 20)
                  .attr("y", 10)
                  .text(category)
                  .style("font-size", "12px")
                  .style("font-family", "Roboto, sans-serif")
                  .attr("fill", "#5a3e2b");
    });
};