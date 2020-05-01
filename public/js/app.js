console.log('Client side javascript message is printed.');



//Select element form the page.
const weatherform = document.querySelector('form');//Select the complete form element to know when it is sumbmitted with the button.
const search = document.querySelector('input');//Select the text input box to get the value that was typed in the text box.

//use the Event to do what we want to do with the selected elements and the data that they provide
weatherform.addEventListener('submit', (e)=>{
    //Prevent the browser from refreshing completely when the form is submitted.
    e.preventDefault();
    
    if(search.value){
        document.querySelector('#error').textContent = 'Loading . . . '
        fetch('/weather?address='+ search.value).then((response)=>{
            response.json().then((data)=>{
            if(data.error){
                document.querySelector('#error').textContent = data.error;
            }
            else{
                document.querySelector('#error').textContent = ''
                document.querySelector('#printTemperature').textContent = data.temperatureNow;
                document.querySelector('#printLocation').textContent = data.address;
            }
        });
    });      
    }else{
        document.querySelector('#error').textContent ='Please enter a Location in the text Box' ;
    }
});
