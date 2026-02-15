import { useNavigate } from "react-router-dom";
import "../Css/explore.css"
type Event = {
    id: number;
    title: string;
    date: string;
    requiredPeople: number;
    currentPeople: number;
};

const events: Event[] = [
    {
        id: 1,
        title: "Tech Hackathon",
        date: "2026-03-15",
        requiredPeople: 50,
        currentPeople: 32,
    },
    {
        id: 2,
        title: "Cultural Fest",
        date: "2026-04-02",
        requiredPeople: 100,
        currentPeople: 76,
    },
];

export const Explore = () => {
    const navigate = useNavigate();

    return (
        <div className="explore-container">
            <h1 className="explore-title">Explore Events</h1>

            <div className="events-list">
                {events.map((event) => (
                    <div key={event.id} className="event-card">
                        <h2 className="event-title">{event.title}</h2>
                        <p>Date: {event.date}</p>
                        <p>Required: {event.requiredPeople}</p>
                        <p>Current: {event.currentPeople}</p>

                        <button
                            className="details-btn"
                            onClick={() => navigate(`/events/${event.id}`)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
