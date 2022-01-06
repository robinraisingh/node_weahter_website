

const submit=document.querySelector('button')
const addressValue=document.querySelector('input')
const message1=document.querySelector('#m1')
const message2=document.querySelector('#m2')

//message1.textContent='helllo'
submit.addEventListener('click',(e)=>{
    e.preventDefault()

    const location=addressValue.value
    
fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            //console.log(data.error);
            message1.textContent=data.error;
            message2.textContent='';
        }
        else{
            //console.log(data);
            message1.textContent=location;
            message2.textContent='temp: '+data.temp+' degrees and it feels like '+data.feel+' degrees.'
        }
    })
})
})