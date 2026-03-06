import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../Config/api";
import "../../Css/events.css";

type Event = {
    id: number;
    name: string;
    date: string;
    description: string;
};

export const Explore = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await API("GET", "/auth/events/");

                if (res.success) {
                    setEvents(res.data);
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
                        <h2 className="event-title">{event.name}</h2>
                        <p>📅 {event.date}</p>
                        <p>📝 {event.description}</p>

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