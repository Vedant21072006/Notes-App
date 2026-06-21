import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/navbar"
import { List } from "./components/list"
import { CreateNote } from "./components/addnotes"
import { UpdateNote } from "./components/updatenotes"
import { Login } from "./components/login"
import { Signup } from "./components/signup"
import { ProtectedRoutes } from "./components/protectedroutes"
import { AdminNavbar } from "./components/admincomponents/adminnavbar"
import { AdminLayout } from "./components/admincomponents/adminlayout"
import { AdminHome } from "./components/admincomponents/adminhome"
import { AdminUsers } from "./components/admincomponents/adminusers"
import { AdminUserList } from "./components/admincomponents/adminnotes"
import { UpdateUserNote } from "./components/admincomponents/adminupdatenotes"

export const App=()=>{
  const location = useLocation();
  console.log("Host:",import.meta.env.VITE_API_URL );
  

    const isAdminRoute =
        location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdminRoute && <Navbar />}

            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/list"
                    element={
                        <ProtectedRoutes>
                            <List />
                        </ProtectedRoutes>
                    }
                />

                <Route
                    path="/addnotes"
                    element={
                        <ProtectedRoutes>
                            <CreateNote />
                        </ProtectedRoutes>
                    }
                />

                <Route
                    path="/update/:id"
                    element={
                        <ProtectedRoutes>
                            <UpdateNote />
                        </ProtectedRoutes>
                    }
                />



                

                <Route  path="/admin" element={<AdminLayout />} >
               
               {/* Admin home */}
               <Route  index  element={<AdminHome/>} />

                   <Route path="/admin/user" element={<AdminUsers/>} />
             <Route  path="/admin/user-notes/:id" element={<AdminUserList/>} />
                <Route path="/admin/edit-user-note/:id" element={<UpdateUserNote/>}   />

                </Route>

            </Routes>
        </>
    );
};