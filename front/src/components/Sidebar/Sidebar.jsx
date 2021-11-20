import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { BsFillGridFill, BsPersonFill, BsSearch } from 'react-icons/bs';
import { AiOutlinePoweroff, AiFillHome, AiFillMessage } from 'react-icons/ai';
import { BiHome, BiNotification, BiUpload } from 'react-icons/bi';
import { BsPlayBtn } from 'react-icons/bs';
import { FaStoreAlt } from 'react-icons/fa';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [Token, setToken] = useLocalStorage('token', '');
    const Logout = () => {
        setToken('');
        window.location.href = '/Login';
    }
    const sidebarexpanded = () => {
        const side = document.querySelector('#sidemenu');
        side.classList.toggle("sidemenu-menu-expanded");
        side.classList.toggle("sidemenu-menu-collapsed");
    }
    return (
        <div className='sidemenu-menu-collapsed' id='sidemenu'>
            <div className='sidemenu-header'>
                <div className='sidemenu-btn' onClick={sidebarexpanded}>
                    <BsFillGridFill />
                </div>
                <span>Binnary</span>
            </div>
            <div className='sidemenu-items'>
                <Link to='/profile' className='Link'>
                    <div className="sidemenu-profile">
                        <div className="">
                            <BsPersonFill />
                        </div>
                        <span>Stevemrico</span>
                    </div>
                </Link>
                <Link to='' className='Link'>
                    <div className="sidemenu-home">
                        <div className="">
                            <AiFillHome />
                        </div>
                        <span>Home</span>
                    </div>
                </Link>
                <div className="sidemenu-search">
                    <div className="">
                        <BsSearch />
                    </div>
                    <input type="text" name="" id="" />
                </div>
                <Link to='/Messages' className='Link'>
                    <div className="sidemenu-messages">
                        <div className="">
                            <AiFillMessage />
                        </div>
                        <span>Messages</span>
                    </div>
                </Link>
                <div className="sidemenu-notifications">
                    <div className="">
                        <BiNotification />
                    </div>
                    <span>Notifications</span>
                </div>
                <Link to='Videos' className='Link'>
                    <div className="sidemenu-videos">
                        <div className="">
                            <BsPlayBtn />
                        </div>
                        <span>Videos</span>
                    </div>
                </Link>
                <Link to='Store' className='Link'>
                    <div className="sidemenu-store">
                        <div className="">
                            <FaStoreAlt />
                        </div>
                        <span>Store</span>
                    </div>
                </Link>
            </div>
            <div className='sidemenu-logout' onClick={Logout}>
                <div className="">
                    <AiOutlinePoweroff />
                </div>
                <span>Logout</span>
            </div>
        </div>
    )
}