import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Firebase
import * as firebase from '../../init-firebase.js';

// importar acciones
import { setUsuario, setInicioSesion } from '../../actions/actions';

// Cargar Paginas 

import { RegistroLink } from './Registro.jsx';
import { OlvidoClaveLink } from './Olvido-clave.jsx';

import styled from 'styled-components'

/* Style InicioSesion */
const FormIniciarSesion = styled.div`
    text-align: center;
    box-sizing: border-box;
    display: block;
`;

const Invitado = styled.div`
    grid-template-columns: minmax(auto, 405px);
    background-color: #fff;
    width: 376px;
    margin: 0 auto;
    -webkit-box-shadow: 0 1px 8px 0 rgba(0,0,0,0.08);
    box-shadow: 0 1px 8px 0 rgba(0,0,0,0.08)
`;

const IniciarSesionVisor = styled.div`
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    color: #1c3643;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
`;

const IniciarSesionConEmail = styled.form`
    width: 82%;
    padding: 24px 32px 0px 32px;
    display: block;
    margin-bottom: 12px;
    text-align: center;
    overflow: hidden;
    margin: 1rem auto;
`;

const FormInput = styled.div`

    .input{
    border: 1px solid #c9c9c9;
    padding: 20px 12px;
    font - size: 1rem;
    -webkit - border - radius: 0.25rem;
    border - radius: 0.25rem;
    -webkit - transition: 0.2s border - color;   
    transition: 0.2s border - color;
    background - color: #fff;
    }    
`;

const BtnIniciar = styled.div`
    background: -webkit - linear - gradient(right, #95ca3e 0 %, #95ca3e 50 %, #85c638 100 %);  
    -webkit-box-shadow: 0 1px 1px 0 #58902d;
    box-shadow: 0 1px 1px 0 #58902d;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    padding: 8px 0.8em 6px 0.8em;
    transition: 0.2s;
    vertical-align: middle;
`;


const FooterRegistro = styled.div`
    
`;

 /* .catch (({ error }) => {
    // Handle Errors here.
     var errorCode = error.code;
     var errormensaje = error.mensaje;
    // The email of the usuario's account used.
     var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
     var credential = error.credential;
    // ...
})*/

const ERROR_EMAIL_ACCOUNT_DOSENT_EXISTS =
    'la dirección de correo electrónico que ha ingresado no existe en los registros';

const ERROR_CLAVE_ISNT_CORRECT = `
  La contraseña con que intenta acceder a esta cuenta no concuerda con su Usuario.`;

const ESTADO_REPOSO = {
    date: 'newDate',
    email: 'email',
    clave: 'clave',
};

