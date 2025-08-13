
import axios from "axios"
import { axiosErrorHandler } from "../utils/axiosErrorHandler"
import { getToken } from "../utils"
// let baseURL = "http://localhost:5007"
let baseURL = "http://16.16.9.239:5007"


export const getAllRoles = async () => {
    let users = await axios.get(baseURL + "/user/getRoles")
    console.log("users", users)
    return users
}
export const loginUser = async (data) => {
    try {

        let loginResponse = await axios.post(baseURL + "/user/login", data).catch(axiosErrorHandler)
        return loginResponse
    } catch (err) {
        console.log("err", err)
    }
}
export const createUser = async (data) => {
    try {
        let loginResponse = await axios.post(baseURL + "/user/addUser", data).catch(axiosErrorHandler)
        return loginResponse
    } catch (err) {
        console.log("err", err)
    }
}

export const getAllUsers = async (query, data) => {
    try {
        let loginResponse = await axios({
            method: "post",
            url: baseURL + "/user/getUsers" + query,
            headers: { Authorization: `Bearer ${getToken()}` },
            data
        }).catch(axiosErrorHandler)
        return loginResponse
    } catch (err) {
        console.log("err", err)
    }
}

export const createClient = async (data) => {
    try {
        let loginResponse = await axios.post(baseURL + "/user/addClient", data).catch(axiosErrorHandler)
        return loginResponse
    } catch (err) {
        console.log("err", err)
    }
}

export const getClient = async (data) => {
    try {
        let loginResponse = await axios.post(baseURL + "/user/getClient", data).catch(axiosErrorHandler)
        return loginResponse
    } catch (err) {
        console.log("err", err)
    }
}

export const markAttendance = async (data) => {
    try {
        let markAttendance = await axios({
            method: "post",
            url: baseURL + "/user/markAttendence",
            headers: { Authorization: `Bearer ${getToken()}` },
            data
        }).catch(axiosErrorHandler)
        return markAttendance
    } catch (err) {
        console.log("err", err)
    }
}
export const getAttendenceData = async (data) => {
    try {
        let markAttendance = await axios({
            method: "post",
            url: baseURL + "/user/getAttendenceData",
            headers: { Authorization: `Bearer ${getToken()}` },
            data
        }).catch(axiosErrorHandler)
        return markAttendance
    } catch (err) {
        console.log("err", err)
    }
}

