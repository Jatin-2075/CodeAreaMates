import { Outlet, useNavigate } from "react-router-dom";
import "../Css/Navbar.css";
import Sidebar from "./Navbar";
import { useEffect } from "react";

const MainLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const access = localStorage.getItem("access");
        if (!access) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Outlet />
            </main>

            <style>{`
              .app-layout { display: flex; min-height: 100vh; background-color: #0f0c29; }
              .main-content { flex-grow: 1; margin-left: 280px; padding: 2rem; color: white; }
              @media (max-width: 968px) {
                .main-content { margin-left: 0; padding-top: 5rem; }
              }
            `}</style>
        </div>
    );
};

export default MainLayout;