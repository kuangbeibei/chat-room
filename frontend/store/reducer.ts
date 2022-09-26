import { Socket } from "socket.io";
import { CREATE, SIGN } from "./action";
export const userReducer = function (user: any = {
    username: ''
}, action: any) {
    switch (action.type) {
        case SIGN:
            return action.payload
        default:
            return user;
    }
};

export const socketReducer = function (socket: Socket | null = null, action: any) {
    switch (action.type) {
        case CREATE:
            return action.payload
        default:
            return socket
    }
}
