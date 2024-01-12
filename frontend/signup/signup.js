const btn = document.querySelector('#signup')
const url = `http://3.88.58.3:3000/signup/addUser`

addingUser = async (e) => {
    e.preventDefault();

    const obj = {
        name: e.target.nameInput.value,
        email: e.target.emailInput.value,
        password: e.target.passwordInput.value
    };

    try {
        const res = await axios.post(url, obj);

        if (res.status >= 200 && res.status < 300) {
            
            e.target.nameInput.value = '';
            e.target.emailInput.value = '';
            e.target.passwordInput.value = '';
        } else {
            console.error(`Request failed with status: ${res.status}`);
        }
    } catch (error) {
        console.error('Error:', error.message);

        if (error.response && error.response.status === 400) {
            document.querySelector('.error').textContent = 'User already exists!';
        }
    }
};


btn.addEventListener('submit', addingUser)