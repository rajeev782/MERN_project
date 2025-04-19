// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Models
const User = require('./models/User');
const Podcast = require('./models/Podcast');

// =====================
// AUTH ROUTES
// =====================

// Register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required' });

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required' });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
});

// =====================
// PODCAST ROUTES
// =====================

// Get All Podcasts
app.get('/api/podcasts', async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching podcasts', error: error.message });
  }
});

// Create Podcast
app.post('/api/podcasts', async (req, res) => {
  const { title, description, audioUrl, imageUrl } = req.body;

  if (!title || !audioUrl)
    return res.status(400).json({ message: 'Title and audioUrl are required' });

  try {
    const newPodcast = new Podcast({ title, description, audioUrl, imageUrl });
    await newPodcast.save();
    res.status(201).json(newPodcast);
  } catch (error) {
    res.status(500).json({ message: 'Error creating podcast', error: error.message });
  }
});

// Update Podcast
app.put('/api/podcasts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, audioUrl, imageUrl } = req.body;

  try {
    const updatedPodcast = await Podcast.findByIdAndUpdate(
      id,
      { title, description, audioUrl, imageUrl },
      { new: true }
    );

    if (!updatedPodcast)
      return res.status(404).json({ message: 'Podcast not found' });

    res.json(updatedPodcast);
  } catch (error) {
    res.status(500).json({ message: 'Error updating podcast', error: error.message });
  }
});

// Delete Podcast
app.delete('/api/podcasts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPodcast = await Podcast.findByIdAndDelete(id);
    if (!deletedPodcast)
      return res.status(404).json({ message: 'Podcast not found' });

    res.json({ message: 'Podcast deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting podcast', error: error.message });
  }
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
