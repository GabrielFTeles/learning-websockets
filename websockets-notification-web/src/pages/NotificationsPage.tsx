import { Notifications } from "@/components/Notifications";

export function NotificationsPage() {
    return (
        <div>
            <main className="min-h-[100dvh] grid place-items-center">
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <input type="text" className="bg-white text-black" />
                    </div>

                    <div className="min-w-[300px] grid place-items-center">
                        <Notifications />
                    </div>
                </div>
            </main>
        </div>
    );
}
