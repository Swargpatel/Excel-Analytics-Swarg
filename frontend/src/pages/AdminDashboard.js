// pages/AdminDashboard.js
import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [stats, setStats] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            const res = await API.get('/admin/dashboard', {
                headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
            });
            setStats(res.data);
        };
        fetchStats();
    }, []);

    return (
        // <div className="p-8">
        //     <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        //     <div className="space-y-2">
        //         <p>Total Users: {stats.userCount}</p>
        //         <p>Total Excel Files: {stats.recordCount}</p>
        //         <p>Total Insights: {stats.insightCount}</p>
        //     </div>
        //     <div onClick={() => {navigate('/admin/register')}}>Register new Admin</div>

        // </div>

        <div className="min-h-screen bg-gray-100 px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
                    Admin Dashboard
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                        <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
                        <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.userCount}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                        <h2 className="text-lg font-semibold text-gray-600">Total Files</h2>
                        <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.recordCount}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                        <h2 className="text-lg font-semibold text-gray-600">Total Insights</h2>
                        <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.insightCount}</p>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => navigate('/admin/register')}
                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-300"
                    >
                        ➕ Register as New Admin
                    </button>
                </div>
            </div>
        </div>
    );
}
