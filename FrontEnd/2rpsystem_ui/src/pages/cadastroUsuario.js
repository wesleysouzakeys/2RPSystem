
import React from 'react';
import '../assets/css/Cadastro.css'
import Header from '../components/header'

export default function CadastroUsuario() {

    return (
        <div>
            <Header />
            <div className='body-cadastro'>

                <section className='container-cadastro'>

                    <div className='box-Cadastro'>
                        <h1>Cadastro de Usuários</h1>
                        <form className='FormCadastro'>
                            <input className='InputCadastro' type="text" name="nome" placeholder='Nome'></input>
                            <input className='InputCadastro' type="email" name="Email" placeholder='Email'></input>
                            <input className='InputCadastro' type="password" name="password" placeholder='Senha'></input>

                            <select
                                className='InputCadastro'
                                name="select"
                            >
                                <option value="0" selected disabled>
                                    Selecione o Tipo de Usuário
                                </option>

                                <option value='1'>Administrador</option>
                                <option value='2'>Root</option>
                                <option value='3'>Geral</option>
                            </select>

                            <input type="submit" className="SubmitCadastro" value="Cadastrar"></input>
                        </form>
                    </div>
                </section>

            </div>
        </div>
    )
}