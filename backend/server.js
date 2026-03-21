const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
const path = require('path');


// Load environment variables
dotenv.config(); // Loads from ./backend/.env
dotenv.config({ path: '../.env' }); // Fallback to root .env
const app = express();
const PORT = process.env.PORT || 5005;

// CORS configuration (Allow all for simplified local setup, can be restricted in prod)
app.use(cors());
app.use(express.json());

// Serve static files from the frontend build folder
app.use(express.static(path.join(__dirname, '../frontend/dist')));


// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Fallback for Single Page Application (SPA) routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});




// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

