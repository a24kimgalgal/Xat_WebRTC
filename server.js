const express = require("express");
const http = require("http");
const { randomUUID } = require("crypto");
const WebSocket = require("ws");
const path = require("path");

const port = 40603;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const users = new Map();

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "index.html"));
});

function send(socket, message) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
}

function sendUsers() {
    const connectedUsers = Array.from(users, ([id, user]) => ({ id, name: user.name }));

    for (const [id, user] of users) {
        send(user.socket, {
            type: "users",
            users: connectedUsers.filter((connectedUser) => connectedUser.id !== id),
        });
    }
}

wss.on("connection", (socket) => {
    const id = randomUUID();

    socket.on("message", (data) => {
        let message;
        try {
            message = JSON.parse(data.toString());
        } catch {
            send(socket, { type: "error", message: "Missatge no vàlid." });
            return;
        }

        if (message.type === "join") {
            const name = typeof message.name === "string" ? message.name.trim().slice(0, 24) : "";
            if (!name) {
                send(socket, { type: "error", message: "Escriu un nom." });
                return;
            }

            const nameIsTaken = Array.from(users.values()).some(
                (user) => user.name.toLowerCase() === name.toLowerCase(),
            );
            if (nameIsTaken) {
                send(socket, { type: "error", message: "Aquest nom ja està en ús." });
                return;
            }

            socket.name = name;
            users.set(id, { name, socket });
            send(socket, { type: "joined", id, name });
            sendUsers();
            return;
        }

        if (message.type === "signal" && socket.name) {
            const recipient = users.get(message.target);
            if (recipient) {
                send(recipient.socket, {
                    type: "signal",
                    from: id,
                    name: socket.name,
                    signal: message.signal,
                });
            }
        }
    });

    socket.on("close", () => {
        if (users.delete(id)) {
            sendUsers();
        }
    });
});

server.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
