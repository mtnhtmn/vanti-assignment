export const validateTitle = (title:string):boolean=>{
    return /^[a-zA-Z0-9]*$/.test(title)
}