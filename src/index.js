import * as React from "react";

// CSS & SCSS
import "./assets/fonts/inter.css";
import "./assets/fonts/material.css";
import "./assets/fonts/icofont/icofont.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/styles.scss";

// JS & COMPONENTS
import "./i18n";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/Themes"; 
import { SidebarProvider } from "./context/Sidebar"; 
import { LoaderProvider } from "./context/Preloader";
import { TranslatorProvider } from "./context/Translator"; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/auth";
import { ErrorPage } from "./pages/others";
import { AdminsListPage, CustomerAccountPage, CustomersListPage, MyAccountPage, SimsListPage} from "./pages/main";


import { ToastContainer } from 'react-toastify';
import AgentsListPage from "./pages/main/AgentsListPage";
import AdminCreatePage from "./pages/main/AdminCreatePage";
import AgentCreatePage from "./pages/main/AgentCreatePage";
import UserAccountPage from "./pages/main/UserAccountPage";

const router = createBrowserRouter([
    // MAIN PAGES

    { path: "/login", element: <LoginPage /> },
    { path: "/", element: <LoginPage /> },

    { path: "/admin-list", element: <AdminsListPage /> },
    { path: "/admin-create", element: <AdminCreatePage /> },

    { path: "/agent-list", element: <AgentsListPage /> },
    { path: "/agent-create", element: <AgentCreatePage /> },
    
    { path: "/customer-list", element: <CustomersListPage /> },
    { path: "/customer-account/:id?", element: <CustomerAccountPage /> },

    
    { path: "/sim-list", element: <SimsListPage /> },

    
    { path: "/my-account", element: <MyAccountPage /> },
    { path: "/user-account/:id?", element: <UserAccountPage /> },

                             
    { path: "/error", element: <ErrorPage /> },  
]);


createRoot(document.getElementById("root")).render(
    <ThemeProvider>
        <LoaderProvider>
            <TranslatorProvider>
                <SidebarProvider>
                    <ToastContainer />
                    <RouterProvider router={router} />
                </SidebarProvider>
            </TranslatorProvider>
        </LoaderProvider>
    </ThemeProvider>
);