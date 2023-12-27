const btn = document.querySelector('#signup')
const url = `http://localhost:3000/signup/addUser`

addingUser = async (e) =>{
    e.preventDefault();
    
    const obj = {
        name : e.target.nameInput.value,
        email : e.target.emailInput.value,
        password : e.target.passwordInput.value
    }
    axios.post(url, obj)
    console.log(obj)
     e.target.nameInput.value = ""
     e.target.emailInput.value= ""
     e.target.passwordInput.value= ""
}

btn.addEventListener('submit', addingUser)
