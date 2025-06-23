// import { useState, useRef } from 'react';
// import FileUpload from '../components/FileUpload';
// import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
// import { useNavigate } from 'react-router-dom';
// import ExcelFileViewer from '../components/ExcelFileViewer';

// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     LineElement,
//     PointElement,
//     ArcElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     LineElement,
//     PointElement,
//     ArcElement,
//     Title,
//     Tooltip,
//     Legend
// );

// export default function Dashboard() {
//     const [chartData, setChartData] = useState(null);
//     const [selectedChart, setSelectedChart] = useState('bar');
//     const [columns, setColumns] = useState([]);
//     const [xAxis, setXAxis] = useState('');
//     const [yAxis, setYAxis] = useState('');
//     const navigate = useNavigate();
//     const chatRef = useRef()

//     const handleParsedData = (data) => {
//         const keys = Object.keys(data[0]);
//         setColumns(keys);
//         setXAxis(keys[0]);
//         setYAxis(keys[1] || keys[0]);

//         const xData = data.map(row => row[keys[0]]);
//         const yData = data.map(row => row[keys[1]]);

//         setChartData({
//             raw: data,
//             labels: xData,
//             datasets: [
//                 {
//                     label: 'Excel Data',
//                     data: yData,
//                     backgroundColor: 'rgba(59, 130, 246, 0.6)'
//                 },
//             ],
//         });
//     };

//     const updateChartData = (newX, newY) => {
//         if (!chartData?.raw) return;
//         const xData = chartData.raw.map(row => row[newX]);
//         const yData = chartData.raw.map(row => row[newY]);

//         setChartData(prev => ({
//             ...prev,
//             labels: xData,
//             datasets: [{ ...prev.datasets[0], data: yData }],
//         }));
//     };

//     const renderChart = () => {
//         if (!chartData || !xAxis || (!yAxis && selectedChart !== 'pie')) {
//             return <div className="text-gray-500 italic">Please upload data and select axes.</div>;
//         }

//         switch (selectedChart) {
//             case 'bar':
//                 return <Bar ref={chatRef} data={chartData} options={{ responsive: true }} />;
//             case 'line':
//                 return <Line ref={chatRef} data={chartData} options={{ responsive: true }} />;
//             case 'pie': {
//                 const groupedData = {};
//                 chartData.raw.forEach(row => {
//                     const key = row[xAxis];
//                     const value = parseFloat(row[yAxis]) || 0;
//                     if (!groupedData[key]) groupedData[key] = 0;
//                     groupedData[key] += value;
//                 });
//                 const labels = Object.keys(groupedData);
//                 const data = Object.values(groupedData);
//                 const backgroundColor = labels.map(() =>
//                     `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
//                 );
//                 return <Pie  ref={chatRef} data={{ labels, datasets: [{ data, backgroundColor }] }} options={{ responsive: true }} />;
//             }
//             case 'scatter':
//                 return <Scatter ref={chatRef} data={{ datasets: [{ label: `${xAxis} vs ${yAxis}`, data: chartData.raw.map(row => ({ x: row[xAxis], y: row[yAxis] })), backgroundColor: 'rgba(99, 102, 241, 0.6)' }] }} options={{ responsive: true }} />;
//             default:
//                 return null;
//         }
//     };

//     const handleDownload = () => {
//         const chartInstance = chatRef.current;
//         if(!chartInstance){
//             return;
//         }
//         const canvas = chartInstance.canvas;
//         const link = document.createElement('a');
//         link.href = canvas.toDataURL('image/png');
//         link.download = 'charts.png';
//         link.click();
//     };

