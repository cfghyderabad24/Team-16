// "use client";

// import React from "react";
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from "recharts";

// // Example employee data
// const data = [
//     { name: "Task 1", completed: 10, pending: 4 },
//     { name: "Task 2", completed: 9, pending: 3 },
//     { name: "Task 3", completed: 14, pending: 6 },
//     { name: "Task 4", completed: 8, pending: 2 },
//     { name: "Task 5", completed: 6, pending: 1 },
// ];

// const EmployeeStats = () => {
//     return (
//         <ResponsiveContainer width="100%" height={400}>
//             <BarChart
//                 data={data}
//                 margin={{
//                     top: 20,
//                     right: 30,
//                     left: 20,
//                     bottom: 5,
//                 }}
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="completed" fill="#8884d8" />
//                 <Bar dataKey="pending" fill="#82ca9d" />
//             </BarChart>
//         </ResponsiveContainer>
//     );
// };

// export default EmployeeStats;
