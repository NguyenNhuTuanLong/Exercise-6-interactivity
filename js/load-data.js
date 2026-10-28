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
    drawHistogram(data);
    drawScatterplot(data);
    createTooltip();
    handleMouseEvents();
    if(typeof populateFilters === "function") populateFilters(data);
});