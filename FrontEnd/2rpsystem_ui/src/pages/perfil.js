import React, { useState, useEffect } from 'react';
import '../assets/css/Perfil.css'
import Header from '../components/header'

export default function PerfilUsuario() {
    return (
        <div>
            <Header />
            <div className='body-perfil'>
                <section className='container-perfil'>
                    <h1>Meu Perfil</h1>
                    <div className='box-perfil'>
                        <form className='FormPerfil'>
                            <div className="Info-User">
                                <h3>Nome de Usuário:
                                    <span>
                                        Usuário
                                    </span>
                                </h3>
                                <h3>Email:
                                    <span>
                                        usuario@email.com
                                    </span>
                                </h3>
                            </div>
                            <div className="box-Form">
                                <label className='label-perfil'>Novo nome:</label>
                                <input className='InputPerfil' type="text" name="nome" placeholder='Novo nome'></input>
                            </div>
                            <div className="box-Form">
                                <label>Novo email:</label>
                                <input className='InputPerfil' type="email" name="Email" placeholder='Novo email'></input>
                            </div>
                            <div className="box-Form">
                                <label>Nova Senha</label>
                                <input className='InputPerfil' type="password" name="password" placeholder='Nova Senha'></input>
                            </div>

                            <input type="submit"
                                className="SubmitPerfil"
                                value="Salvar">
                            </input>
                        </form>
                    </div>
                </section>

            </div>

        </div>
    );
}