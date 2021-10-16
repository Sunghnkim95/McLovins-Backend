require('dotenv').config();
const { PORT = 3000 } = process.env
const express = require('express');
const server = express();
const helmet = require('helmet');
const router = express.Router()
//server.use(helmet());
const bodyParser = require('body-parser');
server.use(bodyParser.json());

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
server.use(function(req, res, next) {
    res.setHeader('Content-Security-Policy', "connect-src 'self' localhost")
    return next()
} );

const apiRouter = require('./api');

server.use('/api', apiRouter);


const client = require('./db/client');

const morgan = require('morgan');
const { appendFile } = require('fs');
const { getOrderHistoryByUserId } = require('./db');
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

