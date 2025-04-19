// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import CreatePodcast from './components/CreatePodcast';
import UpdatePodcast from './components/UpdatePodcast';
import PodcastList from './components/PodcastList';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center" autoClose={3000} />

        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-mic me-2" />
            PodStream
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/podcasts">Podcasts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/podcasts/create">Create</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Routes */}
        <main className="container my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/podcasts" element={<PodcastList />} />
            <Route path="/podcasts/create" element={<CreatePodcast />} />
            <Route path="/podcasts/update/:id" element={<UpdatePodcast />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
