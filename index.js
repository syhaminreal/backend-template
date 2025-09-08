const express = require('express');
const { config } = require('dotenv');
const { default: mongoose } = require('mongoose');
const cors = require('cors');

config();

const port = process.env.PORT_ADDR || 8000;
const mongoAddr = process.env.MONGO_ADDR;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Default route to check server
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});



// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error.message || 'Request execution error.'
    });
});

// Start server and connect to MongoDB
app.listen(port, async () => {
    console.log(`Server started at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop');

    try {
        await mongoose.connect(mongoAddr);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
    }
});
