import React , {useState} from 'react';
import img from '../assets/1vs Computer.png';
import '../styles/register.css';
import validator from 'validator';
import { registerUser } from '../utils/api';
import LockIcon from '@mui/icons-material/Lock'; // Correct LockIcon import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const [email,setEmail]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [confirmedPass,setConfirmedPass]=useState("")
    const [errorMessage,setErrorMessage]=useState({
        message:"",
        source:""
    })
    const [sucessMessage,setSucessMessage]=useState("")
    const handleRegister=(e)=>{
        e.preventDefault;
        if(password!==confirmedPass){
            setErrorMessage({message:"Passwords do not match",source:"password"})
            return;
        }
        if(password.length<8){
            setErrorMessage({message:"Password must be at least 8 characters long",source:"password"})
            return;
        }
        if(username.length<3){
            setErrorMessage({message:"Username must be at least 3 characters long",source:"username"})
            return;
        }
        if(validator.isAlphaNumeric(username)){
            setErrorMessage({message:"Username must be alphanumeric",source:"username"})
            return;
        }
        if(!validator.isEmail(email)){
            setErrorMessage({message:"Invalid email",source:"email"})
            return;
        }
        try {
            const data=registerUser(username,email,password)
            localStorage.setItem('token',data.token)
            setSucessMessage('Registration Successful .Please check your Email for confirmation')
            navigate('/')
            
        } catch (error) {
            setErrorMessage({message:error.response.data.error || 'An error occurred.',source:"server"})
        }


    }
    return (
        <div className='register'>
            <div className='register-img'>
                <img src={img} alt="Registration Illustration" />
            </div>
            <div className='register-form-container'>
                <h1>Register</h1>
                <form className='register-form'>
                    <div className='input-container'>
                        <label>Username</label>
                        <input 
                        type='text' 
                        placeholder='Enter your username'
                        value={username}
                        onChange={handleUserName}
                         />
                        <FontAwesomeIcon icon={faUser} style={{ color: "white", fontSize: '30px' }} />
                    </div>
                    <div className='input-container'>
                        <label>Email</label>
                        <input 
                        type='email' 
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                         />
                        <FontAwesomeIcon icon={faEnvelope} style={{ color: "white", fontSize: '30px' }} />
                    </div>
                    <div className='input-container'>
                        <label>Password</label>
                        <input 
                        type='password' 
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                         />
                        <LockIcon style={{ color: 'white', fontSize: '33px' }} />
                    </div>
                    <div className='input-container'>
                        <label>Confirm Password</label>
                        <input 
                        type='password' 
                        placeholder='Confirm your password'
                        value={confirmedPass}
                        onChange={(e)=>setConfirmedPass(e.target.value)}
                         />
                        <LockIcon style={{ color: 'white', fontSize: '33px' }} />
                    </div>
                    <button className='register-btn' onSubmit={handleRegister}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
