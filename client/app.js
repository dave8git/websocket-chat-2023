
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;
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
    } else {
        alert('Proszę coś wpisać, cokolwiek ;)')
    }
}

function sendMessage(e) {
    e.preventDefault();  

    if(messageContentInput.value === '') {
        alert('Please write something?!');
    } else {
        addMessage(userName, messageContentInput.value); 
        messageContentInput.value = '';
    }
}

function addMessage(author, content) {
    const message = document.createElement('li');
    const messageAuthor = document.createElement('h3');
    const messageContent = document.createElement('div');

    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    messageAuthor.classList.add('message__author');
    messageContent.classList.add('message__content');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }