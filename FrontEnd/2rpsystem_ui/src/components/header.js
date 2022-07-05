import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/components/Header.css'
import logo from '../assets/img/logo2RP.png'
import { parseJwt, usuarioAutenticado } from '../services/auth'

export default function Header() {

    return (
        <div>
            <header className='header2'>
                <div className="container container_header">
                    <Link to="/"><img className='logo' src={logo} alt=""></img></Link>
                    <div>
                        {
                            usuarioAutenticado() ? <Link to="/"><button onClick={() => localStorage.clear()} >Logout</button></Link> : <Link to="/"><button>Login</button></Link>
                        }
                        {
                            localStorage.getItem('2rpsystem-token-autenticacao') !== null && 
                             (parseJwt().role === '2' || parseJwt().role === '3' ) ?
                            <Link to="/cadastroUsuario"><button>Cadastrar</button></Link> : <button></button>
                        }

                    </div>
                </div>
            </header>
        </div>
    )

}