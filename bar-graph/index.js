document.addEventListener("DOMContentLoaded", async function(e){
    try {
    let minYear = d3.min(birthData, d => d.year);
    let maxYear = d3.max(birthData, d => d.year);
    let width    = 800;
    let height   = 350;
  
    let minData  = birthData.filter(d => d.year === minYear);
    let barPadding = 4;
    let barWidth = width / minData.length - barPadding;
    let maxBirths = d3.max(birthData, d => d.births);
    const yScale = d3.scaleLinear().domain([0, maxBirths]).range([0, +height])
    let yAxis = d3.axisRight(yScale)

     d3.select('input')
        .property('min', minYear)
        .property('max', maxYear)
        .property("value", minYear)
    
    // d3.select("svg")
    // .append('g')
    // .call(yAxis)


    d3.select("svg")
    .attr("width", width)
    .attr("height", height)
      .selectAll("rect")
      .data(minData)
      .enter()
      .append("rect")
        .attr("width", barWidth)
        .attr("height", d => yScale(d.births))
        .attr("x", (d, i) => (barWidth + barPadding) * i)
    
    d3.select("input")
      .on("input", async e => {
          year = +d3.event.target.value;
          d3.selectAll("rect")
          .data(birthData.filter(d => d.year === year))
          .attr("height", d => yScale(d.births))

      })
    }
    catch(err){
        console.log(err)
    }
});