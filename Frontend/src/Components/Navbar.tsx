import { useNavigate, useLocation } from "react-router-dom";
import {
    Compass, UserPlus, UserCircle, Sliders, ClipboardClock, LogOut
} from 'lucide-react';
import "../Css/Navbar.css"
import { useLogout } from "../Config/Auth";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();

    const menuItems = [
        { icon: <Compass size={24} />, label: 'Explore', path: '/explore' },
        { icon: <UserPlus size={24} />, label: 'Mates', path: '/mates' },
        { icon: <ClipboardClock size={24}/>, label: 'Past Events', path: '/past-events'},
        { icon: <UserCircle size={24} />, label: 'Profile', path: '/profile' },
        { icon: <Sliders size={24} />, label: 'Settings', path: '/settings' },
    ];

    const handleNav = (path: string) => {
        navigate(path);
    };

    return (
        <aside className="island-dock">

            <nav className="island-nav">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.label}
                            className={`island-item ${isActive ? 'active' : ''}`}
                            onClick={() => handleNav(item.path)}
                            aria-label={item.label}>
                            <span className="icon-wrapper">{item.icon}</span>

                            <span className="island-tooltip">{item.label}</span>

                            {isActive && <span className="active-dot" />}
                        </button>
                    );
                })}
            </nav>

            <div className="island-bottom">
                <button className="island-item logout" aria-label="Logout" onClick={logout}>
                    <span className="icon-wrapper"><LogOut size={22} /></span>
                    <span className="island-tooltip">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;