import socketIo from "socket.io"
import {genterateMessage} from "./messages"
import {users} from "./usersClass"

export const startSocket = (io:socketIo.Server)=>{io.on('connection',(socket :socketIo.Socket)=>{
    console.log('socket io Connection');
    socket.emit('message',genterateMessage("Welcome",'Admin'))
    // socket.broadcast.emit('message',genterateMessage('new user has join to room'))

    socket.on('join',({room,username},cb)=>{
        const option = users.addUser(socket.id,username,room)
        if(option.error){
            return cb(option.error)
        }
        if(option.room){
        socket.join(option.room)
        socket.broadcast.to(option.room).emit('message',genterateMessage(`${option.username} has join to room`,option.username))
        io.to(option.room).emit('roomData',{
            room:option.room,
            users:users.getUserInRoom(option.room)
        })
        
        cb()
        }
    })

    socket.on('sendMessage',(message,callBack)=>{
        const user = users.getUser(socket.id)
        if(user){
            io.to(user.room).emit('message',genterateMessage(String(message),user.username))
            callBack()
        }
        
    })
    socket.on('SendLocation',({longitude,latitude},callBack)=>{
        const user = users.getUser(socket.id)
        if(user){
        io.to(user.room).emit('locationMessage',genterateMessage(`https://google.com/maps?q=${latitude},${longitude}`,user.username))
        callBack()
        }
    })
    socket.on('disconnect',()=>{
        const user =users.removeUser(socket.id)
        const {username,error,room} = user
        if(username && room){
            io.to(room).emit('message',genterateMessage(`${user.username} leave room`,user.username))
            io.to(room).emit('roomData',{
                room:room,
                users:users.getUserInRoom(room)
            })
        }
    })
})
}