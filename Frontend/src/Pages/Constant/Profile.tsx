import { useParams } from "react-router-dom";
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
    skills: string[];
    achievements: Achievement[];
    events: Event[];
};

const dummyUser: ProfileType = {
    name: "Jatin",
    age: 20,
    branch: "Polymer Science",
    year: 3,
    email: "jatin@email.com",
    rating: 4.6,
    skills: ["React", "TypeScript", "C++"],
    achievements: [
        {
            type: "Hackathon",
            title: "Winner",
            description: "Won 1st place in TechFest",
            date: "2025-09-10",
        },
        {
            type: "Hackathon",
            title: "Winner",
            description: "Won 1st place in TechFest",
            date: "2025-09-10",
        },
    ],
    events: [
        {
            name: "TechFest",
            date: "2025-10-12",
            role: "Participant",
        },
        {
            name: "TechFest",
            date: "2025-10-12",
            role: "Participant",
        },
    ],
};

export const Profile = () => {
    const { username } = useParams<{ username: string }>();

    const user = dummyUser;
    console.log(username)

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
                <h3 className="section-title">Skills</h3>
                <div className="skills-list">
                    {user.skills.map((skill, index) => (
                        <span key={index} className="skill-badge">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="profile-section">
                <h3 className="section-title">Achievements</h3>
                {user.achievements.map((ach, index) => (
                    <div key={index} className="achievement-card">
                        <h4>{ach.title}</h4>
                        <p>{ach.description}</p>
                        <small>{ach.date}</small>
                    </div>
                ))}
            </div>

            <div className="profile-section">
                <h3 className="section-title">Events</h3>
                {user.events.map((event, index) => (
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
