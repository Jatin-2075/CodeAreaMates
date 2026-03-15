import { useEffect, useState } from "react";
import { API } from "../../Config/api";
import "../../Css/past-events.css";

interface EventType {
    id: number;
    title: string;
    date: string;
    description: string;
}

export default function PastEvents() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await API("GET", "/auth/past-events/");
                if (res.success) {
                    setEvents(res.data);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <div className="past-events"><p>Loading...</p></div>;

    return (
        <div className="past-events">
            <h2>Past Events</h2>

            {events.length === 0 ? (
                <p>No past events found</p>
            ) : (
                <div className="events-grid">
                    {events.map((event) => (
                        <div key={event.id} className="event-card">
                            <h3>{event.title}</h3>
                            <p>📅 {event.date}</p>
                            <p>📝 {event.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}