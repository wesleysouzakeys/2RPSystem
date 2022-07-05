import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import '../assets/css/Login.css'
import Header from '../components/header'
import { API } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from '../services/auth'

export default function Login() {
    const [IsLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setPassword] = useState("");

    let history = useNavigate();

    const FazerLogin = (e) => {
        setIsLoading(true);
        e.preventDefault();

        var myUrl = API + "/api/Login"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('2rpsystem-token-autenticacao') },
            body: JSON.stringify({ "email": email, "senha": senha })
        };

        fetch(myUrl, requestOptions)
            .then((resposta) => {
                if (resposta.status === 200) {
                    return resposta.json()
                        .then((data) => {
                            console.log('Logou')
                            localStorage.setItem('2rpsystem-token-autenticacao', data.token);
                            console.log(parseJwt().jti)
                            // console.log(parseJwt())

                            if (parseJwt().jti === '2' || parseJwt().jti === '3') {
                                history('/listaUsuarios')
                            }
                            else if (parseJwt().jti === '1') {
                                history('/perfil')
                                console.log('logado: ' + usuarioAutenticado())
                            }
                            else {
                                history('/notFound')
                            }
                        })
                }
                setIsLoading(false);
            })

            .catch((error) => {
                console.log(error)
                this.setState({ erroMensagem: 'E-mail e/ou senha inválidos', isLoading: false })
                setIsLoading(false);
            })
        setIsLoading(false);
    };


    return (
        <div>
            <Header />
            <div className='body-login'>

                <section className='container-login'>
                    <div className='box-login'>
                        <h1>Login</h1>
                        <form onSubmit={FazerLogin} className='FormLogin'>

                            <input
                                className='InputLogin'
                                type="text"
                                name="Email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>

                            <input
                                className='InputLogin'
                                type="password"
                                name="senha"
                                value={senha}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Senha'
                            ></input>

                            {
                                IsLoading === true ?
                                    <input className='SubmitLogin' type='submit' disabled >Carregando...</input> : <input type="submit" className="SubmitLogin" value="Entrar"></input>
                            }

                        </form>
                    </div>
                </section>

            </div>
        </div>
    )
}