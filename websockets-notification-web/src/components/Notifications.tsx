import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type Notification = {
    author: {
        name: string;
        avatar_url?: string;
    };
    message: string;
    created_at: string;
};

const NotificationItem = ({ data }: { data: Notification }) => {
    return (
        <li className="w-full flex gap-3 hover:bg-accent transition-colors p-3 rounded">
            <Avatar>
                <AvatarFallback>
                    {data.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
                <AvatarImage src={data.author.avatar_url} />
            </Avatar>

            <div className="space-y-2">
                <div className="flex text-xs gap-1.5 items-center">
                    <h3 className="font-medium text-lime-400">
                        {data.author.name}
                    </h3>
                    <span className="text-muted-foreground">•</span>
                    <p className="text-muted-foreground">
                        {formatDistanceToNow(data.created_at, {
                            addSuffix: true,
                            locale: ptBR,
                        })}
                    </p>
                </div>
                <p className="text-sm">{data.message}</p>
            </div>
        </li>
    );
};

export function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            author: {
                name: "Gabriel Teles",
                avatar_url: "https://github.com/GabrielFTeles.png",
            },
            message: "Try adding a new notification!",
            created_at: "2025-04-13",
        },
    ]);

    useSocket<Notification>("new_notification", (newNotification) => {
        setNotifications((prev) => [newNotification, ...prev]);
    });

    return (
        <Popover defaultOpen>
            <PopoverTrigger asChild>
                <Button variant="outline" className="h-12 w-12">
                    <Bell className="size-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-[350px]">
                <ul className="flex flex-col items-center">
                    {notifications.map((notification, index) => (
                        <NotificationItem key={index} data={notification} />
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    );
}
