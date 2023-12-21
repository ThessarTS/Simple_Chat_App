import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { SUCCESS_FETCH_MESSAGES, SUCCESS_FETCH_USERS, SUCCESS_FETCH_USER_CHATS, SUCCESS_LOGIN_USER, UPDATE_CURRENT_CHAT, UPDATE_NOTIF } from './actionType'

let initialState = {
    loggedInUser: '',
    users: [],
    userChats: [],
    messages: [],
    currentChat: {},
    notifications: []
}
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SUCCESS_FETCH_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SUCCESS_LOGIN_USER:
            return {
                ...state,
                loggedInUser: action.payload
            }
        case SUCCESS_FETCH_USER_CHATS:
            return {
                ...state,
                userChats: action.payload
            }
        case UPDATE_CURRENT_CHAT:
            return {
                ...state,
                currentChat: action.payload
            }
        case SUCCESS_FETCH_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        case UPDATE_NOTIF:
            return {
                ...state,
                notifications: action.payload
            }
        default:
            return state

    }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store