let list = document.querySelector('#expenses');
const btn = document.querySelector('.btn');
const URL = `http://localhost:3000/expense`;
const token = localStorage.getItem('token')
let id=null;
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
    if (id == null)
    {
      
     
      const res = await axios.post(`${URL}/addExpense`, objInput, {
        headers: {auth: token}
      });
      console.log(res.data.data)
    
    
    addExpense(res.data.data)
  }
    
    else{
      addExpense(objInput)
      clearInputFields()
      console.log(id)
      const result = await axios.post(`${URL}/edit-expense/${id}`,objInput,{
        headers: {auth: token}
      });
    console.log(result)
  
    }
    
  } catch (error) {
    console.log(error);
  }
finally{clearInputFields()}


  function clearInputFields (){
   document.querySelector('#amount').value = '';
document.querySelector('#description').value = '';
document.querySelector('#category').value = 'Fuel';}
 
});


addExpense = (res)=>{
  const expenseItem = document.createElement('li');

        expenseItem.innerHTML = `
          <span>${res.description}</span>
          <span>${res.amount}</span>
          <span>${res.category}</span>
          <button class="delete-btn" id="${res.id}">Delete</button>
          <button class="edit-btn">Edit</button>
        `;
  
        const deleteButton = expenseItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function () {
        list.removeChild(expenseItem);
        const id = deleteButton.getAttribute('id')
        //console.log(id)
        axios.delete(`${URL}/deleteExpense/${id}`,{
          headers: {auth: token}
        })
        });
  

        const editButton = expenseItem.querySelector('.edit-btn')
        editButton.addEventListener('click', function () {

          list.removeChild(expenseItem);
          id= res.id
          document.querySelector('#amount').value = res.amount;
          document.querySelector('#description').value = res.description;
          document.querySelector('#category').value = res.category;
          });
        list.appendChild(expenseItem);
}

getAll =async ()=>{
  const res = await axios.get(URL,{ headers: {
    'auth': token,
  }}
   );
  //console.log(res.data.data)
  res.data.data.forEach(data=>{
    addExpense(data)
  })
}
getAll()