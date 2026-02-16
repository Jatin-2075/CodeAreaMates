import { useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/settings.css"

export default function Settings() {
    const [emailNotif, setEmailNotif] = useState(
        localStorage.getItem("emailNotif") === "true"
    );

    const toggleEmail = () => {
        const newValue = !emailNotif;
        setEmailNotif(newValue);
        localStorage.setItem("emailNotif", String(newValue));
    };

    return (
        <div className="settings-page">
            <h2>Settings</h2>

            <div className="settings-card">

                <div className="setting-row">
                    <span>Email Notifications</span>
                    <button className={`toggle ${emailNotif ? "on" : ""}`} onClick={toggleEmail}>
                        {emailNotif ? "ON" : "OFF"}
                    </button>
                </div>

                <Link to="/edit-profile" className="setting-link">
                    Edit Profile
                </Link>

                <Link to="/privacy-policy" className="setting-link">
                    Privacy Policy
                </Link>

            </div>
        </div>
    );
}
