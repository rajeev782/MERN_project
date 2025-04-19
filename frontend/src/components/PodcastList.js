// src/components/PodcastList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/podcasts');
        setPodcasts(response.data);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/podcasts/${id}`);
      setPodcasts((prev) => prev.filter((podcast) => podcast._id !== id));
    } catch (error) {
      console.error('Error deleting podcast:', error);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">🎧 Podcast List</h2>
        <Link to="/podcasts/create" className="btn btn-success">
          <i className="bi bi-plus-circle me-2"></i>New Podcast
        </Link>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Loading podcasts...</p>
        </div>
      ) : podcasts.length === 0 ? (
        <div className="alert alert-info text-center">No podcasts available. Start by creating one!</div>
      ) : (
        <div className="row">
          {podcasts.map((podcast) => (
            <div key={podcast._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={podcast.imageUrl || 'https://via.placeholder.com/300x180?text=Podcast+Cover'}
                  className="card-img-top"
                  alt={podcast.title}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{podcast.title}</h5>
                  <p className="card-text">{podcast.description}</p>
                  <audio controls className="mt-auto w-100">
                    <source src={podcast.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link to={`/podcasts/update/${podcast._id}`} className="btn btn-warning btn-sm">
                    <i className="bi bi-pencil-fill me-1" />
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(podcast._id)}
                  >
                    <i className="bi bi-trash-fill me-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PodcastList;
