d3.csv("data/Ex6_TVdata_withStar.csv", d => {
    return {
        brand: d.brand,
        model: d.model,
        screenSize: +d.screenSize,
        screenTech: d.screenTech,
        star: +d.star,
        energyConsumption: +d.energyConsumption
    };
}).then(data => {
    console.log("Loaded Data for W6:", data);

    // 1. Vẽ Histogram (Tuần 6.1)
    drawHistogram(data);

    // 2. THÊM MỚI: Vẽ Scatterplot (Tuần 6.3)
    drawScatterplot(data);

    // Dành cho tương tác bộ lọc (Tuần 6.2)
    if(typeof populateFilters === "function") populateFilters(data);
}).catch(error => {
    console.error("Error loading the CSV file!", error);
});