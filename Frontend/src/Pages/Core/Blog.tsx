import { useState } from "react";
import "../../Css/blog.css"

type Story = {
    id: number;
    title: string;
    content: string;
    rating: number;
    club: string;
    images: string[];
    likes: number;
};

export default function EventStoriesPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(3);
    const [club, setClub] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files).slice(0, 3);
        const previews = files.map((file) => URL.createObjectURL(file));
        setImages(previews);
    };

    const submitStory = () => {
        if (!title || !content) return;

        const newStory: Story = {
            id: Date.now(),
            title,
            content,
            rating,
            club,
            images,
            likes: 0,
        };

        setStories([newStory, ...stories]);
        setTitle("");
        setContent("");
        setClub("");
        setImages([]);
        setRating(3);
    };

    const like = (id: number) => {
        setStories((prev) =>
            prev.map((s) => (s.id === id ? { ...s, likes: s.likes + 1 } : s))
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

                <input
                    className="input"
                    placeholder="Club / Category"
                    value={club}
                    onChange={(e) => setClub(e.target.value)}
                />

                <div className="rating">
                    <span>Rating:</span>
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button
                            key={n}
                            onClick={() => setRating(n)}
                            className={n <= rating ? "star active" : "star"}
                        >
                            ★
                        </button>
                    ))}
                </div>

                <input type="file" multiple accept="image/*" onChange={handleImages} />
                <div className="preview">
                    {images.map((img, i) => (
                        <img key={i} src={img} className="preview-img" />
                    ))}
                </div>

                <button onClick={submitStory} className="post-btn">Post Story</button>
            </div>

            <div className="stories">
                {stories.map((s) => (
                    <div key={s.id} className="story-card">
                        <div className="story-header">
                            <h2>{s.title}</h2>
                            <span className="club">{s.club}</span>
                        </div>

                        <div className="story-rating">{"★".repeat(s.rating)}</div>
                        <p className="story-text">{s.content}</p>

                        {s.images.length > 0 && (
                            <div className="story-images">
                                {s.images.map((img, i) => (
                                    <img key={i} src={img} className="story-img" />
                                ))}
                            </div>
                        )}

                        <button onClick={() => like(s.id)} className="like-btn">
                            👍 {s.likes}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}