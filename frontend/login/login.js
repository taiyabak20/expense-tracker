const loginForm = document.querySelector('#login');
const url = `http://localhost:3000/login/user`;

logingIn = async (e) =>{
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const inputs = {
        email: email ,
        password: password
    };
    console.log(inputs)

    try{
        const res = await axios.post(url, inputs)
        console.log(res)
    }
    catch(err){
        console.log(err)
    }
}

loginForm.addEventListener('submit', logingIn)