const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;



app.get('/test', (req, res) => {
    res.sendStatus(200);
});


// working!









app.listen(PORT, () => console.log('listing on 3000'));