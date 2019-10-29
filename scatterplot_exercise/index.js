const width = 500;
const height = 500;
const padding = 50;

let data = regionData.filter(mustHaveKeys);

//Create X and Y scale
let xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.adultLiteracyRate))
            .range([padding, width - padding]);
let yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.subscribersPer100))
            .range([height - padding, padding]);
//Create a radial scale
let rScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.medianAge))
            .range([5, 30])
//fill scale
let fillScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.urbanPopulationRate))
            .range(["green", "blue"])
//select SVG
let svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height)
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", d => xScale(d.adultLiteracyRate))
        .attr("cy", d => yScale(d.subscribersPer100))
        .attr("fill", d => fillScale(d.urbanPopulationRate))
        .attr("r", d => rScale(d.medianAge))
        .attr("stroke", "#f5f5f5")

let xAxis = d3.axisBottom(xScale)
            .tickSize(- height + 2 * padding)
            .tickSizeOuter(0);
let yAxis = d3.axisLeft(yScale)
            .tickSize(- width + 2 * padding)
            .tickSizeOuter(0)
//Append Axes
svg.append("g")
    .attr("transform", `translate(0, ${height - padding})`)
    .call(xAxis)
svg.append("g")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis)

svg.append("text")
    .attr("x", width / 2)
    .attr("y", (height - padding))
    .attr("dy", padding / 2)
    .style("text-anchor", "middle")
    .text("Literacy Rate, Aged 15 and up")

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", - height / 2)
    .attr("dy", padding / 2)
    .style("text-anchor", "middle")
    .text("Cellular Subscribers per 100 people")
  
function mustHaveKeys(obj){
    let keys = [
        "subscribersPer100",
        "adultLiteracyRate",
        "medianAge",
        "urbanPopulationRate"
    ];
    for(let i = 0; i < keys.length; i++){
        if(obj[keys[i]] === null) return false;
    }
    return true;
}