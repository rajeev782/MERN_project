// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Home = () => {
    return (
        <div className="min-vh-100 bg-gradient-to-br from-blue-900 via-purple-800 to-purple-900 text-white d-flex flex-column justify-content-center align-items-center px-4">
            <h1 className="display-4 text-center mb-4">Podcast Paradise</h1>
            <p className="lead text-center max-w-xl mb-10">
                Unite, Listen, Discover — Your Gateway to Diverse Conversations and Knowledge
            </p>

            <div className="card bg-white text-dark p-6 rounded-2xl shadow-lg text-center max-w-md w-100">
                <h2 className="card-title text-2xl font-weight-bold mb-2">Welcome to Podcast Paradise</h2>
                <p className="card-text mb-6 text-sm">Explore a world of podcasts tailored to your auditory adventure.</p>
                
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/register">
                        <button className="btn btn-primary px-6 py-2 rounded-lg font-semibold">
                            Register Now
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="btn btn-outline-primary px-6 py-2 rounded-lg font-semibold">
                            Log In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
