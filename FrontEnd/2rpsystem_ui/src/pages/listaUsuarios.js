import Header from '../components/header'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../assets/css/ListaUsuarios.css'
import { API } from '../services/api';
import Edit from '../assets/img/edit.png'
import Trash from '../assets/img/trash.png'
import '../assets/css/components/Modal.css'
import { useNavigate } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from '../services/auth'

export default function ListaUsuarios() {

    const [IdUsuario, setIdUsuario] = useState("");
    const [IdTipoUsuario, setIdTipoUsuario] = useState("");
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [InfoUser, setInfoUser] = useState("");
    const [Nome, setNome] = useState("");
    const [Email, setEmail] = useState("")
    const [Senha, setSenha] = useState("");
    let [Status, setStatus] = useState("");

    let history = useNavigate();

    function atualizarUsuario(event) {
        // event.preventDefault();
        // console.log(event)

        switch (Status) {
            case "true":
                Status = true;
                break;
            case "false":
                Status = false;
                break;
        }

        var myUrl = API + "/api/Usuarios/"
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('2rpsystem-token-autenticacao') },
            body: JSON.stringify({
                "idUsuario": IdUsuario,
                "idTipoUsuario": IdTipoUsuario,
                "nome": Nome,
                "email": Email,
                "senha": Senha,
                "status": Status
            })
        };
        fetch(myUrl, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    console.log('atualizou')
                    console.log(response)
                    CloseModal()
                    ListarUsuarios()
                }
            }).catch(error => console.log(error))
    }

    function OpenModal(event) {
        setIdUsuario(event.idUsuario);
        setIdTipoUsuario(event.idTipoUsuario);
        var modal = document.getElementById("modalUser");
        modal.style.display = "flex";
    };

    function CloseModal() {
        var modal = document.getElementById("modalUser");
        modal.style.display = "none";
    };

    function ListarUsuarios() {
        console.log('ListarUsuarios chamada')
        fetch(API + '/api/Usuarios', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('2rpsystem-token-autenticacao')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                        .then((data) => {
                            setListaUsuarios(data)
                            // console.log(data)
                        })
                }
            })
            .catch(erro => console.log(erro))
    }

    function ExcluirUser(idUsuario) {
        fetch(API + '/api/Usuarios/' + idUsuario, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('2rpsystem-token-autenticacao')
            },
        })
            .then((resposta) => {
                if (resposta.status === 204) {
                    console.log('Usuário excluido ' + idUsuario);
                    ListarUsuarios();
                }
            })
            .catch((erro) => console.log(erro))
    };

    useEffect(() => {
        ListarUsuarios();
    }, [])

    return (
        <div>
            <Header />
            <div className="fundo">
                {
                    listaUsuarios.map((event) => {
                        return (
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
                                                <input className='InputPerfil' type="text" name="nome" onChange={(campo) => setNome(campo.target.value)} placeholder='Novo nome'></input>
                                            </div>
                                            <div className="box-Form">
                                                <label>Novo email:</label>
                                                <input className='InputPerfil' type="email" name="Email" value={Email} onChange={(campo) => setEmail(campo.target.value)} placeholder='Novo email'></input>
                                            </div>
                                            <div className="box-Form">
                                                <label>Nova Senha</label>
                                                <input className='InputPerfil' type="password" name="password" value={Senha} onChange={(campo) => setSenha(campo.target.value)} placeholder='Nova Senha'></input>
                                            </div>

                                            <select
                                                className='InputCadastro'
                                                name="select"
                                                onChange={(campo) => setStatus(campo.target.value)} >
                                                <option value="0" selected disabled>
                                                    Selecione o Status do usuário
                                                </option>

                                                <option value={true} >Ativo</option>
                                                <option value={false} >Inativo</option>

                                            </select>

                                            <button
                                                type="button"
                                                className="SubmitPerfil"
                                                onClick={() => atualizarUsuario(event)}
                                            >Salvar
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }

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
                                    {
                                        listaUsuarios.map((event) => {
                                            return (
                                                <tr key={event.idUsuario}>
                                                    <td>{event.nome}</td>
                                                    <td>{event.email}</td>
                                                    <td>{event.idTipoUsuarioNavigation.titulo}</td>
                                                    {
                                                        event.status == true ?
                                                            <td className='status'>
                                                                <div className='green'></div>
                                                                Ativo
                                                                <button
                                                                    type="button"
                                                                    onClick={(evento) => {
                                                                        evento.preventDefault()
                                                                        OpenModal(event)
                                                                    }}><img src={Edit} alt="Imagem de Editar"></img>
                                                                </button>

                                                                {
                                                                    parseJwt().jti === '3' ?
                                                                        <button onClick={() => ExcluirUser(event.idUsuario)} type="button"><img src={Trash} alt="Imagem de Excluir"></img></button> :
                                                                        <button className="DisableBtn" type="button"><img src={Trash} alt="Imagem de Excluir"></img></button>
                                                                }
                                                            </td> :
                                                            <td key={event.idUsuario} className='status'>
                                                                <div className='red'></div>
                                                                Inativo
                                                                <button
                                                                    type="button"
                                                                    onClick={(evento) => {
                                                                        evento.preventDefault()
                                                                        OpenModal(event)
                                                                    }}><img src={Edit} alt="Imagem de Editar"></img>
                                                                </button>

                                                                {
                                                                    parseJwt().jti === '3' ?
                                                                        <button onClick={() => ExcluirUser(event.idUsuario)} type="button"><img src={Trash} alt="Imagem de Excluir"></img></button> :
                                                                        <button className="DisableBtn" type="button"><img src={Trash} alt="Imagem de Excluir"></img></button>
                                                                }
                                                            </td>
                                                    }

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </section>
            </div>
        </div >
    );

}