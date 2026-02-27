import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../Config/api";
import "../../Css/profile.css";

type Achievement = {
    type: string;
    title: string;
    description: string;
    date: string;
};

type Event = {
    name: string;
    date: string;
    role: string;
};

type ProfileType = {
    name: string;
    age: number;
    branch: string;
    year: number;
    email: string;
    rating: number;
    bio: string;
    achievements: Achievement[];
    events: Event[];
};

export const Profile = () => {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<ProfileType | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API("GET", `/profile/${username}`);

                if (res.success) {
                    setUser(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchProfile();
    }, [username]);

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
                    <p className="profile-email">{user.email}</p>
                    <div className="profile-rating">
                        ⭐ {user.rating} / 5
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h3 className="section-title">About</h3>
                <p className="profile-bio">{user.bio}</p>
            </div>

            <div className="profile-section">
                <h3 className="section-title">Achievements</h3>
                {user.achievements?.map((ach, index) => (
                    <div key={index} className="achievement-card">
                        <h4>{ach.title}</h4>
                        <p>{ach.description}</p>
                        <small>{ach.date}</small>
                    </div>
                ))}
            </div>

            <div className="profile-section">
                <h3 className="section-title">Events</h3>
                {user.events?.map((event, index) => (
                    <div key={index} className="event-card">
                        <h4>{event.name}</h4>
                        <p>Role: {event.role}</p>
                        <small>{event.date}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};