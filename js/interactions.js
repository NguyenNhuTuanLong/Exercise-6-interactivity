// --- BÀI 6.2: QUẢN LÝ BỘ LỌC NÚT BẤM ---
const populateFilters = (data) => {
    d3.select("#filters_screen")
      .selectAll(".filter")
      .data(filters_screen)
      .join("button")
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      .on("click", (e, d) => {
          if (d.isActive) return;

          filters_screen.forEach(filter => {
              filter.isActive = filter.id === d.id;
          });

          d3.selectAll("#filters_screen .filter")
            .classed("active", filter => filter.id === d.id);

          updateHistogram(d.id, data);
      });

    const updateHistogram = (filterId, allData) => {
        const updatedData = filterId === "all" 
            ? allData 
            : allData.filter(tv => tv.screenTech === filterId);

        const updatedBins = binGenerator(updatedData);

        d3.selectAll("#histogram rect")
          .data(updatedBins)
          .transition()
          .duration(500)
          .ease(d3.easeCubicInOut)
          .attr("y", d => yScale(d.length))
          .attr("height", d => innerHeight - yScale(d.length));
    };
};


// --- BÀI 6.4: TẠO VÀ XỬ LÝ SỰ KIỆN TOOLTIP CHO SCATTERPLOT ---

// 1. Hàm khởi tạo khung Tooltip
const createTooltip = () => {
    // Tạo một nhóm <g> chứa tooltip bên trong innerChartS của scatterplot
    const tooltip = innerChartS.append("g")
                              .attr("class", "tooltip")
                              .style("opacity", 0) // Ban đầu ẩn đi
                              .style("pointer-events", "none"); // Tránh cản trở sự kiện chuột

    // Thêm hình chữ nhật nền cho tooltip
    tooltip.append("rect")
           .attr("width", tooltipWidth)
           .attr("height", tooltipHeight)
           .attr("rx", 3) // Bo tròn góc
           .attr("ry", 3)
           .attr("fill", barColor) // Màu nền xám đậm theo style chung
           .attr("fill-opacity", 0.75); // Độ trong suốt

    // Thêm chữ hiển thị bên trong tooltip
    tooltip.append("text")
           .text("NA")
           .attr("x", tooltipWidth / 2)
           .attr("y", tooltipHeight / 2 + 2)
           .attr("text-anchor", "middle")
           .attr("alignment-baseline", "middle")
           .attr("fill", "white")
           .style("font-size", "12px")
           .style("font-family", "Roboto, sans-serif")
           .style("font-weight", 900);
};

// 2. Hàm xử lý sự kiện khi di chuột (Mouse Events)
const handleMouseEvents = () => {
    innerChartS.selectAll("circle")
               .on("mouseenter", (e, d) => {
                   console.log("Mouse entered circle data:", d);

                   // Cập nhật nội dung chữ trong tooltip thành kích thước màn hình (screenSize)
                   d3.select(".tooltip text")
                     .text(d.screenSize);

                   // Lấy tọa độ cx, cy của chấm tròn đang được rê chuột vào
                   const cx = e.target.getAttribute("cx");
                   const cy = e.target.getAttribute("cy");

                   // Dịch chuyển tooltip đến vị trí của chấm tròn (căn chỉnh cho đẹp mắt)
                   d3.select(".tooltip")
                     .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                     .transition()
                     .duration(200)
                     .style("opacity", 1); // Hiện tooltip lên mượt mà
               })
               .on("mouseleave", (e, d) => {
                   console.log("Mouse left circle data:", d);

                   // Ẩn tooltip đi khi rê chuột ra ngoài
                   d3.select(".tooltip")
                     .style("opacity", 0)
                     .attr("transform", "translate(0, 500)"); // Đẩy ra ngoài vùng nhìn thấy
               });
};