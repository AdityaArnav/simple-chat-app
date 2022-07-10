const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors:{
        origin:'*'
    }
})

const PORT = process.env.PORT || 5000;

io.on('connection', socket =>{
    console.log('Connection made successfully')
    socket.on('message', payload=>{
        console.log('Message recieved on server',payload)
        io.emit('message',payload)
    })
})

server.listen(PORT,()=>{
    console.log(`server is listening to port ${PORT}`);
})