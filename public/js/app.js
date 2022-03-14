console.log("This is from public/js/ folder");

const formData = document.querySelector('form') 

formData.addEventListener('submit',(event)=>{
     event.preventDefault()
     const searchVal = document.querySelector('input').value
     const messagePc= document.querySelector('#message')
     const messagePc1= document.querySelector('#message2')
     messagePc.textContent = 'Loading.....'
     messagePc1.textContent =''
     console.log(searchVal)
     const url ='http://api.weatherstack.com/current?access_key=97f6c4bbd97e15cbb020706a9f1815c7&query='+searchVal;
     fetch(url).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            if(data.error){
                messagePc.textContent = error
            }else{
                messagePc.textContent = 'City: ' + data.request.query;
                messagePc1.textContent = 'It is currently '+data.current.temperature + ' degree out. There is '+data.current.precip + '% chance of Rain.';
                
            }
        })
    })
})