const width = 500;
const height = 500;
const padding = 40;

// CREATE SCALE
const yScale = d3.scaleLinear()
        .domain(d3.extent(birthData, d => d.lifeExpectancy))
        .range([height - padding, padding])

const xScale = d3.scaleLinear()
        .domain(d3.extent(birthData, d => (d.births / d.population)))
        .range([padding, width - padding])

const colorScale = d3.scaleLinear()
        .domain(d3.extent(birthData, d => d.population/d.area))
        .range(["lightgreen", "black"])

const radiusScale = d3.scaleLinear()
        .domain(d3.extent(birthData, d => d.births))
        .range([2, 40])

// CREATE X AND Y AXES
const xAxis = d3.axisBottom(xScale)
// adjust tick size
        .tickSize(-height + 2 * padding)
        // set the tick size of the last line
        .tickSizeOuter(0)
const yAxis = d3.axisLeft(yScale)
        .tickSize(-width + 2 * padding)
        // set the tick size of the last line
        .tickSizeOuter(0)

// ATTACH Y AXIS TO SVG
d3.select("svg")
  .append("g")
     .attr("transform", `translate(0, ${height - padding})`)
  .call(xAxis)
//ATTACH X AXIS TO SVG
d3.select("svg")
  .append("g")
    .attr("transform", `translate(${padding}, 0)`)
  .call(yAxis)

d3.select("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background", "#f5f5f5")
  .selectAll("circle")
    .data(birthData)
    .enter()
    .append("circle")
        .attr("cx", d => xScale(d.births / d.population))
        .attr("cy", d => yScale(d.lifeExpectancy))
        .attr("r", d => radiusScale(d.births))
        .attr("fill", d => colorScale( d.population/d.area ))

// ADD LABELS
d3.select("svg")
  .append("text")
  .attr("x", width / 2)
  .attr("y", height - padding / 3)
  .style("text-anchor", "middle")
  .text("Births per capita")

d3.select("svg")
  .append("text")
     .attr("x", width / 2)
     .attr("y", padding - 10)
     .style("text-anchor", "middle")
     .style("font-size", "1.5em")
     .style("font-family", "sans-serif")
     .text("Data on Births by Country in 2011")

d3.select("svg")
.append("text")
.attr("transform", "rotate(-90)")
.attr("x", - height / 2)
.attr("y", padding)
.attr("dy", "-1.4em")
.style("text-anchor", "middle")
.text("Life Expectancy")
