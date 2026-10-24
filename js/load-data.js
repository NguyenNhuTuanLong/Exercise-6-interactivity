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
    console.log("Loaded Data for W6.4:", data);

    // 1. Vẽ Histogram
    drawHistogram(data);

    // 2. Vẽ Scatterplot
    drawScatterplot(data);

    // 3. TẠO VÀ KÍCH HOẠT TOOLTIP (Bài 6.4)
    createTooltip();
    handleMouseEvents();

    // 4. Bộ lọc (Bài 6.2)
    if(typeof populateFilters === "function") populateFilters(data);
}).catch(error => {
    console.error("Error loading the CSV file!", error);
});