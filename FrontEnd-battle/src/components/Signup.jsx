import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import {Link} from "react-router-dom"
import axios from 'axios';
function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/register', { name, email, password })
            .then(result => {
                console.log(result)
                navigate('/login')
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#6c757d', height: '100vh' }}>
                <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '0.25rem', width: '25%', marginBottom: '2.3rem' }}>
                    <h2 style={{ color: 'black', marginBottom: '0.5rem' }}>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginTop: '0.5rem' }}>
                            <label htmlFor="name"><strong style={{ color: 'black', marginTop: '0.5rem' }}>Name</strong></label>
                            <input style={{ padding: '0.25rem', width: '100%' }}
                                type="text"
                                placeholder="Enter Name"
                                autoComplete="off"
                                name="name"
                                className="form-control rounded-0"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '0.75rem' }}>
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
                        <button type="submit" style={{ background: '#28a745', width: '100%', borderRadius: '0.25rem', border: 'none', color: '#fff', padding: '0.25rem', marginTop: '0.5rem', cursor: "pointer" }}>Register</button>
                    </form>
                    <p style={{ color: 'black', marginBottom: '0.5rem', marginTop: '0.5rem' }}>Already Have An Account?<Link to='/Login'><span style={{ "color": "blue", "textDecoration": "underline" }}>Login</span></Link> </p>

                </div>
            </div>
        </div>
    );
}
export default Signup;
