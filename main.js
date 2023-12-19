let list = document.querySelector('#expenses').innerHTML;
const btn = document.querySelector('.btn');
const URL = `http://localhost:3000/expense`;

btn.addEventListener('click', async (e) => {

  e.preventDefault();

  let amountInput = document.querySelector('#amount').value;
  let descriptionInput = document.querySelector('#description').value;
  let categoryInput = document.querySelector('#category').value;

  const objInput = {
    amount: amountInput,
    description: descriptionInput,
    category: categoryInput
  };

  try {
    const res = await axios.post(URL, objInput);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }

  document.querySelector('#amount').value = '';
  document.querySelector('#description').value = '';
  document.querySelector('#category').value = '';
});


