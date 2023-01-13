const express = require('express');
const app = express(); 
const path = require('path');
const server = app.listen(8000, () => {
    console.log('Server is running on Port:', 8000);
});

app.use(express.static(path.join(__dirname, '/client')));

const messages = [];

app.get('*', (req, res) => { //renderuje wszystkie linki
    res.sendFile(path.join(__dirname, '/client/index.html'));
});