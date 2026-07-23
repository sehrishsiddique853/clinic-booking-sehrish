import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/auth/register", {
                name,
                email,
                password
            });

            alert(res.data.message);

            setName("");
            setEmail("");
            setPassword("");

        } catch (err) {

            alert(err.response.data.message);

        }

    };

    return (

        <div className="container">

            <h2>Register</h2>

            <form onSubmit={register}>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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
                    Register
                </button>

              
            </form>
                 <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/Login")}>  Login
                </button>

        </div>

    );

}

export default Register;