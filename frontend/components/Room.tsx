import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { IConversations } from "../types";

const Room: FC<{ currentUser: string, client: any }> = ({ currentUser, client }) => {
	const [conversations, setConversations] = useState<IConversations[]>([]);
	const [inputVal, setInputVal] = useState<string>("");
	const [room, setRoom] = useState<string>("");

	useEffect(() => {
		client?.on("roomInfo", ({ conversations, currentRoom } = {
			conversations: [],
			currentRoom: ''
		}) => {
			setConversations(conversations);
			setRoom(currentRoom);
		});
	}, [room, client]);

	useEffect(() => {
		client?.on("message", (data: any) => {
			setConversations((oldData) => [...oldData, data]);
		});
	}, [room]);

	const handleSubmit = () => {
		console.log("客户端发送send message给服务端");
		client?.send(inputVal);
		setInputVal("");
	};

	return (
		<div className="px-2 pt-2 h-full">
			<div className="p-2 overflow-y-auto h-4/5 text-white text-xs font-thin">
				<ul className="flex flex-col gap-5">
					{conversations.map(({ username, content }, index) => {
						if (currentUser === username) {
							return (
								<li key={index} className="self-end w-3/4">
									<div className="flex flex-row-reverse align-top justify-start">
										<p> :{username}</p>
										<p>{content} </p>
									</div>
								</li>
							);
						} else {
							return (
								<li key={index} className="w-3/4 self-start">
									{
										<div className="flex align-top">
											<p>{username} : </p>
											<p> {content}</p>
										</div>
									}
								</li>
							);
						}
					})}
				</ul>
			</div>
			<div className="absolute bottom-0 left-0 w-full">
				<input
					type="text"
					className="w-full h-12 pl-4 py-2 pr-20 box-border appearance-none text-white outline-none rounded-sm bg-transparent border-t-2 border-gray400 focus-within:bg-contentBgColor"
					placeholder="Typing your message here..."
					value={inputVal}
					onChange={(e) => setInputVal(e.target.value)}
					onKeyUp={(e) => {
						if (e.keyCode === 13 && inputVal.length) {
							handleSubmit();
						}
					}}
				/>
				<button
					className={`absolute right-2 top-2 box-border py-1 px-2 transition duration-100 ease-linear text-roomBgColor ${
						inputVal.length && "text-gray400"
					}`}
					onClick={handleSubmit}
					disabled={!inputVal.length}
				>
					submit
				</button>
			</div>
		</div>
	);
};

export default connect(
	(state: any) => ({ client: state.client })
)(Room);;
