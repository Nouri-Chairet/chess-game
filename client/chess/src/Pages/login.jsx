import React, { useState, useEffect } from 'react';
import { loginUser } from '../utils/api'; // Adjust the import path accordingly
import '../styles/login.css';
import img from '../assets/1vs1.png';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        gsap.from(".login-container", { duration: 1, opacity: 0, y: -50 });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const data = await loginUser(username, password);
            localStorage.setItem('token', data.token); 
            setSuccessMessage('Login successful!');
            navigate('/Home'); 
        } catch (error) {
            setErrorMessage(error.response.data.error || 'An error occurred.'); 
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className='welcome-login'>Welcome to Chessi.com </h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <PersonIcon style={{color:'white',fontSize:'39px'}} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <LockIcon style={{color:'white',fontSize:'33px'}} />

                    </div>
                    {errorMessage && <p style={{color:'red',fontSize:'16px',fontWeight:'500',textAlign:"center",marginBottom:"17px"}}>{errorMessage}</p>}
                    {successMessage && <p style={{color:'green',fontSize:'16px',fontWeight:'500',textAlign:"center",marginBottom:"17px"}}>{successMessage}</p>}
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p style={{ color: 'white', fontSize: '16px', fontWeight: '500', textAlign: "center", marginTop: "17px" }}>Don't have an account? <Link to="/register" style={{ color: '#09d309' }}>Register</Link></p>
                <div className="social-login">
                    <p className='txt'>Or login with</p>
                    <button className="google-button">                        <GoogleIcon className="icon-style" />
                    </button>
                    <button className="facebook-button">                        <FacebookIcon className="icon-style" />
                    </button>
                </div>
            </div>
            <div className="login-image">
                <img src={img} alt="Chess" />
            </div>
        </div>
    );
};

export default Login;
