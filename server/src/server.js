const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('ok');
});

app.all('*', (req, res) => {
  res.status(404).json({ err: 'Route not found.' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
