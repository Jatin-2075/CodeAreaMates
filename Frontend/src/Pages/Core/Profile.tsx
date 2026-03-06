import { useEffect, useState } from "react";
import { API } from "../../Config/api";
import "../../Css/profile.css";

type ProfileType = {
    id: number;
    name: string;
    age: number;
    branch: string;
    year: number;
    bio: string;
};

export const Profile = () => {
    const [user, setUser] = useState<ProfileType | null>(null);
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API("GET", "/auth/profile/");

                if (res.success) {
                    setUser(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchProfile();
    }, []);

    if (!user) return <div className="profile-container">Loading profile...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-image">
                    <img
                        src="https://via.placeholder.com/120"
                        alt="profile"
                        className="profile-img"
                    />
                </div>

                <div className="profile-info">
                    <h2 className="profile-name">{user.name}</h2>
                    <p className="profile-branch">
                        {user.branch} | Year {user.year}
                    </p>
                    <p className="profile-email">{username}</p>
                    <div className="profile-rating">
                        🎓 Age: {user.age}
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h3 className="section-title">About</h3>
                <p className="profile-bio">{user.bio}</p>
            </div>
        </div>
    );
};