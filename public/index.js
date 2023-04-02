let button = document.getElementById('button');
let submit = document.getElementById('submit');

submit.addEventListener('click', submitHandler);

button.addEventListener('click', buttonClickHandler);

function buttonClickHandler(event) {
    event.preventDefault();

    fetch('/api/users')
    .then(response => response.json())
    .then((data) => console.log(data));
    
  

};

function submitHandler(event) {
    event.preventDefault();

    let nameForm = document.getElementById('nameForm').value;
    let emailForm = document.getElementById('emailForm').value;

    console.log(nameForm);
    console.log(emailForm);

    fetch('/api/users', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // set request headers
          },
    
        body: JSON.stringify({username: nameForm, email: emailForm}) 
    }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => {
            console.log(error);
        });
        


};

