const express = require('express');
const passport = require('passport');

const app = express();
const cors = require('cors');
const router = require('./router/router');
require('dotenv').config();

const port = process.env.PORT || 8080;

const corsOptions = {
  origin: process.env.CORS_ORIGIN_OPTION,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

app.get('/', (req, res) => res.send('Hello welcome to Attendance-server'));
app.use('*', (req, res) => {
  // return an error
  res.status(404).json({
    status: 'error',
    message: '這是個未被定義的路由',
  });
});
