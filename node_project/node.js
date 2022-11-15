const express = require('express');
const app = express();

app.route('/api/Home-page').get((req, res) =>{
                    res.send({
                      Name: [{name: 'Ritu', position: 'Angular Developer'}]
                    });
});
app.listen(8000, () =>{
                    console.log('Server Started!');
});

