import axios from 'axios'
import {setUser} from "../reducers/userReducer";
import {REACT_APP_API} from "../config";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${REACT_APP_API}api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login =  (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${REACT_APP_API}api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)//храним токен
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${REACT_APP_API}api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            localStorage.removeItem('token')
        }
    }
}

export const uploadAvatar =  (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${REACT_APP_API}api/files/avatar`, formData,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteAvatar =  () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${REACT_APP_API}api/files/avatar`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}