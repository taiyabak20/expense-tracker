const Url = 'http://localhost:3000/called/password/forgotpassword';
document.querySelector('.forgotPass').addEventListener('submit', forgotPass)

async function forgotPass(e){
    e.preventDefault()
    let email = e.target.forgotEmail.value;
    //console.log(email)
    const res = await axios.post(Url, {email: e.target.forgotEmail.value})
    //console.log(res)
    email = ""
}