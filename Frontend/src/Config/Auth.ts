import { useNavigate } from "react-router-dom"

export function useLogout() {
    const navigate = useNavigate();

    return () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");
        navigate("/");
    };
}


export function Checker() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username")
    const access = localStorage.getItem("access")
    const refresh = localStorage.getItem("refresh")
    if (refresh?.trim() == "" || username?.trim() == "" || access?.trim() == "") {
        navigate("/login")
        return 0;
    }
}