import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { Socket } from "socket.io";
import { Door, Room } from "./components";
import { IRooms } from "./types";
import { userAction } from "./store/action";

const Chat: FC<{ user: any; client: any; sign: any; createSocket: any }> = ({
	user,
	client,
	sign,
	createSocket,
}) => {
	const navigate = useNavigate();
	
	useEffect(() => {
		sign()
			.then((user: any) => {
				createSocket(localStorage.getItem("accessToken")).then(
					(client: Socket) => {
						client.on("connect", () => {
							console.log('client connect:', client.connected);
							client.emit("getAllDoors", user.username);
						});

						client.on("disconnect", () => {
							console.log("客户on disconnect事件");
						});

						client.on("connect_error", (err: any) => {
							console.log("connect_error", err.message); 
						});
					}
				);
			})
			.catch((e: any) => {
				if (e.status === 403) {
					navigate("/welcome");
				}
			});

		return () => {
			client?.off("connect");
			client?.off("disconnect");
		};
	}, []);

	return (
		<main className="w-screen px-2 pt-2 md:pt-0">
			<h2 className="lg:mt-15 lg:ml-15 lg:text-2xl md:mt-8 md:ml-10 md:text-xl sm:mt-8 sm:ml-8 sm:text-md mt-2 text-sm text-white animate-[emergeFromLeft_.8s_ease-in-out]">
				Hello {user.username} 🥳
			</h2>

			<section className="mt-5 md:w-4/5 md:mt-[30px] mx-auto flex gap-4 md:flex-row flex-col bg-roomBgColor p-4 rounded-lg drop-shadow-2xl animate-[show_.5s_ease-in-out]">
				<div className="md:h-[500px] h-[400px] min-w-min">
					<Door />
				</div>
				<div className="relative md:h-[500px] h-[400px] w-full bg-contentBgColor rounded-md flex-initial">
					<Room currentUser={user.username} />
				</div>
			</section>
		</main>
	);
};

export default connect(
	(state: any) => ({ user: state.user, client: state.client }),
	userAction
)(Chat);
