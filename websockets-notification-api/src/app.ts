import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { emitNotification, setupSocket } from "./socket/socket";
import { env } from "./config/env";
import type { Notification } from "./types/notification";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export const app = express();

app.use(
    cors({
        origin: env.NODE_ENV === "production" ? env.FRONT_URL : "*",
    })
);

app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: env.NODE_ENV === "production" ? env.FRONT_URL : "*",
    },
    path: "/notifications",
});

setupSocket(io);

httpServer.listen(env.PORT, () => {
    console.log(
        `WebSocket server running in ws://localhost:${env.PORT}/notifications`
    );
});

const notificationRequestSchema = z.object({
    message: z
        .string()
        .min(1, "Message cannot be empty.")
        .max(500, "Message must be at most 500 characters."),

    author: z.object({
        name: z
            .string()
            .min(1, "Author name is required.")
            .max(100, "Author name must be at most 100 characters."),

        avatar_url: z
            .url("Invalid avatar URL.")
            .max(300, "Avatar URL must be at most 300 characters.")
            .optional(),
    }),
});

app.post("/notification", (req, res) => {
    const parsed = notificationRequestSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.format });
    }

    const { message, author } = parsed.data;

    emitNotification<Notification>({
        id: randomUUID(),
        author: {
            name: author.name,
            avatar_url: author.avatar_url,
        },
        message: req.body.message,
        created_at: new Date().toString(),
        read: false,
    });

    res.status(201).send("Notification message successfully sent.");
});
