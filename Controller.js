// estas declarações são basicamente "imports" no back-end
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.send('Hello world with nodemon!')
});

// ..recebe a porta do env ou em caso de local é a porta 3000
let port = process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Started Server!');
});