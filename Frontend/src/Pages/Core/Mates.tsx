import { useEffect, useState } from "react";
import { API } from "../../Config/api";
import "../../Css/mates.css"

interface Mate {
    id: number;
    username: string;
    email: string;
}

export default function Mates() {
    const [mates, setMates] = useState<Mate[]>([]);
   
    useEffect(() => {
        const fetchMates = async () => {
            try {
                const res = await API("GET", '/mates')

                setMates(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchMates();
    }, []);

    return (
        <div className="mates-page">
            <h2>Your Mates</h2>

            {mates.length === 0 ? (
                <p>No teammates yet</p>
            ) : (
                <div className="mates-grid">
                    {mates.map((mate) => (
                        <div key={mate.id} className="mate-card">
                            <div className="avatar">
                                {mate.username.charAt(0).toUpperCase()}
                            </div>

                            <h3>{mate.username}</h3>
                            <p>{mate.email}</p>

                            <button className="mate-btn">View Profile</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
