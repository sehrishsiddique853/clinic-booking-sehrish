import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
const navigate = useNavigate();
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role",res.data.user.role);
             localStorage.setItem("name", res.data.user.name);

              if (res.data.user.role === "staff") {
                navigate("/manage-appointments");
            } else {
                navigate("/patient");
            }

        } catch (err) {

            alert(err.response.data.message);

        }

    };

    return (

        <div className="container">

            <h2>Login</h2>

            <form onSubmit={login}>


                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>
                    Login
                </button>

              

            </form>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/register")}>  Register
                </button>

        </div>

    );

}

export default Login;