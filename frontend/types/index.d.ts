import { Dispatch, SetStateAction } from "react"
export interface IRooms {
    id: string
    name: string
}

export interface IConversations {
    username: string
    content: string,
    date?: Date
}

export interface RoomContext {
    activeRoom: number,
    setActiveRoom: Dispatch<SetStateAction<number>>
}