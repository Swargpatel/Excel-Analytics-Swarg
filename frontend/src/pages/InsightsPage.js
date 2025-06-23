import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import InsightCard from '../components/InsightCard'; 
import FileUpload from '../components/FileUpload';

const InsightsPage = () => {
    const [id, setId] = useState('');
    const [insights, setInsights] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchInsights = async () => {
        try {
            const res = await API.post('/insight/analyze', { recordId: id });
            setInsights(res.data.insights);
        } catch (err) {
            console.error(err);
            setError('❌ Failed to fetch AI analysis.');
        } finally {
            setLoading(false);
        }
    };

    const handleid =(data)=>{
        setId(data.recordId);
    }
    

    useEffect(() => {
        if (id !== "") fetchInsights();
    }, [id]);

    return (
        
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <FileUpload onParsed={handleid} />
            <div className="max-w-3xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold text-center text-indigo-700">
                    🧠 Smart Analysis for Record {id}
                </h1>

                {loading && <p className="text-center text-gray-500">Analyzing data...</p>}
                {error && <p className="text-center text-red-600">{error}</p>}

                {!loading && insights && <InsightCard insights={insights} />}
            </div>
        </div>
    );
};

export default InsightsPage;
