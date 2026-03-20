const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from the root folder
dotenv.config({ path: '../.env' }); 

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Adaptive AI Onboarding Engine API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
