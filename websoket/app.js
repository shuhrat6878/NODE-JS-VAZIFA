import {WebSocketServer} from 'ws'
const wss=new WebSocketServer({port:3000});

wss.on('connection',function connection(ws){
    console.log('New user Connected')
    ws.on('message',function incomming(message){
        console.log('Message:',message.toString())
        wss.clients.forEach(clent=>{
            if(clent.readyState===WebSocket.OPEN)
            {
                clent.send(message.toString())
            }
        })
    })
    ws.send('Welcom to the chat')
})
console.log('server running')
