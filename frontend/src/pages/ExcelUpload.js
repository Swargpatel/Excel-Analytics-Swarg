import React, { useState } from 'react'
import FileUpload from '../components/FileUpload'
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
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

function ExcelUpload() {
    const [chartData, setChartData] = useState(null);
    const [columns, setColumns] = useState([]);
    const [xAxis, setXAxis] = useState('');
    const [yAxis, setYAxis] = useState('');
    const [selectedChart, setSelectedChart] = useState('bar');

    const handleParsedData = (data) => {
        const keys = Object.keys(data[0]);
        setColumns(keys);
        setXAxis(keys[0]);
        setYAxis(keys[1] || keys[0]);

        const xData = data.map(row => row[keys[0]]);
        const yData = data.map(row => row[keys[1]]);

        setChartData({
            raw: data,
            labels: xData,
            datasets: [
                {
                    label: 'Excel Data',
                    data: yData,
                    backgroundColor: 'rgba(59, 130, 246, 0.6)'
                },
            ],
        });
    };

    const updateChartData = (newX, newY) => {
        if (!chartData?.raw) return;
        const xData = chartData.raw.map(row => row[newX]);
        const yData = chartData.raw.map(row => row[newY]);

        setChartData(prev => ({
            ...prev,
            labels: xData,
            datasets: [{ ...prev.datasets[0], data: yData }],
        }));
    };

    const renderChart = () => {
        if (!chartData || !xAxis || (!yAxis && selectedChart !== 'pie')) {
            return <div className="text-gray-500 italic">Please upload data and select axes.</div>;
        }

        switch (selectedChart) {
            case 'bar':
                return <Bar data={chartData} options={{ responsive: true }} />;
            case 'line':
                return <Line data={chartData} options={{ responsive: true }} />;
            case 'pie': {
                const groupedData = {};
                chartData.raw.forEach(row => {
                    const key = row[xAxis];
                    const value = parseFloat(row[yAxis]) || 0;
                    if (!groupedData[key]) groupedData[key] = 0;
                    groupedData[key] += value;
                });
                const labels = Object.keys(groupedData);
                const data = Object.values(groupedData);
                const backgroundColor = labels.map(() =>
                    `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
                );
                return <Pie data={{ labels, datasets: [{ data, backgroundColor }] }} options={{ responsive: true }} />;
            }
            case 'scatter':
                return <Scatter data={{ datasets: [{ label: `${xAxis} vs ${yAxis}`, data: chartData.raw.map(row => ({ x: row[xAxis], y: row[yAxis] })), backgroundColor: 'rgba(99, 102, 241, 0.6)' }] }} options={{ responsive: true }} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div >
                <section className="bg-white p-6 rounded-xl shadow-md border ">
                    <h2 className="text-lg font-semibold text-indigo-700 mb-4 ">📁 Upload Excel File</h2>
                    <FileUpload onParsed={handleParsedData} />
                </section>
            </div>
            {/* Chart Options */}
            <section className="bg-white p-6 rounded-xl shadow-md border">
                <h2 className="text-lg font-semibold text-indigo-700 mb-4">⚙️ Configure Chart</h2>
                <div className="space-y-4">
                    <select
                        className="w-full border p-3 rounded-lg shadow focus:ring-2 focus:ring-indigo-300"
                        value={selectedChart}
                        onChange={(e) => setSelectedChart(e.target.value)}
                    >
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                        <option value="pie">Pie Chart</option>
                        <option value="scatter">Scatter Chart</option>
                    </select>

                    {columns.length > 0 && (
                        <div className="flex flex-wrap gap-6">
                            <div className="flex-1 min-w-[200px]">
                                <label className="block mb-2 font-medium text-gray-700">X-Axis</label>
                                <select
                                    value={xAxis}
                                    onChange={(e) => {
                                        setXAxis(e.target.value);
                                        updateChartData(e.target.value, yAxis);
                                    }}
                                    className="w-full border p-2 rounded-md shadow-sm"
                                >
                                    {columns.map((col, i) => <option key={i} value={col}>{col}</option>)}
                                </select>
                            </div>
                            {selectedChart !== 'pie' && (
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block mb-2 font-medium text-gray-700">Y-Axis</label>
                                    <select
                                        value={yAxis}
                                        onChange={(e) => {
                                            setYAxis(e.target.value);
                                            updateChartData(xAxis, e.target.value);
                                        }}
                                        className="w-full border p-2 rounded-md shadow-sm"
                                    >
                                        {columns.map((col, i) => <option key={i} value={col}>{col}</option>)}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Chart Section */}
            <section className="bg-white p-6 rounded-xl shadow-md border">
                <h2 className="text-lg font-semibold text-indigo-700 mb-4">📊 Chart Preview</h2>
                {renderChart()}
            </section>



            {/* <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 px-4">
                <section className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-indigo-200 animate-fade-in">
                    <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">📁 Upload Excel File</h2>
                    <FileUpload onParsed={handleParsedData} />
                </section>
            </div> */}

        </>
    )
}

export default ExcelUpload
