import React, { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage';
import axios from 'axios'
import './Login.css'
import { urlLogin } from '../../assets/env';


export default function Login() {
    const [Token, setToken] = useLocalStorage('token', '');
    const [Login, setLogin] = useState({ username: '', password: '' });
    const handleSubmit = e => { e.preventDefault(); }
    const handleChange = async e => {
        setLogin({
            ...Login,
            [e.target.name]: e.target.value
        })
    }

    const Post = () => {
        axios.post(`${urlLogin}`, Login)
            .then(response => {
                if (response.data === 'Usuario o contraseña son incorrectas') {
                    alert('Usuario o contraseña son incorrectas');
                } else {
                    setToken(response.data);
                    window.location.href = '/'
                    // console.log(response.data);
                }
            })
    }
    return (
        <div className="Login">
            <form className="LoginWrapper" onSubmit={handleSubmit}>
                <div className="Login-form-group">
                    <input type="text" className='Username' placeholder="Username" name="username" onChange={handleChange} />
                </div>
                <div className="Login-form-group">
                    <input type="password" className='Password' placeholder="Password" name="password" onChange={handleChange} />
                </div>
                <div className="Login-form-group">
                    <button onClick={Post}>Log in</button>
                </div>
                <div className="Login-form-group">
                    {/* <a href="#" className="forgot-password">Forgot password?</a> */}
                </div>
            </form>
        </div>
    )
}
