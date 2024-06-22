"use client";

import React, { useState } from 'react';
import LineChartComponent from '../../components/Chart';
import PieChartComponent from '../../components/PieChart';

const VisualizationPage = () => {
  const [data] = useState({ visited: 10, notVisited: 5 });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Visualization</h1>
      <p>This line chart shows the distribution of visits:</p>
      <LineChartComponent />
      <p className="mt-6 text-gray-700">This pie chart shows the distribution of visits:</p>
      <PieChartComponent data={data} />
      <p className="mt-6 text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  );
};

export default VisualizationPage;
