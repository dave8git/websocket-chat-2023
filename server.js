const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');

const server = app.listen(8000, () => {
    console.log('Server is running on Port:', 8000);
});

app.use(express.static(path.join(__dirname, '/client')));

const io = socket(server);
const messages = [];
const users = [];
io.on('connection', (socket) => {

    socket.on('join', (userName) => {
        users.push({ name: userName, id: socket.id });
        socket.broadcast.emit('addUser', {
          author: 'Chat-Bot',
          userName: `${userName} has joined the conversation`
        })
 
    });
    
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        const user = users.find(user => user.id === socket.id);
        console.log(user);
        if(user) {
            socket.broadcast.emit('message', { author: 'Chat-Bot', content: `${user.name} has left the conversation :(`});
            users.splice(user, 1);
        }
    });
});

console.log(users);

app.get('*', (req, res) => { //renderuje wszystkie linki
    res.sendFile(path.join(__dirname, '/client/index.html'));
});