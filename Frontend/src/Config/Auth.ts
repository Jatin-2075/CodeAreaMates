import { useNavigate } from "react-router-dom"
const navigate = useNavigate();

export function Logout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("username")
    navigate("/")
}

export function Checker() {
    const username = localStorage.getItem("username")
    const access = localStorage.getItem("access")
    const refresh = localStorage.getItem("refresh")
    if(refresh?.trim() == "" || username?.trim() == "" || access?.trim() == "") {
        navigate("/login")
        return 0;
    }
}