//     return (
//         <div className="flex h-screen bg-gray-100 font-sans">
//             {/* Sidebar */}
//             <aside className="w-64 bg-indigo-700 text-white flex flex-col shadow-2xl">
//                 <div className="px-6 py-5 border-b border-indigo-500">
//                     <h2 className="text-2xl font-extrabold tracking-tight">📊 Excel Analytics</h2>
//                 </div>
//                 <nav className="flex-1 py-6 space-y-2">
//                     {/* <button className="w-full text-left px-6 py-3 hover:bg-indigo-600 transition font-medium">
//                         <ExcelFileViewer />
//                     </button> */}
//                     <button className="w-full text-left px-6 py-3 hover:bg-indigo-600 transition font-medium"
//                     value={"Excel Upload"} onClick={() => navigate('/ExcelUpload')}>
//                         Excel Upload
//                     </button>
//                     {/* <button
//                         onClick={() => navigate('/excelfileviewer')}
//                         className="w-full text-left px-6 py-3 hover:bg-indigo-600 transition font-medium"
//                     >
//                         ExcelFileViewer
//                     </button> */}
//                 </nav>
//             </aside>

//             {/* Main Area */}
//             <div className="flex-1 flex flex-col overflow-y-auto">
//                 {/* Topbar */}
//                 <header className="bg-white shadow px-8 py-5 flex justify-between items-center sticky top-0 z-10">
//                     <h1 className="text-2xl font-semibold text-indigo-800">📈 Dashboard</h1>
//                     <button
//                         onClick={() => {
//                             localStorage.removeItem('token');
//                             window.location.href = '/login';
//                         }}
//                         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                     >
//                         Logout
//                     </button>
//                 </header>


//             </div>
//         </div>
//     );
// }

import React from 'react';
import { Upload, BarChart3, ShieldCheck, ChartArea, Lightbulb } from 'lucide-react';
// import { useState, useRef } from 'react';
// import FileUpload from '../components/FileUpload';
// import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
// import ExcelFileViewer from '../components/ExcelFileViewer';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);



const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <>

            <main className=" min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex flex-col items-center justify-center px-6 py-12 ">
                {/* Header */}
                <header className="max-w-3xl text-center mb-12">
                    <h1 className="text-5xl font-bold text-indigo-700 leading-tight">
                        📊 Excel Analytics Platform
                    </h1>
                    <p className="mt-4 text-lg text-gray-700">
                        Upload. Analyze. Visualize your Excel data with beautiful charts and secure access.
                    </p>
                </header>

                {/* Upload Section */}
                <section className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mb-16">
                    <h2 className="text-xl font-semibold text-indigo-600 mb-4">🚀 Get Started</h2>
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <p className="text-gray-600">Start by uploading your Excel file to see visual insights instantly.</p>
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
                            onClick={() => navigate('/excelfileviewer')}>
                            Upload File
                        </button>
                    </div>
                </section>

                {/* Features */}
                {/* <section className="grid md:grid-cols-3 gap-8 text-center"> */}
                <section className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border hover:scale-105 transition"
                        onClick={() => navigate('/excelfileviewer')}>
                        <BarChart3 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive 2D Charts</h3>
                        <p className="text-sm text-gray-600">Visualize your Excel data with bar, line, pie, and scatter charts powered by Chart.js.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border hover:scale-105 transition"
                        onClick={() => navigate('/insightpage')}>
                        {/* <ShieldCheck className="w-12 h-12 text-indigo-600 mx-auto mb-4" /> */}
                        <Lightbulb className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                        {/* <ChartArea className="w-12 h-12 text-indigo-600 mx-auto mb-4" /> */}
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Suggestion</h3>
                        <p className="text-sm text-gray-600">All your data is protected with authentication and secure routes.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border hover:scale-105 transition"
                        onClick={() => navigate('/threedchart')}>
                        {/* <Upload className="w-12 h-12 text-indigo-600 mx-auto mb-4" /> */}
                        <ChartArea className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive 3D Charts</h3>
                        <p className="text-sm text-gray-600">Drop browse Excel files with visulize 3D charts</p>
                    </div>

                </section>


                {/* <div className="w-full h-full pb-0">

                    <Footer />
                </div> */}
            </main>
            {/* <Footer /> */}
        </>


    );
};

export default Dashboard;
