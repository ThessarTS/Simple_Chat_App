import { SUCCESS_FETCH_USERS, SUCCESS_LOGIN_USER, SUCCESS_FETCH_USER_CHATS, SUCCESS_FETCH_MESSAGES, UPDATE_CURRENT_CHAT, UPDATE_NOTIF } from "./actionType"
import axios from 'axios'


const baseUrl = 'http://localhost:3000'

export const successFetchUsers = (payload) => {
    return { type: SUCCESS_FETCH_USERS, payload }
}

export const successFetchUsersChats = (payload) => {
    return { type: SUCCESS_FETCH_USER_CHATS, payload }
}

export const successLoginUsers = (payload) => {
    return { type: SUCCESS_LOGIN_USER, payload }
}

export const updateCurrentChat = (payload) => {
    return { type: UPDATE_CURRENT_CHAT, payload }
}

export const successfetchMessages = (payload) => {
    return { type: SUCCESS_FETCH_MESSAGES, payload }
}

export const updateNotif = (payload) => {
    return { type: UPDATE_NOTIF, payload }
}

export const registerUser = (input) => async (dispatch) => {
    try {
        let { data } = await axios.post(baseUrl + '/register', input);
        dispatch(successLoginUsers(data.username))
        return data
    } catch (error) {
        throw error
    }
}

export const loginUser = (input) => async () => {
    try {
        let { data } = await axios.post(baseUrl + '/login', input);
        return data
    } catch (error) {
        throw error
    }
}

export const findUser = () => async () => {
    try {
        let { data } = await axios.get(baseUrl + '/user', {
            headers: { access_token: localStorage.access_token }
        });
        return data
    } catch (error) {
        throw error
    }
}

export const fetchUsers = () => async (dispatch) => {
    try {
        let { data } = await axios.get(baseUrl + '/users', {
            headers: { access_token: localStorage.access_token }
        });
        return data
    } catch (error) {
        throw error
    }
}

export const fetchUserChats = () => async (dispatch) => {
    try {
        let { data } = await axios.get(baseUrl + '/chats', {
            headers: { access_token: localStorage.access_token }
        });
        dispatch(successFetchUsersChats(data))
    } catch (error) {
        throw error
    }
}

export const findOrCreateChat = (input) => async (dispatch) => {
    try {
        let { data } = await axios.post(baseUrl + '/chats', input, {
            headers: { access_token: localStorage.access_token }
        });
        dispatch(fetchUserChats())
    } catch (error) {
        throw error
    }
}

export const fetchMessages = (input) => async (dispatch) => {
    try {
        let { data } = await axios.get(baseUrl + `/messages/${input}`, {
            headers: { access_token: localStorage.access_token }
        });

        dispatch(successfetchMessages(data))
        return data

    } catch (error) {
        throw error
    }
}

export const createMessage = (input) => async (dispatch) => {
    try {
        let { data } = await axios.post(baseUrl + `/messages`, input, {
            headers: { access_token: localStorage.access_token }
        });

        return data

    } catch (error) {
        throw error
    }
}