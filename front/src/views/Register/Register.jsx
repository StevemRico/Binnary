import React, { useState } from 'react'
import './Register.css'
import axios from 'axios';
import { urlRegister } from '../../assets/env';


export default function Register() {
    const [Response, setResponse] = useState('')
    const [Register, setRegister] = useState({
        username: '',
        email: '',
        password: '',
        phone_number: ''
    });
    const handleSubmit = e => { e.preventDefatult(); }
    const handleChange = async e => {
        await setRegister({
            ...Register,
            [e.target.name]: e.target.value
        })
    }

    const Post = () => {
        axios.post(`${urlRegister}`, Register)
        .then(response => {
            if(response.request.response === 'Usuario Registrado'){
                  window.location.href = '/Login'
                console.log(response.request.response);
            }else if(response.status === 400){
                setResponse(response.request.response);
                console.log(response.request.response);
            }
        }).catch(

        )
    }
    return (
        <div className="Register">
            <form className="RegisterWrapper" onSubmit={handleSubmit}>
                <div className="Register-form-group">
                    <input type="text" className='Username' placeholder="Username" name="username" onChange={handleChange} />
                </div>
                <div className="Register-form-group">
                    <input type="email" className='Email' placeholder="Email" name="email" onChange={handleChange} />
                </div>
                <div className="Register-form-group">
                    <input type="text" className='Phone' placeholder="Phone" name="phone_number" onChange={handleChange} />
                </div>
                <div className="Register-form-group">
                    <input type="password" className='Password' placeholder="Password" name="password" onChange={handleChange} />
                </div>
                <div className="Register-form-group">
                    <button onClick={Post}>Register</button>
                </div>
                <div className="Register-form-group">
                    {/* <a href="#" className="forgot-password">Forgot password?</a> */}
                </div>
            </form>
        </div>
    )
}
