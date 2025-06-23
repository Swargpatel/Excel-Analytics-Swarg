import React, { useEffect, useState } from 'react';
// import FileUpload from './FileUpload';
import API from '../services/api';
// import axios from 'axios';

const ViewFile = () => {
    const [fileData, setFileData] = useState(null);
    const [jsonData, setJsonData] = useState([]);
    // const [filename, setFilename] = useState(null);
    // const [chartData, setChartData] = useState(null);
    // const [columns, setColumns] = useState([]);
    // const [xAxis, setXAxis] = useState('');
    // const [yAxis, setYAxis] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                // http://localhost:5000/upload
                const res = await API.get('/upload');
                console.log(res.data);
                setFileData(res.data);
                setJsonData(res.data.jsonData);
            } catch (err) {
                console.error('Error fetching file:', err);
            }
        };

        fetchData();
    }, []);

    // console.log(recordId);

    // const handleDownload = () => {
    //     const link = document.createElement('a');
    //     link.href = `http://localhost:5000/uploads/${fileData.filename}`; // Update if using different static file path
    //     link.download = fileData.originalname || 'excel-file.xlsx';
    //     link.click();
    // };

    // const handleParsedData = (data) => {
    //     const keys = Object.keys(data[0]);
    //     setColumns(keys);
    //     setXAxis(keys[0]);
    //     setYAxis(keys[1] || keys[0]);

    //     const xData = data.map(row => row[keys[0]]);
    //     const yData = data.map(row => row[keys[1]]);

    //     setChartData({
    //         raw: data,
    //         labels: xData,
    //         datasets: [
    //             {
    //                 label: 'Excel Data',
    //                 data: yData,
    //                 backgroundColor: 'rgba(59, 130, 246, 0.6)'
    //             },
    //         ],
    //     });
    // };
    console.log(fileData);
    if (!fileData) return <div>Loading file details...</div>;

    return (
        <div className="p-4 border rounded-lg shadow mt-6">
            <h2 className="text-xl font-bold mb-2">Uploaded Excel File</h2>

            {/* <section className="bg-white p-6 rounded-xl shadow border border-gray-200 animate-fade-in">
                                    <h2 className="text-xl font-bold text-indigo-700 mb-3">📁 Upload Excel File</h2>
                                    <FileUpload onParsed={handleParsedData} />
            </section> */}
            <div className="mb-4">
                <p><strong>File Name:</strong> {fileData.originalname}</p>
                <p><strong>Uploaded At:</strong> {new Date(fileData.createdAt).toLocaleString()}</p>


            </div>

            {/* <div className="overflow-auto max-h-96 border rounded-lg">
                <table className="min-w-full text-sm text-left border">
                    <thead className="bg-gray-200 sticky top-0">
                        <tr>
                            {Object.keys(jsonData[""] || {}).map((col, idx) => (
                                <th key={idx} className="border px-3 py-1">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.map((row, rowIdx) => (
                            <tr key={rowIdx} className="even:bg-gray-50">
                                {Object.values(row).map((value, colIdx) => (
                                    <td key={colIdx} className="border px-3 py-1">{String(value)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}

            <div className="overflow-auto max-h-96 border rounded-lg">
                <table className="min-w-full text-sm text-left border">
                    {jsonData && jsonData.length > 0 && (
                        <>
                            <thead className="bg-gray-200 sticky top-0">
                                <tr>
                                    {Object.keys(jsonData[0]).map((col, idx) => (
                                        <th key={idx} className="border px-3 py-1">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {jsonData.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="even:bg-gray-50">
                                        {Object.values(row).map((value, colIdx) => (
                                            <td key={colIdx} className="border px-3 py-1">{String(value)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    )}
                    {(!jsonData || jsonData.length === 0) && (
                        <tbody>
                            <tr>
                                <td className="text-center p-4" colSpan={5}>No data available</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>

        </div>
    );
};

export default ViewFile;
