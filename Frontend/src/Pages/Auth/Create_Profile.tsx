import { useState } from "react";
import "../../Css/createprofile.css"


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
    age: string;
    branch: string;
    year: string;
    email: string;
    rating: string;
    bio: string;
    achievements: Achievement[];
    events: Event[];
};

export default function ProfileCreate() {
    const [profile, setProfile] = useState<ProfileType>({
        name: "",
        age: "",
        branch: "",
        year: "",
        email: "",
        rating: "",
        bio: "",
        achievements: [],
        events: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const addAchievement = () => {
        setProfile({
            ...profile,
            achievements: [...profile.achievements, { type: "", title: "", description: "", date: "" }],
        });
    };

    const updateAchievement = (i: number, field: keyof Achievement, value: string) => {
        const updated = [...profile.achievements];
        updated[i][field] = value;
        setProfile({ ...profile, achievements: updated });
    };

    const addEvent = () => {
        setProfile({
            ...profile,
            events: [...profile.events, { name: "", date: "", role: "" }],
        });
    };

    const updateEvent = (i: number, field: keyof Event, value: string) => {
        const updated = [...profile.events];
        updated[i][field] = value;
        setProfile({ ...profile, events: updated });
    };

    const submitProfile = async () => {
        await fetch("/api/create-profile/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
        });

        alert("Profile Submitted");
    };

    return (
        <div className="profile-page">
            <h1 className="title">Create Profile</h1>

            <div className="section basic">
                <input className="input" name="name" placeholder="Name" onChange={handleChange} />
                <input className="input" name="age" placeholder="Age" onChange={handleChange} />
                <input className="input" name="branch" placeholder="Branch" onChange={handleChange} />
                <input className="input" name="year" placeholder="Year" onChange={handleChange} />
                <input className="input" name="email" placeholder="Email" onChange={handleChange} />
                <input className="input" name="rating" placeholder="Rating" onChange={handleChange} />
                <textarea className="textarea" name="bio" placeholder="Bio" onChange={handleChange} />
            </div>

            <div className="section achievements">
                <h2>Achievements</h2>
                {profile.achievements.map((ach, i) => (
                    <div className="card" key={i}>
                        <input className="input" placeholder="Type" onChange={(e) => updateAchievement(i, "type", e.target.value)} />
                        <input className="input" placeholder="Title" onChange={(e) => updateAchievement(i, "title", e.target.value)} />
                        <input className="input" placeholder="Description" onChange={(e) => updateAchievement(i, "description", e.target.value)} />
                        <input className="input" type="date" onChange={(e) => updateAchievement(i, "date", e.target.value)} />
                    </div>
                ))}
                <button className="btn add" onClick={addAchievement}>+ Add Achievement</button>
            </div>

            <div className="section events">
                <h2>Events</h2>
                {profile.events.map((ev, i) => (
                    <div className="card" key={i}>
                        <input className="input" placeholder="Event Name" onChange={(e) => updateEvent(i, "name", e.target.value)} />
                        <input className="input" type="date" onChange={(e) => updateEvent(i, "date", e.target.value)} />
                        <input className="input" placeholder="Role" onChange={(e) => updateEvent(i, "role", e.target.value)} />
                    </div>
                ))}
                <button className="btn add" onClick={addEvent}>+ Add Event</button>
            </div>

            <button className="btn submit" onClick={submitProfile}>Create Profile</button>
        </div>
    );
}
