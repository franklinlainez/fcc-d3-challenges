// Configuration
const w = 500;
const h = 500;
const padding = 60;

const getData = async () => {
  return fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  );
};

const getXScale = (dataset) =>
  d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[0])])
    .range([padding, w - padding]);

const getYScale = (dataset) =>
  d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([h - padding, padding]);

const addAxes = (dataset, svg) => {
  const xAxis = d3.axisBottom(getXScale(dataset));

  const yAxis = d3.axisLeft(getYScale(dataset));

  svg
    .append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
};

getData().then(async (res) => {
  const json = await res.json();
  const data = json.data.sort((a, b) => a[1] - b[1]);

  console.log(data);

  const xScale = getXScale(data);
  const yScale = getYScale(data);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    // .attr("x", (d) => xScale(d[0]))
    // .attr("y",(d) => yScale(d[1]))
    .attr("x", (d, i) => {
      console.log(xScale(i * 30));
      return i * 2;
    })
    .attr("y", 0)
    .attr("width", 1)
    .attr("height", (d) => yScale(d[1]));
});
