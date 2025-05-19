const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./utils/db.js');
const userRoutes = require('./routes/userRoutes.js');
const noteRoutes = require('./routes/noteRoute.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// Serve static frontend files in production
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "dist");
    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

connectDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
