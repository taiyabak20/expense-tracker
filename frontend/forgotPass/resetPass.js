const Reseturl = 'http://localhost:3000/resetpassword'
let resetId = 
window.addEventListener('load' , async()=>{
    let url = window.location.href
    let arr = url.split("?reset=")
    resetId = arr[1]
    //console.log(resetId)
    if(resetId == null || resetId.length == 0){
        alert("wrong link")
        location.href ='forgotPass.html'
    }
     const result = await axios.get(`${Reseturl}/${resetId}`)
     console.log(result)
    if(!result.data.isActive){
        alert("link expired get a new one")
        location.href ='forgot-password.html'
    }
    
})

document.querySelector('.resetPass').addEventListener('submit' , resetPass)

async function resetPass(e){
    e.preventDefault();
    
    const newPass = e.target.newPass.value;
    const confirmedpass = e.target.confirmPass.value;
    if(newPass === confirmedpass){
        try{
            const res = await axios.post(`${Reseturl}/${resetId}`, {newPass})
            console.log(res)
            if(res.status == 200){
                window.location = '/frontend/login/login.html'
            }
        }
        catch(err){
            console.log(err)
        }
    }
    else {
        document.querySelector('.checkPass').textContent = "Passwords do not match"
    }
   // console.log(newPass, confirmedpass)
}