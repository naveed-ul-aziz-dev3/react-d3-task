import React from "react";
import { useState } from "react";
import MultiLineChart from "./MultiLineChart";

const App = () => {
  const [datasets, setDatasets] = useState([
    {
      id: 1,
      data: [
        { timestamp: new Date("2023-08-01T00:00:00Z"), pH: 9.2 },
        { timestamp: new Date("2023-08-01T01:00:00Z"), pH: 9.4 },
        { timestamp: new Date("2023-08-01T02:00:00Z"), pH: 9.5 },
        { timestamp: new Date("2023-08-01T03:00:00Z"), pH: 9.7 },
        { timestamp: new Date("2023-08-01T04:00:00Z"), pH: 9.1 },
        { timestamp: new Date("2023-08-01T05:00:00Z"), pH: 8.2 },
        { timestamp: new Date("2023-08-01T06:00:00Z"), pH: 8.6 },
        { timestamp: new Date("2023-08-01T07:00:00Z"), pH: 8.9 },
        { timestamp: new Date("2023-08-01T08:00:00Z"), pH: 8.9 },
        { timestamp: new Date("2023-08-01T09:00:00Z"), pH: 9.3 },
        { timestamp: new Date("2023-08-01T10:00:00Z"), pH: 9 },
        { timestamp: new Date("2023-08-01T11:00:00Z"), pH: 9.1 },
        // ... more data points
      ],
      color: "steelblue",
      label: "Solution 1",
      isHidden: false, // Initial hidden state
    },
    {
      id: 2,
      data: [
        { timestamp: new Date("2023-08-01T00:00:00Z"), pH: 6.6 },
        { timestamp: new Date("2023-08-01T01:00:00Z"), pH: 6.9 },
        { timestamp: new Date("2023-08-01T02:00:00Z"), pH: 7.9 },
        { timestamp: new Date("2023-08-01T03:00:00Z"), pH: 7.5 },
        { timestamp: new Date("2023-08-01T04:00:00Z"), pH: 7.8 },
        { timestamp: new Date("2023-08-01T05:00:00Z"), pH: 6.8 },
        { timestamp: new Date("2023-08-01T06:00:00Z"), pH: 7.6 },
        { timestamp: new Date("2023-08-01T07:00:00Z"), pH: 7.1 },
        { timestamp: new Date("2023-08-01T08:00:00Z"), pH: 7.5 },
        { timestamp: new Date("2023-08-01T09:00:00Z"), pH: 7.7 },
        { timestamp: new Date("2023-08-01T10:00:00Z"), pH: 7.1 },
        { timestamp: new Date("2023-08-01T11:00:00Z"), pH: 6.2 },
        // ... more data points
      ],
      color: "orange",
      label: "Solution 2",
      isHidden: false, // Initial hidden state
    },
    {
      id: 3,
      data: [
        { timestamp: new Date("2023-08-01T00:00:00Z"), pH: 5.0 },
        { timestamp: new Date("2023-08-01T01:00:00Z"), pH: 5.3 },
        { timestamp: new Date("2023-08-01T02:00:00Z"), pH: 5.1 },
        { timestamp: new Date("2023-08-01T03:00:00Z"), pH: 5.5 },
        { timestamp: new Date("2023-08-01T04:00:00Z"), pH: 5.7 },
        { timestamp: new Date("2023-08-01T05:00:00Z"), pH: 5.1 },
        { timestamp: new Date("2023-08-01T06:00:00Z"), pH: 4.2 },
        { timestamp: new Date("2023-08-01T07:00:00Z"), pH: 4.6 },
        { timestamp: new Date("2023-08-01T08:00:00Z"), pH: 4.9 },
        { timestamp: new Date("2023-08-01T09:00:00Z"), pH: 5.9 },
        { timestamp: new Date("2023-08-01T10:00:00Z"), pH: 5.3 },
        { timestamp: new Date("2023-08-01T11:00:00Z"), pH: 5.5 },
        // ... more data points
      ],
      color: "green",
      label: "Solution 3",
      isHidden: false, // Initial hidden state
    },
    {
      id: 4,
      data: [
        { timestamp: new Date("2023-08-01T00:00:00Z"), pH: 3.3 },
        { timestamp: new Date("2023-08-01T01:00:00Z"), pH: 3.5 },
        { timestamp: new Date("2023-08-01T02:00:00Z"), pH: 2.8 },
        { timestamp: new Date("2023-08-01T03:00:00Z"), pH: 3.6 },
        { timestamp: new Date("2023-08-01T04:00:00Z"), pH: 3.1 },
        { timestamp: new Date("2023-08-01T05:00:00Z"), pH: 3.5 },
        { timestamp: new Date("2023-08-01T06:00:00Z"), pH: 3.7 },
        { timestamp: new Date("2023-08-01T07:00:00Z"), pH: 3.1 },
        { timestamp: new Date("2023-08-01T08:00:00Z"), pH: 2.2 },
        { timestamp: new Date("2023-08-01T09:00:00Z"), pH: 2.6 },
        { timestamp: new Date("2023-08-01T10:00:00Z"), pH: 2.9 },
        { timestamp: new Date("2023-08-01T11:00:00Z"), pH: 3.9 },
        // ... more data points
      ],
      color: "purple",
      label: "Solution 4",
      isHidden: false, // Initial hidden state
    },
  ]);

  // Function to toggle a line's visibility
  const toggleLine = (id) => {
    const updatedDatasets = datasets.map((e) => {
      if (e.id === id) {
        const newData = { ...e, isHidden: !e.isHidden };
        return newData;
      }
      return e;
    });
    setDatasets(updatedDatasets);
  };

  return (
    <div>
      <h1>Time vs pH Chart</h1>
      <MultiLineChart
        datasets={datasets}
        width={760}
        onToggleAxis={toggleLine}
      />
    </div>
  );
};

export default App;
