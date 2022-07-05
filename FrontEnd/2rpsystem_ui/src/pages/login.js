import React from "react";
import '../assets/css/Login.css'
import Header from "../components/header";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className='body-login'>

                    <section className='container-login'>
                        <div className='box-login'>
                            <h1>Login</h1>
                            <form className='FormLogin'>

                                <input
                                    className='InputLogin'
                                    type="text"
                                    name="Email"
                                    placeholder='Email'
                                ></input>

                                <input
                                    className='InputLogin'
                                    type="password"
                                    name="password"
                                    placeholder='Senha'
                                ></input>

                                <input type="submit" className="SubmitLogin" value="Entrar"></input>

                            </form>
                        </div>
                    </section>

                </div>
            </div>
        )
    }
}

export default Login;