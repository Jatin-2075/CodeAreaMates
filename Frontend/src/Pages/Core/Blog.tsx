import { useEffect, useState } from "react";
import { API } from "../../Config/api";
import "../../Css/blog.css"

type Story = {
    id: number;
    title: string;
    content: string;
    rating: number;
    club: string;
    images?: string[];
    likes?: number;
};

export default function EventStoriesPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(3);
    const [club, setClub] = useState("");

    // LOAD STORIES
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await API("GET", "/stories");

                if (res.success) {
                    setStories(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchStories();
    }, []);

    // SUBMIT STORY
    const submitStory = async () => {
        if (!title || !content) return;

        try {
            const res = await API("POST", "/story/save", {
                title,
                content,
                rating,
                club
            });

            if (res.success) {
                setStories([res.data, ...stories]);
                setTitle("");
                setContent("");
                setClub("");
                setRating(3);
            }

        } catch (err) {
            console.log(err);
        }
    };

    // FRONTEND LIKE ONLY
    const like = (id: number) => {
        setStories(prev =>
            prev.map(s => s.id === id ? { ...s, likes: (s.likes || 0) + 1 } : s)
        );
    };

    return (
        <div className="container">
            <h1 className="heading">Event Stories</h1>

            <div className="story-form">
                <input className="input" placeholder="Event Title"
                    value={title} onChange={(e) => setTitle(e.target.value)} />

                <textarea className="textarea" placeholder="How was the event?"
                    value={content} onChange={(e) => setContent(e.target.value)} />

                <input className="input" placeholder="Club / Category"
                    value={club} onChange={(e) => setClub(e.target.value)} />

                <div className="rating">
                    <span>Rating:</span>
                    {[1,2,3,4,5].map(n => (
                        <button key={n}
                            onClick={() => setRating(n)}
                            className={n <= rating ? "star active" : "star"}>
                            ★
                        </button>
                    ))}
                </div>

                <button onClick={submitStory} className="post-btn">Post Story</button>
            </div>

            <div className="stories">
                {stories.map(s => (
                    <div key={s.id} className="story-card">
                        <div className="story-header">
                            <h2>{s.title}</h2>
                            <span className="club">{s.club}</span>
                        </div>

                        <div className="story-rating">{"★".repeat(s.rating)}</div>
                        <p className="story-text">{s.content}</p>

                        <button onClick={() => like(s.id)} className="like-btn">
                            👍 {s.likes || 0}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}