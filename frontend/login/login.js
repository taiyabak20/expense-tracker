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
            console.log(res.data)
            localStorage.setItem('token' ,res.data)
            window.location= '../index/index.html';
            document.querySelector('.notFound').textContent ='login success'
        }
       
    } catch (error) {        
        console.error('Error:', error.message);
        if(error.response.status == 401){
            document.querySelector('.notFound').textContent = 'Incorrect password!'
        }
        else{
            document.querySelector('.notFound').textContent = 'User doesnt exist!';
        }
    }
};
loginForm.addEventListener('submit', logingIn)