// src/components/UpdatePodcast.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const UpdatePodcast = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPodcast = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/podcasts/${id}`);
                const { title, description, audioUrl } = response.data;
                setTitle(title);
                setDescription(description);
                setAudioUrl(audioUrl);
            } catch (error) {
                console.error('Error fetching podcast:', error);
            }
        };

        fetchPodcast();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/podcasts/${id}`, { title, description, audioUrl }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/podcasts');
        } catch (error) {
            console.error('Error updating podcast:', error);
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Update Podcast</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Podcast Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        placeholder="Enter podcast title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        placeholder="Enter podcast description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="audioUrl" className="form-label">Audio URL</label>
                    <input
                        type="text"
                        id="audioUrl"
                        className="form-control"
                        placeholder="Enter audio URL"
                        value={audioUrl}
                        onChange={(e) => setAudioUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Update Podcast</button>
            </form>
        </div>
    );
};

export default UpdatePodcast;
