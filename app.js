var quotes = [
  {
    quote: "I see dead people.",
    movie: "The Sixth Sense",
    year: 1999,
    rating: "PG-13"
  }, {
    quote: "May the force be with you.",
    movie: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    rating: "PG"
  }, {
    quote: "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
    movie: "Dirty Harry",
    year: 1971,
    rating: "R"
  }, {
    quote: "You had me at 'hello.'",
    movie: "Jerry Maguire",
    year: 1996,
    rating: "R"
  }, {
    quote: "Just keep swimming. Just keep swimming. Swimming, swimming, swiming.",
    movie: "Finding Nemo",
    year: 2003,
    rating: "G"
  }
];

const colors = {"G": "#ffe7d1", "PG": "#f6c89f", "PG-13": "#4b8e8d", "R": "#396362"}

d3.select("#quotes")
  .style('list-style', "none")
  .style("font-family", "sans-serif")
    .selectAll("li")
      .data(quotes)
      .enter()
      .append("li")
    .html(d => `<b>${d.movie}</b> - <i>${d.year}</i>, ${d.quote} `)
    .style("margin", "20px")
    .style("border-radius", "4px")
    .style("padding", "10px")
    .style("font-size", d => (d.quote.length < 25 ? "2em" : "1em"))
    .style("background", d => colors[d.rating])