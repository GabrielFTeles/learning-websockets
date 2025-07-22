import { NotificationsPage } from "@/pages/NotificationsPage";
import { Routes, Route } from "react-router-dom";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/app/notifications" element={<NotificationsPage />} />
        </Routes>
    );
}
