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

socket.on('server:sendMessages', async (mensajes) => {
  const resp = await fetch('./chat.handlebars');
  const hbs = await resp.text();
  const template = Handlebars.compile(hbs);
  const html = template({ mensajes });
  containerChat.innerHTML = html;
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
      document.getElementById('newMessage').value += node.textContent;
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
