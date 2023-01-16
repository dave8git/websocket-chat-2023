const socket = io(); 
socket.on('message', ({author, content}) => addMessage(author, content));
  socket.on('addUser', ({ author, userName }) => {
    const content = userName + ' has joined the conversation!'
    addMessage(author, content);
  });

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;
console.log(userName);
loginForm.addEventListener('submit', event => login(event));
addMessageForm.addEventListener('submit', event => sendMessage(event));

function login(event) {
    event.preventDefault();

    if (userNameInput.value) {
        console.log(userNameInput.value);
        userName = userNameInput.value;
        console.log(userName);
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
        socket.emit('join', userName);
    } else {
        alert('Proszę coś wpisać, cokolwiek ;)')
    }
}

function sendMessage(e) {
    e.preventDefault();  
    let messageContent = messageContentInput.value;
    console.log(messageContent);
    if(messageContent === '') {
        alert('Please write something?!');
    } else {
        addMessage(userName, messageContent); 
        socket.emit('message', {author: userName, content: messageContent});
        messageContentInput.value = '';
    }

   
}


const addMessage = (author, content) => {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (author === userName) {
        message.classList.add('message--self')
    } else if (author === 'Chat-Bot') {
        message.classList.add('bot')
    }
    message.innerHTML +=
        `<h3 class="message__author">${author === userName ? 'You' : author}</h3>
        <div class="message__content"> ${content} </div>`

    messagesList.appendChild(message)
};


  