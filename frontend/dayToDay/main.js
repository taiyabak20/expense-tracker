const url = `http://localhost:3000/report`;
const expenseUrl = `http://localhost:3000/expense`;

const token = localStorage.getItem('token')
window.addEventListener('DOMContentLoaded', async(e)=>{
    const date = new Date()
    document.querySelector('.today').textContent = date.toDateString('en-US');
    const res = await axios.get(`${expenseUrl}`, { headers: {
        "auth": token
      }})
if(!res.data.isPremium){
document.querySelector('.btn').addEventListener('click', (e) =>{
    e.preventDefault();
    alert('Not a premium Member')
})
}
else{
    document.querySelector('.btn').addEventListener('click', (e) =>{
        e.preventDefault();
    })
}

      console.log(res.data.isPremium)
})

document.querySelector('.submitdate').addEventListener('click', submitdate)
document.querySelector('.submitmonth').addEventListener('click', submitmonth)
document.querySelector('.submityear').addEventListener('click', submityear)

async function submitdate (e){
    const date = document.querySelector('.Date').value;
    console.log(date)
    const data = await axios.post(`${url}/today`, {date: date}, {
        headers: {auth: token}
      })
        const tableBody = document.querySelector('.dateTable');
        showData(data, tableBody)
        console.log(data.data)

}

async function submitmonth (e){
    const month = document.querySelector('.month').value;
    console.log(month)
    const data = await axios.post(`${url}/month`, {month: month}, {
        headers: {auth: token}
      })
      const tableBody = document.querySelector('.monthTable');
      showData(data, tableBody)
      console.log(data.data)
}
async function submityear (e){
    const year = document.querySelector('.year').value;
    console.log(year)
    const data = await axios.post(`${url}/year`, {year: year}, {
        headers: {auth: token}
      })
      const tableBody = document.querySelector('.yearTable');
      showData(data, tableBody)
      console.log(data)

}

async function showData(data, tableBody){

    let sum = 0;
    data.data.forEach(entry =>{

        sum += entry.amount;
        console.log(sum)

     const row = tableBody.insertRow();

     const dateCell = row.insertCell(0);
     const descriptionCell = row.insertCell(1);
     const categoryCell = row.insertCell(2);
     const expenseCell = row.insertCell(3);

     dateCell.textContent = entry.createdAt; 
     descriptionCell.textContent = entry.description;
     categoryCell.textContent = entry.category;
     expenseCell.textContent = entry.amount;
     
    })

    const row = tableBody.insertRow();
     const dateCell = row.insertCell(0);
     const descriptionCell = row.insertCell(1);
     const categoryCell = row.insertCell(2);
     const expenseCell = row.insertCell(3).innerHTML = `<b>Total Expense: ${sum}</b>`

}
