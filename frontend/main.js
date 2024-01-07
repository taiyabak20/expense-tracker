let list = document.querySelector('#expenses');
const btn = document.querySelector('.btn');
const URL = `http://localhost:3000/expense`;
const URLpremium = `http://localhost:3000/premium`;

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
    document.querySelector('.expenses').innerHTML=`<a href="/frontend/login/login.html">Please login properly!</a>`
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

window.addEventListener('DOMContentLoaded', async()=>{
  const res = await axios.get(`${URL}`, { headers: {
    "auth": token
  }})
  console.log(res.data.isPremium)
  if(!res.data.isPremium){
    const btn =  document.querySelector('.premium')
    const button = document.createElement('button')
    button.textContent= 'Buy Premium Membership';
    btn.appendChild(button);
    button.addEventListener('click', handleClick)
  }

  else{
   document.querySelector('.premium').textContent = 'Already premium Member';
  }
})

async function handleClick(e){
  const res = await axios.get(`${URL}/purchase/premium`,{
    headers: {
      "auth": token
    }
  })
  console.log(res.data)

  var options = 
  {
    "key": res.data.key_id,
    "orderId": res.data.order.id,
    "handler": async function(res)
    {const response = axios.post(`${URL}/purchase/updateTransaction`, {
      orderId: options.orderId,
      paymentId: res.razorpay_payment_id
    }, { headers: {
      auth: token
    }})
    console.log(res)
     alert('you are premium user')
     document.querySelector('.premium').textContent = 'Already premium Member';  
     
  }
}
const rzp1 = new Razorpay(options);
rzp1.open();
e.preventDefault();

rzp1.on('payment.failed', async function(res){
  alert('payment failed')

  const result = await axios.post(`${URL}/purchase/failed`, {
     orderId: options.orderId,
    "paymentId": res.error.metadata.payment_id
  }, {
    headers: {
      auth: token
    }
  })
  console.log(result)
})
}



document.querySelector('.Logout').addEventListener('click', async(e)=>{
  localStorage.removeItem("token")
  
  window.location = '/frontend/login/login.html'
})

document.querySelector('.Leaderboard').addEventListener('click', leaderBoardShow)

async function leaderBoardShow(e){
  document.querySelector('.LeaderboardList').textContent=''
  e.preventDefault()
  
try {  const res = await axios.get(`${URLpremium}`);
  console.log(res)
  res.data.forEach(entry => {
  const leaderBoardData = document.createElement('ul')
  leaderBoardData.innerHTML = `<li>${entry.name} <span> - ${entry.totalAmount || 0}</li>`
  document.querySelector('.LeaderboardList').appendChild(leaderBoardData)
    console.log(entry)
})
 }

 catch(err){
  console.log(error)
 }
}