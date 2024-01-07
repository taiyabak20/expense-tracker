const Url = 'http://localhost:3000/called/password/forgotpassword';
document.querySelector('.forgotPass').addEventListener('submit', forgotPass)

async function forgotPass(e){
    e.preventDefault()
    const email = e.target.forgotEmail.value;
    const res = await axios.post(Url, null)
}