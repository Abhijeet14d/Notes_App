const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin: '*',
    })
);

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);


connectDB();
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})