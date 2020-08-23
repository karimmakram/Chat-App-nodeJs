
export const genterateMessage:Function = (text:string,username:string)=>{
    return {
        text,
        username,
        createAt:(new Date().getHours()>12)?new Date().getHours()%12+ ":"+new Date().getMinutes() +' Pm'
         :new Date().getHours()+ ":"+new Date().getMinutes()+' Am'
    }    
}