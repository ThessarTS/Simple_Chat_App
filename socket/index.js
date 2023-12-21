const { Server } = require("socket.io");

const io = new Server({
    cors: "http://127.0.0.1:5173",
});

let onlineUsers = [];

io.on("connection", (socket) => {

    // listen to connection
    socket.on("addNewUser", (username) => {
        !onlineUsers.some((user) => user.username === username) &&
            onlineUsers.push({
                username,
                socketId: socket.id,
            });

        console.log("Connected Users:", onlineUsers);

        // send active users
        io.emit("getUsers", onlineUsers);
    });

    // add message
    socket.on("sendMessage", (message) => {
        console.log(message);
        const user = onlineUsers.find(
            (user) => user.username === message.receiver
        );

        if (user) {
            io.to(user.socketId).emit("getMessage", message);
            io.to(user.socketId).emit("getNotification", {
                sender: message.sender,
                isRead: false,
                date: new Date(),
            });
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
        console.log("User Disconnected:", onlineUsers);


        io.emit("getUsers", onlineUsers);
    });
});

io.listen(4000);
