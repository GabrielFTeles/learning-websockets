import { Server, Socket } from "socket.io";

let io: Server;

export function setupSocket(server: Server) {
    io = server;

    server.on("connection", (socket: Socket) => {
        console.log(`Usuário conectado: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Usuário desconectado: ${socket.id}`);
        });
    });
}

export function emitNotification<T>(data: T) {
    io.emit("new_notification", data);
}
