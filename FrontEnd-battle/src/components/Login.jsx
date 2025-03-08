import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState("");
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/login', { email, password })
            .then(result => {
                if (result.data === "Success") {
                    setValidate("Login Successfully");
                    setIsLoggedIn(true); // Set login status to true
                    navigate("/");
                } else {
                    setValidate("Password Incorrect 🤬🤬");
                }
            })
            .catch(err => console.log(err));
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Set login status to false
        setValidate(""); // Clear validation message
        navigate("/login"); // Navigate to login page
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6c757d', height: '100vh' }}>
            <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.25rem', width: '25%', marginBottom: '2.3rem' }}>
                {isLoggedIn ? (
                    <div>
                        <h2 style={{ color: 'black', marginBottom: '0.5rem' }}>Welcome</h2>
                        <button onClick={handleLogout} style={{ background: '#dc3545', width: '100%', borderRadius: '0.25rem', border: 'none', color: '#fff', padding: '0.25rem', marginTop: '0.5rem' }}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <h2 style={{ color: 'black', marginBottom: '0.5rem' }}>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginTop: '0.5rem' }}>
                                <label htmlFor="email"><strong style={{ color: 'black' }}>Email</strong></label>
                                <input style={{ padding: '0.25rem', width: '100%', color: 'black' }}
                                    type="email"
                                    placeholder="Enter Email"
                                    autoComplete="off"
                                    name="email"
                                    className="form-control rounded-0"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '0.75rem' }}>
                                <label htmlFor="password"><strong style={{ color: 'black' }}>Password</strong></label>
                                <input style={{ padding: '0.25rem', width: '100%', color: 'black' }}
                                    type="password"
                                    placeholder="Enter Password"
                                    autoComplete="off"
                                    name="password"
                                    className="form-control rounded-0"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" style={{ background: '#28a745', width: '100%', borderRadius: '0.25rem', border: 'none', color: '#fff', padding: '0.25rem', marginTop: '0.5rem', cursor: "pointer" }}>Login</button>
                            <span style={{ color: "red" }}>{validate}</span>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
