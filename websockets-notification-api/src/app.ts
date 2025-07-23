import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { emitNotification, setupSocket } from "./socket/socket";
import { env } from "./config/env";
import type { Notification } from "./types/notification";

export const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

setupSocket(io);

httpServer.listen(env.PORT, () => {
    console.log(`WebSocket server running in http://localhost:${env.PORT}`);
});

app.post("/test", (req, res) => {
    console.log(req.body);

    emitNotification<Notification>({
        id: "aaa",
        author: {
            name: "shadcn",
            avatar_url: "https://github.com/shadcn.png",
        },
        message: req.body.message,
        created_at: new Date().toString(),
        read: false,
    });

    res.send("worked!");
});
