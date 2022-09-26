import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { IRooms } from "../types";
import images from "../assets/images";

const Door: FC<{ client: any }> = ({ client }) => {
	const [activeRoom, setActiveRoom] = useState<string>("room1");
	const [doors, setDoors] = useState<IRooms[]>([]);
	const handleRoomClick = (id: string) => {
		setActiveRoom(id);
	};

	useEffect(() => {
		// console.log(
		// 	"client?.connected::::::::::::::::::::::::::::::",
		// 	client?.connected,
		// 	client
		// );
		
		// 后续还是不把client放在仓库中了，这个属性变了也没有触发更新，看来用的是同一个引用空间
		if (client) {
			console.log("客户端emit事件， join");
			client?.emit("join", activeRoom);

			client.on("alldoors", (doors: any) => {
				console.log("客户端on alldoors事件,", doors);
				setDoors(doors);
			});
		}
	}, [activeRoom, client]);

	return (
		<div className="flex flex-col gap-2 rounded-md">
			{doors &&
				doors.map((item) => {
					return (
						<div
							onClick={() => handleRoomClick(item.id)}
							key={item.id}
							className="relative flex gap-2 items-center content-center h-12 overflow-hidden py-1 box-border bg-contentBgColor rounded-sm cursor-pointer border-b-1 group"
						>
							<div
								className={`group-hover:block hidden absolute -z-10 border-b-2 w-full h-full animate-[emergeFromLeft_.3s_ease-in-out]`}
							></div>
							<img
								className="w-8 md:14 lg:28 rounded-full ml-2"
								src={images.Tiger}
								alt="roomImage"
							/>
							<div
								className={`text-xs font-mono transition duration-200 group-hover:scale-95 group-hover:text-white ${
									activeRoom === item.id ? "text-white" : "text-gray400"
								}`}
							>
								{item.name}
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default connect((state: any) => ({ client: state.client }))(Door);
