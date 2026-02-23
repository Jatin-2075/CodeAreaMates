import { useEffect, useState } from "react"
import { API } from "../../Config/api";
import "../../Css/past-events.css"

interface EventType {
    id: number;
    title: string;
    date: string;
    location: string;
}

export default function PastEvents() {
    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await API('GET', "/past-events")

                setEvents(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="past-events">
            <h2>Past Events</h2>

            {events.length === 0 ? (
                <p>No past events found</p>
            ) : (
                events.map((event) => (
                    <div key={event.id} className="event-card">
                        <h3>{event.title}</h3>
                        <p>{event.date}</p>
                        <p>{event.location}</p>
                    </div>
                ))
            )}
        </div>
    );
}
