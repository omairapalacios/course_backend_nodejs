const btnSave = document.querySelector('#btn-save');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const url = document.querySelector('#url');

btnSave.addEventListener('click', saveProduct);

async function saveProduct() {
  console.log(title.value);
  console.log(price.value);
  console.log(url.value);
  await fetch('/api/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title.value,
      price: price.value,
      url: url.value,
    }),
  });
  clearForm();
}

function clearForm() {
  document.querySelector('#title').value = '';
  document.querySelector('#price').value = '';
  document.querySelector('#url').value = '';
}
