import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate()

    const [UserName, SetUserName] = useState<string>("");
    const [Password, SetPassword] = useState<string>("");

    const HandleSubmit = async () => {
        try {
            const res = await fetch(`rf/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: UserName,
                    password: Password,
                }),
            });

            if (!res.ok) {
                alert("Invalid Credentials")
                return
            }

            const data = await res.json();

            localStorage.setItem("access", data.access)
            localStorage.setItem("refresh", data.refresh)

            const access = localStorage.getItem("access")
            console.log(data);

            if (access) {
                navigate("/dashboard")
            }

            else {
                alert("Something went wrong check")
            }
        } catch (err) {
            alert("something went wrong")
            console.log(err)
        }
    };

    return (
        <div className="ss-login">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="brand">CampusCircle</h1>
                        <h3 className="subtitle">Login</h3>
                    </div>

                    <div className="login-form">
                        <div className="input-group">
                            <label>UserName</label>
                            <input placeholder="UserName" required maxLength={100} onChange={(e) => SetUserName(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" placeholder="Password" required maxLength={20} minLength={8} onChange={(e) => SetPassword(e.target.value)} />
                        </div>

                        <button className="btn primary" onClick={HandleSubmit}> Submit </button>
                        <div className="signup-redirect">
                            <p>New user? <NavLink to="/signup">Signup</NavLink> </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}


export const Signup = () => {

    const navigate = useNavigate();

    const [Email, SetEmail] = useState<string>("");
    const [Username, SetUsername] = useState<string>("");
    const [Password, SetPassword] = useState<string>("");
    const [ConfirmPassword, SetConfirmPassword] = useState<string>("");

    const HandleSubmit = async () => {

        console.log(Username, Email, Password)

        if (ConfirmPassword != Password) {
            alert("password Doesn't match")
            return
        }

        try {
            const res = await fetch(`1/auth/signup/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: Username,
                    email: Email,
                    password: Password
                }),
            });

            const data = await res.json();
            console.log(data);
            alert(data.msg);

            if (data.success) {
                const reslogin = await fetch(`x/api/token/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: Username,
                        password: Password,
                    }),
                });
                if (!reslogin.ok) {
                    alert("Invalid Credentials")
                    return
                }
                const datalogin = await reslogin.json();

                localStorage.setItem("access", datalogin.access)
                localStorage.setItem("refresh", datalogin.refresh)
                const access = localStorage.getItem("access")

                console.log(datalogin);

                if (access) {
                    
                    navigate("/pageone")
                }

                else {
                    alert("Something went wrong check")
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="ss-signup">
            <div className="signup-container">
                <div className="signup-card">
                    <div className="signup-header">
                        <h1 className="brand">CampusCircle</h1>
                        <h3 className="subtitle">Signup</h3>
                    </div>

                    <div className="signup-form">
                        <div className="input-group">
                            <label>Username</label>
                            <input placeholder="Username" onChange={(e) => SetUsername(e.target.value)} type="text" />
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input placeholder="Email" type="email" onChange={(e) => SetEmail(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" onChange={(e) => SetPassword(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input type="password" onChange={(e) => SetConfirmPassword(e.target.value)} />
                        </div>

                        <button className="btn primary" onClick={HandleSubmit}>
                            Create Account
                        </button>

                        <div className="login-redirect">
                            <p>Already have an account?</p> <NavLink to="/login" >Login</NavLink> 
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}