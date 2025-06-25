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
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="space-y-2">
                <p>Total Users: {stats.userCount}</p>
                <p>Total Excel Files: {stats.recordCount}</p>
                <p>Total Insights: {stats.insightCount}</p>
            </div>
            <div onClick={() => {navigate('/admin/register')}}>Register new Admin</div>

        </div>
    );
}
