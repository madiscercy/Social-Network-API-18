const express = require('express');
const db = require('./config/connection'); // Add this line to import the connection

const { userRoutes, thoughtRoutes } = require('./routes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

// Add the following event listeners for the connection
db.on('connected', () => {
	console.log('Connected to MongoDB');
});

db.on('error', (error) => {
	console.log('Error connecting to MongoDB:', error);
});

db.on('disconnected', () => {
	console.log('Disconnected from MongoDB');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
