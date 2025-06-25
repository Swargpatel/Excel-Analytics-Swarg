// pages/AdminLogin.js
import { useState } from 'react';
import API from '../services/api';

export default function AdminLogin({ setAdmin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const res = await API.post('/auth/login', { email, password });
        localStorage.setItem('adminToken', res.data.token);
        setAdmin(true);
    };

    return (
        <div className="p-6 max-w-sm mx-auto bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Admin Login</h2>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="mb-2 border p-2 w-full" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="mb-4 border p-2 w-full" />
            <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
            
        </div>
    );
}
