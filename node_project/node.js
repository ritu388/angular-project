const express = require('express');
const app = express();
const router = require('./router');
const {xyz}=require('./controller');

app.use('/api',router)

console.log("hey")
app.listen(8000, () =>{
                    console.log('Server Started!');
});