class PaginaInicioSesion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtEmail : document.getElementById('txtEmail'),
            txtClave: document.getElementById('txtClave'),
            error: null,
        }               
        this.btnRegistro = this.btnRegistro.bind(this);
        this.onCambios = this.onCambios.bind(this);
        this.onEnviar = this.onEnviar.bind(this);       
    }
        
    onCambios = ('editando', (event) => {
        // Get Email Clave
        const target = event.target;
        const value = target.value;     
        // El evento altera los datos guardados 
        this.setState({
            [nombre]: value
        });
        console.log(this.state, 'Escribiendo ...');
    }); 

    // Evento Iniciar Sesion       
    onEnviar = ('inicio sesion', (event) => {
        //Previene que el formulario recargue la pagina
        event.preventDefault(); 
        console.log(this.state, 'Enviando la data ...');
        alert('Se envio correctamente su solicitud: ' + this.state.value);        

        this.props.firebase
            .doInicioSesionConEmailClave(email, clave)

            .then(() => {
                this.setState({ ...ESTADO_REPOSO });
                this.props.history.push('/');
            })
            .catch(error => {
                if (error.clave === ERROR_CLAVE_ISNT_CORRECT) {
                    error.correo = ERROR_EMAIL_ACCOUNT_DOSENT_EXISTS;
                }

                this.setState({ error });
            });
        
        const form = new FormData(event.target);
        const newDate = new Date().toISOString();
        // const [fotoPerfil, setFotoPerfil] = usestate('');
        const usuario = {                        
            'date': newDate,
            'email': form.get('email'),
            'clave': form.get('clave'),
            'usuarioContacto': this.props.usuario.email,
            'usuarioClave': this.props.usuario.clave,
        }

        this.props.firebase.database.ref('Usuarios').push(usuario)
            .then(response => console.log(response))
            .catch(error=> console.log(error))
    });    

    // Evento de Registro
    btnRegistro = ('click', (event) => {
        event.preventDefault(); 
        this.props.history.push('/registro')
        promise.catch(e => console.log(e.mensaje));
    });

    //<!--  -->
    render() {

        const { email, clave, error } = this.state;

        const isInvalid = clave === '' || email === '';

        return (
            <FormIniciarSesion>
                <header id="header">
                    <div class="Header-container u-wrapper u-clearfix">
                        <span class="LoginDivider-text"
                            data-reactid="1">
                            <span
                                data-reactid="2"
                            >o</span>
                        </span>
                    </div>
                </header>
                <IniciarSesionVisor>

                    <Invitado
                        data-reactroot=""
                        data-reactid="3"
                        data-react-checksum="15">
                        <div className="Loginv2-container"
                            data-reactid="4">                            

                            <IniciarSesionConEmail
                                data-reactid="5"
                                onSubmit={this.onEnviar}
                                action="/inicioSesion/?next="
                                method="post"
                            >
                                <input type="hidden"
                                    name="csrfmiddlewaretoken"
                                    value=""
                                    data-reactid="7"
                                />

                                <FormInput
                                    data-reactid="8">
                                    <input type="email"
                                        name="email"
                                        required=""
                                        autocomplete="off"
                                        placeholder="Tu email"
                                        className="FormInput-field"
                                        value=""
                                        Id="txtEmail"
                                        onChange={this.onCambios}
                                        data-reactid="9" />
                                    <label className="FormInput-label"
                                        data-reactid="10">
                                        <span data-reactid="11"
                                        >Tu email</span>
                                    </label>
                                    <p className="FormInput-error"
                                        data-reactid="12">
                                    </p>
                                </FormInput>

                                <FormInput
                                    data-reactid="13">
                                    <input type="password"
                                        name="clave"
                                        required=""
                                        autocomplete="off"
                                        placeholder="Tu contraseña"
                                        className="FormInput-field"
                                        value=""
                                        Id="txtclave"
                                        onChange={this.onCambios}
                                        data-reactid="14" />
                                    <label className="FormInput-label"
                                        data-reactid="15">
                                        <span data-reactid="16"
                                        >Tu contraseña</span>
                                    </label><p className="FormInput-error"
                                        data-reactid="17">
                                    </p>
                                </FormInput>

                                <BtnIniciar data-reactid="18"
                                    disabled={isInvalid}
                                    type="submit"
                                    onSubmit={this.onEnviar}
                                >
                                    <span data-reactid="19"
                                        Id="btnIniciarSesion"
                                    >Inicia sesión</span>
                                </BtnIniciar>

                                <div className="IniciarSesionConEmail-lostclave"
                                    data-reactid="20">
                                    <a href="/olvidoClave"
                                        data-reactid="21">
                                        <span data-reactid="22">
                                            ¿Olvidaste tu contraseña?
                                        </span> <OlvidoClaveLink />
                                    </a>
                                </div>
                                    
                                {error && <p>{error.mensaje}</p>}

                            </IniciarSesionConEmail>
                            

                            <FooterRegistro data-reactid="23">
                                <div class="AccountFooter-create"
                                    data-reactid="24">
                                    <span data-reactid="25"
                                    >¿Aún no tienes cuenta?, Crea una nueva
                                        </span> 
                                </div>

                                <div class="AccountFooter-link"
                                    data-reactid="26">
                                    <a href='/registro'
                                        className="AccountFooter-btn"
                                        Id="btnRegistro"                                        
                                        component={NavLink}
                                        to="/registro"
                                        data-reactid="27">
                                        <span data-reactid="28"
                                        >Regístrate
                                    </span> <RegistroLink />
                                    </a>
                                </div>
                            </FooterRegistro>

                        </div>
                    </Invitado>
                </IniciarSesionVisor>
            </FormIniciarSesion>
        )
    };
}

const mapDispatchToProps = {
    setUsuario,
    setInicioSesion,
}

const FormInicioSesion =
    withRouter((PaginaInicioSesion)
    );

export default connect(null, mapDispatchToProps)(PaginaInicioSesion);

const RegistroLink = () => (
    <p>
        No tiene aun una cuenta?
       <NavLink to="/registro"> Registrase</NavLink>
    </p>
);

export { FormInicioSesion, RegistroLink };