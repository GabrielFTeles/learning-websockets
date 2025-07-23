import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { useMemo, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";

type Notification = {
    id: string;
    author: {
        name: string;
        avatar_url?: string;
    };
    message: string;
    created_at: string;
    read: boolean;
};

interface NotificationItemProps extends Notification {
    onMarkAsRead: (id: string) => void;
}

const NotificationItem = ({ data }: { data: NotificationItemProps }) => {
    return (
        <li
            onClick={() => {
                data.onMarkAsRead(data.id);
            }}
            className="w-full flex gap-3 hover:bg-accent transition-colors p-3 rounded"
        >
            <div className="relative">
                <Avatar>
                    <AvatarFallback>
                        {data.author.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                    <AvatarImage src={data.author.avatar_url} />
                </Avatar>
            </div>

            <div className="space-y-2">
                <div className="flex text-xs gap-1.5 items-center">
                    <h3 className="font-medium text-lime-400">
                        {data.author.name}
                    </h3>
                    <span className="text-muted-foreground">•</span>
                    <p className="text-muted-foreground">
                        {formatDistanceToNow(data.created_at, {
                            addSuffix: true,
                        })}
                    </p>
                    {!data.read && (
                        <span className="text-[9px] py-0.5 px-1 bg-lime-300/20 rounded">
                            Unread
                        </span>
                    )}
                </div>
                <p className="text-sm">{data.message}</p>
            </div>
        </li>
    );
};

export function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "uuid",
            author: {
                name: "Gabriel Teles",
                avatar_url: "https://github.com/GabrielFTeles.png",
            },
            message: "Try adding a new notification!",
            created_at: new Date().toString(),
            read: false,
        },
    ]);

    useSocket<Notification>("new_notification", (newNotification) => {
        setNotifications((prev) => [newNotification, ...prev]);
    });

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const hasUnread = useMemo(
        () => notifications.some((notification) => !notification.read),
        [notifications]
    );

    return (
        <Popover defaultOpen>
            <PopoverTrigger asChild>
                <Button variant="outline" className="h-12 w-12 relative">
                    <Bell className="size-5" />
                    {hasUnread && (
                        <div className="rounded-full size-3 p-1 bg-zinc-900 right-[13px] top-2.5 absolute grid place-items-center">
                            <div className="size-2 animate-pulse bg-lime-400 rounded-full absolute" />
                        </div>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-[350px]">
                <ul className="flex flex-col items-center">
                    {notifications.map((notification, index) => (
                        <NotificationItem
                            key={index}
                            data={{ ...notification, onMarkAsRead: markAsRead }}
                        />
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    );
}
