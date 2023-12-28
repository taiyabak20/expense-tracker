const loginForm = document.querySelector('#login');
const url = 'http://localhost:3000/signup/user';

logingIn = async (e) =>{
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const inputs = {
        email: email ,
        password: password
    };
console.log(inputs)
    try {
        const res = await axios.post(url, inputs);
        if (res.status == 200){
            console.log('login success')
        }
        else{
            console.log('User doesnt exist')
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};
loginForm.addEventListener('submit', logingIn)