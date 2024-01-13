let list = document.querySelector('#expenses');
const btn = document.querySelector('.btn');
const URL = `http://3.215.255.202/expense`;
const URLpremium = `http://3.215.255.202/premium`;

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


window.addEventListener('DOMContentLoaded', async()=>{
  downloadedUrls()
  
  const numOfExpenses = localStorage.getItem('numOfExpenses')
  const res = await axios.post(`${URL}`, {numOfExpenses, numOfExpenses}, { headers: {
    "auth": token
  }})

  getAll(res)
  if(numOfExpenses > res.data.totalExpenses){
    document.querySelector('#next').classList.add('hide')
  }
 
  console.log(res.data.isPremium)
  if(!res.data.isPremium){
    const btn =  document.querySelector('.premium')
    const button = document.createElement('button')
    button.textContent= 'Buy Premium Membership';
    btn.appendChild(button);
    button.addEventListener('click', handleClick)
    document.querySelector('.download').addEventListener('click', (e)=>{
      alert('not a premium user')
    })
  }

  else{
   document.querySelector('.premium').textContent = 'Already premium Member';
   const Leaderboard = document.createElement('button');
   Leaderboard.textContent = 'Show Leaderboard';
   document.querySelector('.premium').appendChild(Leaderboard).classList.add('Leaderboard')
   document.querySelector('.Leaderboard').addEventListener('click', leaderBoardShow )
   document.querySelector('.download').addEventListener('click', download)

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
    "amount" : res.data.order.amount,
    "handler": async function(res)
    {const response = axios.post(`${URL}/purchase/updateTransaction`, {
      orderId: options.orderId,
      paymentId: res.razorpay_payment_id,
      "razorpay_signature": res.razorpay_signature
    }, { headers: {
      auth: token
    }})
    console.log(response)
     alert('you are premium user')
     localStorage.setItem('premium' , 1)
     document.querySelector('.premium').textContent = 'Already premium Member';  
     const Leaderboard = document.createElement('button');
     Leaderboard.textContent = 'Show Leaderboard';
     document.querySelector('.premium').appendChild(Leaderboard).classList.add('Leaderboard')
   document.querySelector('.Leaderboard').addEventListener('click', leaderBoardShow )


  }
}
const rzp1 = new Razorpay(options);
console.log(options)
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
rzp1.open();
e.preventDefault();
}



document.querySelector('.Logout').addEventListener('click', async(e)=>{
  localStorage.removeItem("token")
  
  window.location = '/frontend/login/login.html'
})

async function leaderBoardShow(e){
 document.querySelector('.LeaderboardList').textContent=''
 e.preventDefault()
 
try {  
 const res = await axios.get(`${URLpremium}`);
 console.log(res)
 res.data.forEach(entry => {
 const leaderBoardData = document.createElement('ul')
 leaderBoardData.innerHTML = `<li>${entry.name} <span> - ${entry.totalSum || 0}</li>`
 document.querySelector('.LeaderboardList').appendChild(leaderBoardData)
   console.log(entry)
})
}

catch(err){
 console.log(error)
}
}

async function download (e){
  const res = await axios.get(`${URL}/download`,
  {
    headers: {
      auth: token
    }
  });
  console.log(res.data)
  let a = document.createElement("a");
  a.href = res.data.fileUrl;
  a.download = 'myexpense.esv';
  a.click()
}

document.querySelector('.numOfExpensesBtn').addEventListener('click',async (e)=>{
  e.preventDefault();
  const numOfExpenses = document.querySelector('.numOfExpenses').value;
  //console.log(numOfExpenses)
  localStorage.setItem('numOfExpenses', numOfExpenses)
  document.querySelector('.expenses').textContent = ""
  const res = await axios.post(`${URL}`, {numOfExpenses, numOfExpenses}, { headers: {
    "auth": token
  }})
  if(numOfExpenses > res.data.totalExpenses){
    document.querySelector('#next').classList.add('hide')
  }
  else{
    document.querySelector('#next').classList.remove('hide')

  }
  getAll(res)
  
})

getAll =async (res)=>{
  res.data.expenses.forEach(data=>{
    addExpense(data)
  })

}


document.querySelector('.pageNumber').addEventListener('click',async (e)=>{
  const numOfExpenses = localStorage.getItem('numOfExpenses')|| 5;
const page = e.target.value;
//console.log(page)
const result = await axios.post(`${URL}?page=${page}` ,{numOfExpenses: numOfExpenses},{ headers: {
  'auth': token,
}}
 );
 document.querySelector('.expenses').textContent= ""
 result.data.expenses.forEach(data=>{  
  addExpense(data)
})
//console.log(e.target.id)
if(result.data.totalExpenses < numOfExpenses){
  next.classList.add('hide')
}
if(e.target.id == 'next'){

  prev.classList.remove('hide')
  prev.textContent = curr.textContent
  prev.value = curr.value
  
  curr.textContent = next.textContent
  curr.value = next.value

  if(result.data.totalExpenses > numOfExpenses * page){
      next.value = +page + 1
      next.textContent = +page + 1
}else{
  next.classList.add('hide')
}
}
else if(e.target.id == 'prev'){

  if(page > 1){
    next.classList.remove('hide')
prev.textContent = page-1;
prev.value = page-1

curr.textContent = page;
curr.value = page;

next.textContent = +page+1;
next.value = +page+1
}
else{
  prev.classList.add('hide')
  curr.textContent = 1;
  curr.value = 1
  if(result.data.totalExpenses > numOfExpenses * page){
    next.value = 2;
    next.textContent = 2
    next.classList.remove('hide')
  }
  else{
    next.classList.add('hide')
  }
}
}
})
async function downloadedUrls(){
const url = await axios.get(`${URL}/downloadedFiles`,
{
  headers: {
    auth: token
  }
});
url.data.url.forEach(entry =>{
  const li = document.createElement('li')
  const url = document.createElement('a')
  url.href = entry.url;
  url.download = new Date (entry.createdAt).toDateString('en-US') + '-expense.txt'
  url.textContent = new Date (entry.createdAt).toDateString('en-US') + '-expense.txt'

  li.appendChild(url)
  document.querySelector('.urls').appendChild(li)
})

  console.log(url.data.url)}