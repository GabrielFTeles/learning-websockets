import { NotificationsPage } from "./pages/NotificationsPage";
import { Toaster } from "sonner";

export function App() {
    return (
        <>
            <NotificationsPage />
            <Toaster position="bottom-center" theme="dark" richColors />
        </>
    );
}
