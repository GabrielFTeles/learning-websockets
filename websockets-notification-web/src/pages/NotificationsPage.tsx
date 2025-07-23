import { Notifications } from "@/components/Notifications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link2, MoveRight } from "lucide-react";

export function NotificationsPage() {
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
                    <div className="min-w-[350px]">
                        <form className="space-y-3 p-4 border rounded bg-input/20">
                            <Label htmlFor="name">
                                Name
                                <span className="text-lime-400">*</span>
                            </Label>
                            <Input id="name" />
                            <Label htmlFor="avatar_url">Avatar URL</Label>
                            <Input id="avatar_url" />
                            <Label htmlFor="message">
                                Message <span className="text-lime-400">*</span>
                            </Label>
                            <Textarea id="message" />
                            <Button className="w-full bg-lime-400 hover:bg-lime-500">
                                Send Notification
                                <MoveRight />
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
