
const express = require('express');
const authRoutes = require('./routes/auth');
const assignmentsRoutes = require('./routes/assignments');
const dontenv = require('dotenv')

dontenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Protected assignments routes
app.use('/assignments', assignmentsRoutes);
    

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
