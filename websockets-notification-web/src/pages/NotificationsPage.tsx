import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    notificationSchema,
    type NotificationInput,
} from "@/schemas/notification-schema";

import axios from "axios";

import { Notifications } from "@/components/Notifications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link2, Loader2, MoveRight } from "lucide-react";
import { toast } from "sonner";

export function NotificationsPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<NotificationInput>({
        resolver: zodResolver(notificationSchema),
    });

    const onSubmit = async (data: NotificationInput) => {
        try {
            axios.post("http://localhost:3333/notifications", {
                ...data,
            });

            toast.success(
                "Message delivered! Check other tabs to see the live update."
            );

            reset();
        } catch (error) {
            console.error(error);
            toast.error("Error sending notification.");
        }
    };

    return (
        <main className="min-h-[100dvh] grid place-items-center p-4">
            <div className="flex flex-col items-center gap-14">
                <div className="max-w-[650px] space-y-2 text-center">
                    <h1 className="font-bold text-4xl">
                        Real-Time Notifications with{" "}
                        <span className="text-lime-400">WebSockets</span>
                    </h1>
                    <p className="text-muted-foreground">
                        This is a learning project focused on real-time
                        communication using WebSockets. It demonstrates how to
                        send and receive live notifications instantly,
                        simulating scenarios like. Built with simplicity in mind
                        for educational purposes.
                    </p>
                </div>

                <Button asChild className="bg-lime-400 hover:bg-lime-500">
                    <a href="/" target="_blank">
                        Open a new Tab
                        <Link2 />
                    </a>
                </Button>

                <div className="flex items-center gap-10">
                    <div className="w-[350px]">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-3 p-4 border rounded bg-input/20"
                        >
                            <Label htmlFor="author.name">
                                Name <span className="text-lime-400">*</span>
                            </Label>
                            <Input
                                id="author.name"
                                {...register("author.name")}
                            />
                            {errors.author?.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.author.name.message}
                                </p>
                            )}

                            <Label htmlFor="author.avatar_url">
                                Avatar URL
                            </Label>
                            <Input
                                id="author.avatar_url"
                                {...register("author.avatar_url")}
                            />
                            {errors.author?.avatar_url && (
                                <p className="text-red-500 text-sm">
                                    {errors.author.avatar_url.message}
                                </p>
                            )}

                            <Label htmlFor="message">
                                Message <span className="text-lime-400">*</span>
                            </Label>
                            <Textarea id="message" {...register("message")} />
                            {errors.message && (
                                <p className="text-red-500 text-sm">
                                    {errors.message.message}
                                </p>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-lime-400 hover:bg-lime-500"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        Send Notification
                                        <MoveRight />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>

                    <div className="min-w-[300px] grid place-items-center">
                        <Notifications />
                    </div>
                </div>
            </div>
        </main>
    );
}
