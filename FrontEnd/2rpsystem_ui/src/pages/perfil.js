import React, { useState, useEffect } from 'react';
import '../assets/css/Perfil.css'
import Header from '../components/header'
import { API } from '../services/api';
import { parseJwt } from '../services/auth'

export default function PerfilUsuario() {

    const [InfoUser, setInfoUser] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("");

    function atualizarUsuario(event) {
        event.preventDefault();
        
        var myUrl = API + "/api/Usuarios/"
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('2rpsystem-token-autenticacao') },
            body: JSON.stringify({
                "idUsuario": InfoUser.idUsuario,
                "idTipoUsuario": InfoUser.idTipoUsuario,
                "nome": nome,
                "email": email,
                "senha": senha,
                "status": InfoUser.status
            })
        };
        fetch(myUrl, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    alert("Atualizado com Sucesso ✅")
                }
            }).catch(error => console.log(error))
    }
    
    useEffect(() => {
        ListarPerfil();
    }, [atualizarUsuario])

    function ListarPerfil() {
        var myUrl = API + "/api/Usuarios/" + parseJwt().jti
        const requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('2rpsystem-token-autenticacao')
            }
        };
        fetch(myUrl, requestOptions
        ).then(response => {
            if (response.status === 200) {
                return response.json()
                    .then((data) =>
                        setInfoUser(data)
                        // console.log(data)
                    )
            }
        })
            .catch(erro => console.log(erro))
    }

    useEffect(() => {
        ListarPerfil();
    }, [])

    return (
        <div>
            <Header />
            <div className='body-perfil'>
                <section className='container-perfil'>
                    <h1>Meu Perfil</h1>
                    <div className='box-perfil'>
                        <form onSubmit={atualizarUsuario} className='FormPerfil'>
                            <div className="Info-User">
                                <h3>Nome de Usuário:
                                    <span>
                                        {InfoUser.nome}
                                    </span>
                                </h3>
                                <h3>Email:
                                    <span>
                                        {InfoUser.email}
                                    </span>
                                </h3>
                            </div>
                            <div className="box-Form">
                                <label className='label-perfil'>Novo nome:</label>
                                <input className='InputPerfil' type="text" name="nome" value={nome} onChange={(campo) => setNome(campo.target.value)} placeholder='Novo nome'></input>
                            </div>
                            <div className="box-Form">
                                <label>Novo email:</label>
                                <input className='InputPerfil' type="email" name="Email" value={email} onChange={(campo) => setEmail(campo.target.value)} placeholder='Novo email'></input>
                            </div>
                            <div className="box-Form">
                                <label>Nova Senha</label>
                                <input className='InputPerfil' type="password" name="password" value={senha} onChange={(campo) => setSenha(campo.target.value)} placeholder='Nova Senha'></input>
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