import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import { parseJwt, usuarioAutenticado } from '../services/auth'
import '../assets/css/Cadastro.css'
import Header from '../components/header'
import { API } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CadastroUsuario() {

    let history = useNavigate();

    const [IdTipoUsuario, setIdTipoUser] = useState('')
    const [Nome, setUserName] = useState('');
    const [Senha, setSenha] = useState('');
    const [Email, setEmail] = useState('');

    function cadastrar(event) {
        event.preventDefault();
        var myUrl = API + "/api/Usuarios"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('2rpsystem-token-autenticacao') },
            body: JSON.stringify({
                "idTipoUsuario": IdTipoUsuario,
                "nome": Nome,
                "email": Email,
                "senha": Senha,
                "status": true
            })
        };

        fetch(myUrl, requestOptions)
            .then(response => {
                if (response.status === 201) {
                    history('/listaUsuarios');
                    return response.json()
                        .then(data => {
                            console.log(data)
                        })
                }
            }).catch(error => console.log(error))
    }

    return (
        <div>
            <Header />
            <div className='body-cadastro'>

                <section className='container-cadastro'>

                    <div className='box-Cadastro'>
                        <h1>Cadastro de Usuários</h1>
                        <form className='FormCadastro' onSubmit={cadastrar}>
                            <input className='InputCadastro' type="text" name="nome" value={Nome} onChange={(campo) => setUserName(campo.target.value)} placeholder='Nome'></input>
                            <input className='InputCadastro' type="email" name="Email" value={Email} onChange={(campo) => setEmail(campo.target.value)} placeholder='Email'></input>
                            <input className='InputCadastro' type="password" name="password" value={Senha} onChange={(campo) => setSenha(campo.target.value)} placeholder='Senha'></input>

                            <select
                                className='InputCadastro'
                                name="select"
                                value={IdTipoUsuario}
                                onChange={(campo) => setIdTipoUser(campo.target.value)}
                            >
                                <option value="0" selected disabled>
                                    Selecione o Tipo de Usuário
                                </option>

                                <option value='1' onChange={(campo) => setIdTipoUser(campo.target.value)}>Geral</option>
                                <option value='2' onChange={(campo) => setIdTipoUser(campo.target.value)}>Administrador</option>
                                <option value='3' onChange={(campo) => setIdTipoUser(campo.target.value)}>Root</option>
                            </select>

                            <input type="submit" className="SubmitCadastro" value="Cadastrar"></input>
                        </form>
                    </div>
                </section>

            </div>
        </div>
    )
}