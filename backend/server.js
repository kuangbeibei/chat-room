require("dotenv").config();
const express = require("express");
const socket = require("socket.io");
const jwt = require("jsonwebtoken");
const { authenticateToken, defaultDoors, conversations } = require("./utils");

const app = express();

const httpServer = require("http").createServer(app);

const io = new socket.Server(httpServer, {
	cors: {
		origin: "http://localhost:7878",
	},
});

io.use((socket, next) => {
	const token = socket.handshake.auth.token;
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return socket.disconnect();
		console.log("服务端io拿到token", token);
		next();
	});
});

io.on("connection", (socket) => {
	let currentRoom;
    let currentRoomConversations = [];
	let rooms = [];
	let username;

	console.log("连接上了");

	socket.on("getAllDoors", (_username) => {
		// 拿到该用户rooms和default rooms合并
		socket.emit("alldoors", defaultDoors);
		username = _username;
	});

	socket.on("join", (activeRoom) => {
		// const idx = rooms.indexOf(room);
		// if (idx === -1) {
		//     rooms.push(room)
		//     socket.emit('joined', room)
		// }

		currentRoom = activeRoom;
        currentRoomConversations = conversations[currentRoom];
		rooms.push(activeRoom);
		socket.join(activeRoom); // 一定要记住调用这个方法
		console.log("activeRoom", activeRoom);

		socket.emit("roomInfo", {
			currentRoom,
			conversations: currentRoomConversations
		});
	});

	socket.on("message", (data) => {
		console.log("拿到用户输入的内容,", data);
		const newMsg = {
			date: new Date(),
			content: data,
			username,
		};
		console.log("服务端收到客户端" + socket.id + "message，并返回", newMsg);

		currentRoomConversations.push(newMsg);
		io.in(currentRoom).emit("message", newMsg);
	});
});

app.use(express.json());

app.post("/user", (req, res, next) => {
	const { username } = req.body;
	const user = {
		username,
	};
	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
	res.json({
		code: 200,
		messsage: "success",
		sign: accessToken,
	});
});

app.get("/user", authenticateToken, (req, res, next) => {
	res.json({
		code: 200,
		message: "success",
		user: req.user,
	});
});

const PORT = 5000;

httpServer.listen(PORT, () => {
	console.log(`服务在${PORT}端口启动`);
});
