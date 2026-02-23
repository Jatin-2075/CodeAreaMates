import { useState } from "react";

type ProposalData = {
    role: string;
    message: string;
    status: string;
};

export default function ParticipationProposal({ eventId }: { eventId: number }) {
    const [data, setData] = useState<ProposalData>({
        role: "member",
        message: "",
        status: "",
    });

    const [loading, setLoading] = useState<boolean>(false);

    const submitProposal = async () => {
        if (loading) return;
        setLoading(true);
        setData((p) => ({ ...p, status: "Sending..." }));

        try {
            const res = await fetch(`/api/events/${eventId}/participate/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ role: data.role, message: data.message }),
            });

            if (!res.ok) throw new Error("Failed");

            setData((p) => ({ ...p, message: "", status: "Proposal sent ✔" }));
        } catch (err) {
            setData((p) => ({ ...p, status: "Error sending proposal" }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="proposal-box">
            <h3 className="proposal-title">Participate in Event</h3>

            <label>Role</label>
            <select
                value={data.role}
                onChange={(e) => setData((p) => ({ ...p, role: e.target.value }))}
                className="proposal-input"
            >
                <option value="member">Member</option>
            </select>

            <label>Why should you be selected?</label>
            <textarea
                className="proposal-textarea"
                value={data.message}
                onChange={(e) => setData((p) => ({ ...p, message: e.target.value }))}
                placeholder="Write your proposal..."
            />

            <button onClick={submitProposal} className="proposal-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Proposal"}
            </button>



            {data.status && <p className="proposal-status">{data.status}</p>}
        </div>
    );
}