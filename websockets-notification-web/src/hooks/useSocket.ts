import { socket } from "@/lib/socket";
import { useEffect } from "react";

export function useSocket<T>(event: string, callback: (data: T) => void) {
    useEffect(() => {
        socket.on(event, callback);

        return () => {
            socket.off(event, callback);
        };
    }, [event, callback]);
}
