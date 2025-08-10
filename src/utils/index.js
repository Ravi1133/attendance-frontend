export const getToken=()=>{
    return localStorage.getItem("token")
}

export const localUserData=()=>{
    return JSON.parse(localStorage.getItem("userData"))
}