


let list= document.querySelector('#expenses').innerHTML;
const btn = document.querySelector('.btn');

btn.addEventListener('click', e => {

  e.preventDefault();

let nameInput = document.querySelector('#name').value;
let descriptionInput= document.querySelector('#description').value;
let categoryInput = document.querySelector('#category').value;

  const storedUserDataJSON = localStorage.getItem("details");
  const details = storedUserDataJSON ? JSON.parse(storedUserDataJSON) : [];

  const objInput = {
    name: nameInput ,
    description: descriptionInput ,
    category: categoryInput
  }

details.push(objInput);

console.log(details);

  localStorage.setItem("details", JSON.stringify(details));

 
  function updateUsersList() {
    let print = '';
    details.forEach((user, index) => {
      print += `&bull; ${user.name} - ${user.description} - ${user.category}
      <button class="dlt-button">Delete</button> <button class="edit-button">Edit </button><br> `;
    });
  
    document.querySelector('#expenses').innerHTML = print;
  
    let deleteButtons = document.querySelectorAll(".dlt-button");
  
    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        deleteUser(index);
      });
    });

    let editButton = document.querySelectorAll(".edit-button")
    editButton.forEach((editButton, index)=> {
      editButton.addEventListener("click", ()=> {
        editUser(index);
      })
    })
  }
  
  updateUsersList(); 

  function deleteUser(index) {
    details.splice(index, 1);
    updateUsersList();
    localStorage.setItem("details", JSON.stringify(details)); 
  }
  
 function editUser(index) {
  const userD = details[index];
  document.querySelector('#name').value = userD.name;
  document.querySelector('#description').value = userD.description;
  document.querySelector('#category').value = userD.category;
  deleteUser(index);
}


  document.querySelector('#name').value = '';
  document.querySelector('#description').value = '';
  document.querySelector('#category').value = '';

  
});
