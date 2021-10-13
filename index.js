require('dotenv').config();
const { PORT = 3000 } = process.env
const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors());
const bodyParser = require('body-parser');
server.use(bodyParser.json());

const apiRouter = require('./api');
server.use('/api', apiRouter);


const client = require('./db/client');

const morgan = require('morgan');
server.use(morgan('dev'));

server.use((req, res, next) =>{
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
    next();
});
server.listen(PORT, () => {
    console.log('The server is up on port', PORT);
    client.connect();
  });

