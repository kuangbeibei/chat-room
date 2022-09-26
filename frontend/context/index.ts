// import { createContext, useContext } from "react";

// import { RoomContext } from "../types";

// const RoomContext = createContext<RoomContext>({
//     activeRoom: 0,
//     setActiveRoom: () => {}
// });

// export const useRoomContext = () => useContext(RoomContext);

// export default RoomContext;

export { default as SocketContext, useSocketContext } from "./socketContext"