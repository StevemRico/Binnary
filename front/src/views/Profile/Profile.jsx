import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { GetUser } from '../../services/Profile.services';
import './Profile.css';
export default function Profile() {
    const [Token, setToken] = useLocalStorage('token', '');
    const [User, setUser] = useState([]);
    const id = 1;
    useEffect(function () {
        GetUser(Token, id).then(user => setUser(user));
    }, [])
    console.log(User);
    return (
        <div class="Profile">
            <div class="ProfileWrapper">
                <div className="Profile-img">
                    <img src={User.profile_image} alt="Image did not load..." />
                </div>
                <div className="Profile-username">
                    <span>{User.username}</span>
                </div>
                <div className="Profile-description">
                    {User.description}
                </div>
                <div className="Profile-Follows-Followers-Publications">
                    <div className="Profile-Publications"></div>
                    <div className="Profile-Follows"></div>
                    <div className="Profile-Followers"></div>
                </div>
            </div>
        </div>
    )
}
