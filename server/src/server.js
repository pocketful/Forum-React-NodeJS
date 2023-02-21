const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');
const questionsRoute = require('./routes/questionsRoute');
const answersRoute = require('./routes/answersRoute');

const app = express();

// Middlewares
app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // JSON to JS
app.use(cors()); // Enable All CORS Requests

app.get('/', (req, res) => {
  res.json('ok');
});

// Routes
app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', questionsRoute);
app.use('/api', answersRoute);

app.all('*', (req, res) => {
  res.status(404).json({ err: 'Route not found.' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
