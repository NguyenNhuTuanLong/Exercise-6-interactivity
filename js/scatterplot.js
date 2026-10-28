const drawScatterplot = (data) => {
    const svg = d3.select("#scatterplot")
                  .append("svg")
                  .attr("viewBox", `0 0 ${width} ${height}`);

    innerChartS = svg.append("g")
                     .attr("transform", `translate(${margin.left}, ${margin.top})`);

    xScaleS.domain([0, d3.max(data, d => d.star)])
           .range([0, innerWidth]);

    yScaleS.domain([0, d3.max(data, d => d.energyConsumption)])
           .range([innerHeight, 0])
           .nice();

    colorScale.domain(data.map(d => d.screenTech))
              .range(d3.schemeCategory10);

    innerChartS.selectAll("circle")
               .data(data)
               .join("circle")
               .attr("cx", d => xScaleS(d.star)) 
               .attr("cy", d => yScaleS(d.energyConsumption))
               .attr("r", 4)
               .attr("fill", d => colorScale(d.screenTech))
               .attr("opacity", 0.5);

    const bottomAxis = d3.axisBottom(xScaleS);
    const leftAxis = d3.axisLeft(yScaleS);

    innerChartS.append("g")
               .attr("transform", `translate(0, ${innerHeight})`)
               .call(bottomAxis);

    innerChartS.append("g").call(leftAxis);

    innerChartS.append("text")
               .text("Star Rating")
               .attr("x", innerWidth)
               .attr("y", innerHeight + 40)
               .attr("text-anchor", "end")
               .attr("class", "axis-label");

    innerChartS.append("text")
               .text("Labeled Energy Consumption (kWh/year)")
               .attr("x", -margin.left)
               .attr("y", -10)
               .attr("text-anchor", "start")
               .attr("class", "axis-label");

    const legendGroup = innerChartS.append("g")
                                   .attr("transform", `translate(${innerWidth - 100}, 20)`);

    const categories = colorScale.domain();

    categories.forEach((category, i) => {
        const legendItem = legendGroup.append("g")
                                      .attr("transform", `translate(0, ${i * 20})`);

        legendItem.append("rect")
                  .attr("width", 12)
                  .attr("height", 12)
                  .attr("fill", colorScale(category));

        legendItem.append("text")
                  .attr("x", 20)
                  .attr("y", 10)
                  .text(category)
                  .style("font-size", "12px")
                  .style("font-family", "Roboto, sans-serif")
                  .attr("fill", "#5a3e2b");
    });
};