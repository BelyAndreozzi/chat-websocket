const express = require('express')
const {Server, Socket} = require('socket.io')
const app = express()

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`))

app.use(express.static(__dirname + "/public"))

// Configurar el sv de websocket 
const io = new Server(server)

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];


//detectar cada socket de un cliente que se conecte
io.on("connection",(socket)=>{
    console.log("nuevo cliente conectado");
    //enviar los mensajes al cliente
    socket.emit("messagesChat", messages);

    //recibimos el mensaje
    socket.on("newMsg", (data)=>{
        messages.push(data);
        //enviamos los mensajes a todos los sockets que esten conectados.
        io.sockets.emit("messagesChat", messages)
    })
});
