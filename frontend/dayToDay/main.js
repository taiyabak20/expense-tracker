const url = `http://localhost:3000/report`;
const expenseUrl = `http://localhost:3000/expense/`;
const token = localStorage.getItem('token')
const premium = localStorage.getItem('premium')
window.addEventListener('DOMContentLoaded', async(e)=>{
    const date = new Date()
    document.querySelector('.today').textContent = date.toDateString('en-US');
   console.log(premium)
if(!premium){
document.querySelector('.btn').addEventListener('click', (e) =>{
    e.preventDefault();
    alert('Not a premium Member')
})
}

    document.querySelector('.btn').addEventListener('click',async (e) =>{
        e.preventDefault();
            const res = await axios.get(`${expenseUrl}/download`,
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
    )
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
    let current_date;
    let sum = 0;
    let sum2 = 0
    data.data.forEach(entry =>{

        if(tableBody == document.querySelector('.yearTable')){
            console.log("fndsjhfj")
            entry.createdAt =  new Date(entry.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
            });
        }
        else{
            entry.createdAt =  new Date(entry.createdAt).toDateString('en-US');
        }
if(current_date == entry.createdAt || current_date == null){
    sum += entry.amount;
    sum2 += entry.amount;
     const row = tableBody.insertRow();

     const dateCell = row.insertCell(0);
     const descriptionCell = row.insertCell(1);
     const categoryCell = row.insertCell(2);
     const expenseCell = row.insertCell(3);

     dateCell.textContent = entry.createdAt; 
     descriptionCell.textContent = entry.description;
     categoryCell.textContent = entry.category;
     expenseCell.textContent = entry.amount;
     current_date = entry.createdAt;
    
}
else{
    const row2 =  tableBody.insertRow();
    row2.insertCell(0);
    row2.insertCell(1);
    row2.insertCell(2);
    row2.insertCell(3).innerHTML =`<b>Total Expense: ${sum}</b>`;
sum = 0;
sum += entry.amount;
sum2 += entry.amount;

     const row = tableBody.insertRow();

     const dateCell = row.insertCell(0);
     const descriptionCell = row.insertCell(1);
     const categoryCell = row.insertCell(2);
     const expenseCell = row.insertCell(3);
     
     dateCell.textContent = entry.createdAt; 
     descriptionCell.textContent = entry.description;
     categoryCell.textContent = entry.category;
     expenseCell.textContent = entry.amount;
     current_date = entry.createdAt;
}
    })

    const row = tableBody.insertRow();
     const dateCell = row.insertCell(0);
     const descriptionCell = row.insertCell(1);
     const categoryCell = row.insertCell(2);
     const expenseCell = row.insertCell(3).innerHTML = `<b>Total Expense: ${sum}</b>`

     const row2 = tableBody.insertRow();
     row2.insertCell(0)
     row2.insertCell(1)
     row2.insertCell(2)
     row2.insertCell(3).innerHTML = `<b>Grand Total Expense : ${sum2}</b>`

}
