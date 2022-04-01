// const btnSave = document.querySelector('#btn-save');
// const title = document.querySelector('#title');
// const price = document.querySelector('#price');
// const url = document.querySelector('#url');
const containerChat = document.getElementById('hbs-chat');

// btnSave.addEventListener('click', sendMessage);

// function sendMessage() {
//   socket.emit('client:sendMessage', {
//   email: email.value,
//   message: message.value,
//   fechaHora: dayjs().format('DD/MM/YYYY HH:MM:SS'),
//   });
//   clearForm();
// }

// function clearForm() {
//   document.querySelector('#title').value = '';
//   document.querySelector('#price').value = '';
//   document.querySelector('#url').value = '';
// }

  function sendMessage() {
    let message = document.getElementById("message");
    let email = document.getElementById("email");
    socket.emit('client:newMessage', {
      email: email.value,
      message: message.value,
      fechaHora: dayjs().format('DD/MM/YYYY HH:MM:ss'),
    });
    // localStorage.setItem("email", from);

    // App.messages.push(new Message(message, from));
    // document.getElementById("message").value = "";

    // localStorage.setItem("messages", JSON.stringify(App.messages));
    // App.refreshChat();
  }

  function renderMessages(messages) {
    let div = document.getElementById("chat-content");

    for (
      let index = div.childNodes.length - 1;
      index < messages.length;
      index++
    ) {
      const element = messages[index];
      let msg = document.createElement("span");

      msg.id = "msg-" + index;
      msg.classList.add("msg");
      msg.innerHTML = "<div class='head'> " + element.email + " </div>";
      msg.innerHTML += "<p class='body'> " + element.message + " </p>";
      msg.innerHTML += "<div class='footer'> " + element.fechaHora + " </div>";
      div.appendChild(msg);
    }
  }

socket.on('server:sendMessages', async (messages) => {
  const resp = await fetch('./chat.handlebars');
  const hbs = await resp.text();
  const template = Handlebars.compile(hbs);
  const html = template({ messages });
  containerChat.innerHTML = html;
  renderMessages(messages);
  getEmojis();
});

function getEmojis() {
  let activated = false;
  let emojiBtn = document.getElementById('emoji');

  let emojiList = [
    '👍',
    '👌',
    '👏',
    '🙂',
    '😀',
    '😃',
    '😉',
    '😊',
    '😋',
    '😌',
    '😏',
    '😐',
    '😑',
    '😒',
    '😓',
    '😂',
    '🤣',
    '😅',
    '😆',
    '😜',
    '😙',
    '😘',
  ];
  emojiList.forEach((element) => {
    let list = document.getElementById('emoji-list');
    let node = document.createElement('span');
    node.classList.add('emoji');
    node.textContent = element;
    node.onclick = (ev) => {
      document.getElementById('message').value += node.textContent;
    };
    list.appendChild(node);
  });
emojiBtn.onclick = function (evt) {
  activated = !activated;

  let list = document.getElementById('emoji-list');
  if (activated) {
    list.style.display = 'flex';
  } else {
    list.style.display = 'none';
  }
};
}
