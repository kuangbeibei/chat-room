
import { io } from "socket.io-client";
import { getUser } from "../request";

export const SIGN = 'SIGN';
export const CREATE = 'CREATE';

export const userAction = {
    sign: () => {
        return async (dispatch: any) => {
            try {
                const { user } = await getUser();
                dispatch({
                    type: SIGN,
                    payload: user
                });
                return user
            } catch (e: any) {
                throw e;
            }
        }
    },
    createSocket: (accessToken: string) => {
        return async (dispatch: any) => {
            const socket = io("http://localhost:5000", {
                auth: {
                    token: accessToken,
                },
            });
            dispatch({
                type: CREATE,
                payload: socket
            });
            return socket;
        }
    }
}