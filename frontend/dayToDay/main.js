const url = `http://localhost:3000/report`;
const token = localStorage.getItem('token')
window.addEventListener('DOMContentLoaded', async(e)=>{
    const date = new Date()
    document.querySelector('.today').textContent = date.toDateString('en-US')
})

document.querySelector('.submitdate').addEventListener('click', async (e)=>{
    const date = document.querySelector('.Date').value;
    console.log(date)
    const data = await axios.post(`${url}/today`, {date: date}, {
        headers: {auth: token}
      })
    console.log(data.data)
})

