// AdminLayout.jsx

import { Outlet } from "react-router-dom";
import { AdminNavbar } from "./AdminNavbar";

export const AdminLayout = () => {
    return (
        <>
            <AdminNavbar />

            <div>
                <Outlet />
            </div>
        </>
    );
};