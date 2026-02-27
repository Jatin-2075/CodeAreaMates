import { useState } from "react";
import { API } from "../../../Config/api";

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

    const [loading, setLoading] = useState(false);

    const submitProposal = async () => {
        if (loading) return;

        setLoading(true);
        setData(p => ({ ...p, status: "Sending..." }));

        try {
            const res = await API("POST", "/participation-request/save", {
                event: eventId,
                role: data.role,
                message: data.message
            });

            if (res.success) {
                setData(p => ({ ...p, message: "", status: "Proposal sent ✔" }));
            } else {
                setData(p => ({ ...p, status: "Failed to send" }));
            }

        } catch {
            setData(p => ({ ...p, status: "Server error" }));
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
                onChange={(e) => setData(p => ({ ...p, role: e.target.value }))}
                className="proposal-input"
            >
                <option value="member">Member</option>
            </select>

            <label>Why should you be selected?</label>
            <textarea
                className="proposal-textarea"
                value={data.message}
                onChange={(e) => setData(p => ({ ...p, message: e.target.value }))}
                placeholder="Write your proposal..."
            />

            <button onClick={submitProposal} className="proposal-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Proposal"}
            </button>

            {data.status && <p className="proposal-status">{data.status}</p>}
        </div>
    );
}