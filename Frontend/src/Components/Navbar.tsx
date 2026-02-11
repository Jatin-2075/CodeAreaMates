import { useNavigate, useLocation } from "react-router-dom";
import {
    Search, Users, User, Settings,
    LogOut
} from 'lucide-react';
import "../Css/Navbar.css"

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: <Search size={24} />, label: 'Explore', path: '/explore' },
        { icon: <Users size={24} />, label: 'Network', path: '/network' },
        { icon: <User size={24} />, label: 'Profile', path: '/profile' },
        { icon: <Settings size={24} />, label: 'Settings', path: '/settings' },
    ];

    const handleNav = (path:string) => {
        navigate(path);
    };

    return (
        <aside className="island-dock">
            {/* Top Logo / Brand
            <div className="island-logo">
                
            </div> */}

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
                <button className="island-item logout" aria-label="Logout">
                    <span className="icon-wrapper"><LogOut size={22} /></span>
                    <span className="island-tooltip">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;