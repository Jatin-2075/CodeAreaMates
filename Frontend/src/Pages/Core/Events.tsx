import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../Css/events.css"

type Event = {
    id: number;
    title: string;
    date: string;
    requiredPeople: number;
    currentPeople: number;
};

export const Explore = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://127.0.0.1:8000/events/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if (data.success) {
                    setEvents(data.data);
                }
            } catch (err) {
                console.log("Error fetching events", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <h2 className="explore-title">Loading events...</h2>;

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