import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});


// it will Add JWT token to every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// API to generate insights
export const generatedInsights = (recordId) => {
    return API.post('/insight/analyze', { recordId });
};

export default API;
