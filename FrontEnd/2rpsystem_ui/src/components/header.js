import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/components/Header.css'
import logo from '../assets/img/logo2RP.png'

export default function Header() {

    return (
        <div>
            <header className='header2'>
                <div className="container container_header">
                    <Link to="/"><img className='logo' src={logo}></img></Link>
                </div>
            </header>
        </div>
    )

}