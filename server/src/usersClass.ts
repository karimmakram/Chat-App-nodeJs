
export class users{

    static users:Array<{username:string,id:string,room:string}> =[]
    public static addUser(id:string,username:string,room:string){
        // clean data
        username = username.trim().toLowerCase()
        room = room.trim().toLowerCase()

        // validation 
        if(!username || !room){
            return {error:'username and room required'}
        }
        const exituser = this.users.find((user)=>{
            return user.room === room && user.username === username
        })
        if(exituser){
            return {error:'username is in use '}
        }

        // store user
        const user =this.users.push({id,username,room})
        return {id,username,room}

    }

    static removeUser (id:string){
        const index = this.users.findIndex((user)=>{
            return user.id === id
        })
        if(index === -1){
            return {error:`user can't found`}
        }
         const user =this.users.splice(index,1)[0]
         return {username:user.username,room:user.room}


    }

    static getUser(id:string){
        return this.users.find((user)=>user.id===id)
    }
    static getUserInRoom(room:string){
        return this.users.filter((user)=>user.room===room)
    }
}

