import Header from '../components/header'
import React from 'react';
import '../assets/css/ListaUsuarios.css'
import Edit from '../assets/img/edit.png'
import Trash from '../assets/img/trash.png'
import '../assets/css/components/Modal.css'

export default function ListaUsuarios() {

    function OpenModal() {
        var modal = document.getElementById("modalUser");
        modal.style.display = "flex";
    };

    function CloseModal() {
        var modal = document.getElementById("modalUser");
        modal.style.display = "none";
    };

    return (
        <div>
            <Header />
            <div className="fundo">

                <div id={"modalUser"} className='modalABackground'>
                    <div className='modalAContainer'>
                        <div className='modalA-header'>
                            <button
                                className='exitA-button'
                                onClick={(event) => {
                                    event.preventDefault()
                                    CloseModal()
                                }}
                            >x
                            </button>
                        </div>
                        <div className='body-modal'>
                            <form className='FormPerfil'>
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

                                <select
                                    className='InputCadastro'
                                    name="select">
                                    <option value="0" selected disabled>
                                        Selecione o Status do usuário
                                    </option>

                                    <option value='1' >Ativo</option>
                                    <option value='2' >Inativo</option>

                                </select>

                                <input type="submit"
                                    className="SubmitPerfil"
                                    value="Salvar">
                                </input>
                            </form>
                        </div>
                    </div>
                </div>

                <section className='body-lista'>
                    <h1>Listagem de Usuários</h1>
                    <div className='container-lista'>
                        <div className='box-tabela'>

                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>Nome Usuário</th>
                                        <th>Email</th>
                                        <th>Tipo de Usuário</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>
                                <tbody id="">
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                        <td className='status'>
                                            <div className='green'></div>
                                            Ativo
                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    OpenModal(event.idUser)
                                                }}><img src={Edit} alt="Imagem de Editar"></img>
                                            </button>

                                            <button type="button"><img src={Trash} alt="Imagem de Excluir"></img></button>

                                        </td>

                                        <td className='status'>
                                            <div className='red'></div>
                                            Inativo
                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    OpenModal(event.idUser)
                                                }}><img src={Edit} alt="Imagem de Editar"></img>
                                            </button>

                                            <button type="button"><img src={Trash} alt="Imagem de Excluir"></img></button>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </section>
            </div>
        </div >
    );

}