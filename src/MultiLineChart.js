import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const MultiLineChart = ({ datasets, width, onToggleAxis }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const calculatedWidth = width - margin.left - margin.right;
    const calculatedHeight = calculatedWidth * 0.6; // Maintain a 3:2 aspect ratio

    const x = d3
      .scaleTime()
      .domain(d3.extent(datasets[0].data, (d) => d.timestamp))
      .range([margin.left, calculatedWidth - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(datasets, (d) => d3.min(d.data, (p) => p.pH)) - 1,
        d3.max(datasets, (d) => d3.max(d.data, (p) => p.pH)) + 1,
      ])
      .nice()
      .range([calculatedHeight - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(d.timestamp))
      .y((d) => y(d.pH));

    svg
      .selectAll(".line")
      .data(datasets)
      .join("path")
      .attr("class", "line")
      .attr("d", (d) => (d.isHidden ? null : line(d.data)))
      .attr("fill", "none")
      .attr("stroke", (d, i) => d.color || `steelblue`);

    svg
      .selectAll(".x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${calculatedHeight - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .selectAll(".y-axis")
      .data([null])
      .join("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // X-axis label
    svg
      .selectAll(".x-axis-label")
      .data([null])
      .join("text")
      .attr("class", "x-axis-label")
      .attr("x", calculatedWidth / 2)
      .attr("y", calculatedHeight - 5)
      .attr("text-anchor", "middle")
      .text("Time");

    // Y-axis label
    svg
      .selectAll(".y-axis-label")
      .data([null])
      .join("text")
      .attr("class", "y-axis-label")
      .attr("x", -calculatedHeight / 2)
      .attr("y", 15 - margin.left) // Adjust for the rotated label
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("[pH] Value");

    // Legends
    const legend = svg
      .selectAll(".legend")
      .data(datasets)
      .join("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0, ${(i + 1) * 20})`)
      .on("click", toggleLine)
      .style("cursor", "pointer");

    legend
      .append("rect")
      .attr("x", calculatedWidth - 19)
      .attr("width", 19)
      .attr("height", 1)
      .attr("stroke", (d, i) => d.color || `steelblue`)
      .attr("stroke-width", 3);

    legend
      .append("text")
      .attr("x", calculatedWidth - 24)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text((d) => d.label || "Line " + (datasets.indexOf(d) + 1));

    function toggleLine(d, i) {
      onToggleAxis(i.id);
    }

    // Zoom
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg
      .selectAll(".x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${calculatedHeight - margin.bottom})`)
      .call(xAxis);

    svg
      .selectAll(".y-axis")
      .data([null])
      .join("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    const zoom = d3
      .zoom()
      .scaleExtent([1, 10]) // Define the zoom scale limits
      .translateExtent([
        [0, 0],
        [calculatedWidth, calculatedHeight],
      ]) // Define the translation limits
      .on("zoom", zoomed);

    svg.call(zoom);

    function zoomed(event) {
      const newTransform = event.transform;

      // Update x and y scales with newTransform
      const newXScale = newTransform.rescaleX(x);
      const newYScale = newTransform.rescaleY(y);

      // Update axis components with new scales
      svg.select(".x-axis").call(xAxis.scale(newXScale));
      svg.select(".y-axis").call(yAxis.scale(newYScale));

      // Update lines with new scales
      svg
        .selectAll(".line")
        .attr("d", (d) =>
          line
            .x((data) => newXScale(data.timestamp))
            .y((data) => newYScale(data.pH))(d.data)
        );
    }
  }, [datasets, width, onToggleAxis]);

  return <svg ref={svgRef} width={width} height={width * 0.6}></svg>;
};

export default MultiLineChart;
