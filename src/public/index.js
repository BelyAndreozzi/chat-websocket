console.log('Js funciona');

const socketClient = io()

const chatContainer = document.getElementById('chatContainer')

socketClient.on('messagesChat', (data)=>{
    console.log(data);
    let messages=''
    data.forEach(element => {
        messages += `<p>Autor: ${element.author} - message: ${element.text}</p>`
    });
    chatContainer.innerHTML = messages
})

let user = ''
Swal.fire({
    title:'Bienvenido',
    text: 'Ingresa tu nombre de usuario',
    input: 'text',
    allowOutsideClick: false
}).then(response=>{
    console.log(response);
    user = response.value
    document.getElementById('username').innerHTML = `¡Bienvenide ${user}!`
})

const chatForm = document.getElementById('chatForm')

chatForm.addEventListener("submit",(event)=>{
    //prevenir que se recarge la pagina cuando se envia el formulario
    event.preventDefault();
    console.log("formulario enviado")
    const message = {
        author:user,
        text:document.getElementById("messageChat").value
    }
    //envia nuevo mensaje
    socketClient.emit("newMsg", message)
})
