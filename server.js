const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// replace DBname with database name
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/DBName', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
