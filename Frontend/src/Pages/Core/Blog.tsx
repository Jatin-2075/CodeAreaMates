import { useEffect, useState } from "react";
import { API } from "../../Config/api";
import "../../Css/blog.css";

type Story = {
    id: number;
    title: string;
    content: string;
    rating: number;
    likes?: number;
};

export default function EventStoriesPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(3);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await API("GET", "/auth/stories/");

                if (res.success) {
                    setStories(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchStories();
    }, []);

    const submitStory = async () => {
        if (!title || !content) return;

        try {
            const res = await API("POST", "/auth/story/save/", {
                title,
                content,
                rating,
                event: 1,
            });

            if (res.success) {
                setStories([res.data, ...stories]);
                setTitle("");
                setContent("");
                setRating(3);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const like = (id: number) => {
        setStories(prev =>
            prev.map(s => s.id === id ? { ...s, likes: (s.likes || 0) + 1 } : s)
        );
    };

    return (
        <div className="container">
            <h1 className="heading">Event Stories</h1>

            <div className="story-form">
                <input
                    className="input"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="textarea"
                    placeholder="How was the event?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="rating">
                    <span>Rating:</span>
                    {[1, 2, 3, 4, 5].map(n => (
                        <button
                            key={n}
                            onClick={() => setRating(n)}
                            className={n <= rating ? "star active" : "star"}
                        >
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