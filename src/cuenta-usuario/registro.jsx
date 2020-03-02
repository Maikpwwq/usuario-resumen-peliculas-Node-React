import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// importar acciones
import { setUsuario, setInicioSesion } from '../acciones.jsx';

// importar firebase 
import * as firebase from '../../init-firebase.js';

/* Style Registro */
import styled from 'styled-components'

const Registro = styled.div`
    text-align: center;
    box-sizing: border-box;
    display: block;
`;

const HeaderMenu = styled.div`
    background: linear-gradient(to right, #1c3643 0%, #273b47 25%, #1e5372 100%);
    padding: 0 15px;
    position: relative;
    z-index: 2;
`;

const Invitado = styled.div`
    grid-template-columns: minmax(auto, 405px);
    background-color: #fff;
    width: 376px;
    margin: 0 auto;
    -webkit-box-shadow: 0 1px 8px 0 rgba(0,0,0,0.08);
    box-shadow: 0 1px 8px 0 rgba(0,0,0,0.08)
`;

const RegistroVista = styled.div`
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    color: #1c3643;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
`;

const RegistroConEmail = styled.form`
    
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

const BtnRegistro = styled.div`
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


const FooterInicioSesion = styled.div`
    
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

const ERROR_CODE_ACCOUNT_EXISTS =
    'la-cuenta-existe-con-diferentes-credenciales';

const ERROR_MSG_ACCOUNT_EXISTS = `
  Una cuenta con una dirección de correo electrónico para
  este perfil social ya existe. Intente iniciar sesión desde
  esta cuenta y asociar sus cuentas en su página de perfil.
`;

const ESTADO_REPOSO = {
    date: 'newDate',
    nombre: 'nombre',
    email: 'email',
    telefono: 'telefono',
    clave: 'clave',
    confirmarClave: 'confirmarClave'    
};

class PaginaRegistro extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nombre : document.getElementById('txtNombre'),
            email : document.getElementById('txtEmail'),
            telefono: document.getElementById('txtTelefono'),
            clave: document.getElementById('txtClave'),
            confirmarClave: document.getElementById('txtConfirmarClave'),           
            fotoPerfil: this.props.usuario.photoURL,
            usuarioContacto: this.props.usuario.email,
            usuarioNombre: this.props.usuario.nombreUsuario,
            error: null,
        }       
        this.onCambios = this.onCambios.bind(this);
        this.onEnviar = this.onEnviar.bind(this);      
        this.btnInicioSesion = this.btnInicioSesion.bind(this);   
    }

    onCambios = (event) => {
        // Guardar Cambios
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === "telefono") {
            if (!Numero(value)) {
                alert("Tu numero telefónico deben ser números");
            }
        }
        // El evento altera los datos guardados 
        this.setState({
            [name]: value
        });
        console.log(this.state, 'Escribiendo ...');
    };

    onEnviar = (event) => {
        //Previene que el formulario recargue la pagina
        event.preventDefault();
        console.log(this.state, 'Enviando la data ...');
        alert('Se envio correctamente su solicitud: ' + this.state.value);

        this.props.firebase
            .doCrearUsuarioConEmailClave(email, claveUno)
            .then((AutorizarUsuario) => {
                // Create a usuario in your Firebase realtime database
                return this.props.firebase.usuario(AutorizarUsuario.usuario.uid).set({
                    nombreUsuario: this.nombre,
                    email: this.email,
                    roles: null,
                });
            })

            .then(() => {
                this.setState({ ...ESTADO_REPOSO });
                this.props.history.push('/');
            })

            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.mensaje = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({ error });
            });

        const form = new FormData(event.target);
        const newDate = new Date().toISOString();
        
        const usuario = {
            'date': newDate,
            'nombre': form.get('nombre'),
            'email': form.get('email'),
            'telefono': form.get('telefono'),
            'clave': form.get('clave'),
            'confirmarClave': form.get('confirmarClave'),
        }

        this.props.firebase.database.ref('usuarios').push(usuario)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    };

    // Evento de Registro
    btnInicioSesion = ('click', (event) => {       
        event.preventDefault(); 
        this.props.history.replace('/inicioSesion')
        promise.catch(e => console.log(e.mensaje));
    });    

    render() {
        const isInvalid =
            claveUno !== claveDos ||
            claveUno === '' ||
            email === '' ||
            usuarioname === '';

        return (
            <Registro>
                <div class="Header-container u-wrapper u-clearfix">
                    <span class="LoginDivider-text"
                        data-reactid="1">
                        <span data-reactid="2"
                        >o</span>
                    </span>
                </div>                
                <RegistroVista>
                    <Invitado
                        data-reactroot=""
                        data-reactid="3"
                        data-react-checksum="4">

                        <div
                            className="Loginv2-container"
                            data-reactid="5">         
                            
                            <RegistroConEmail
                                onSubmit={this.onEnviar}
                                action="/inicioSesion/?next="
                                method="post"
                                data-reactid="6">

                                <form data-reactid="7">
                                    <input type="hidden"
                                        name="csrfmiddlewaretoken"
                                        value=""
                                        data-reactid="8" />

                                    <FormInput
                                        data-reactid="9">
                                        <input type="text"
                                            name="nombre" required=""
                                            id="txtNombre"
                                            autocomplete="off"
                                            placeholder="Ingresa tu nombre completo"
                                            className="FormInput-field"
                                            value=""
                                            onChange={this.onCambios}
                                            data-reactid="10" />
                                        <label class="FormInput-label"
                                            data-reactid="11">
                                            <span data-reactid="21"
                                            >Tu nombre</span>
                                        </label>
                                        <p className="FormInput-error"
                                            data-reactid="12">
                                        </p>
                                    </FormInput>

                                    <FormInput
                                        data-reactid="13">
                                        <input type="email"
                                            name="email" required=""
                                            id="txtEmail"
                                            autocomplete="off"
                                            placeholder="Tu email"
                                            className="FormInput-field"
                                            value=""
                                            onChange={this.onCambios}
                                            data-reactid="14" />
                                        <label class="FormInput-label"
                                            data-reactid="15">
                                            <span data-reactid="16"
                                            >Tu email</span>
                                        </label>
                                        <p className="FormInput-error"
                                            data-reactid="17">
                                        </p>
                                    </FormInput>

                                    <FormInput
                                        data-reactid="18">
                                        <input type="Numero"
                                            name="telefono" required=""
                                            id="txtTelefono"
                                            autocomplete="off"
                                            placeholder="Tu numero celular"
                                            className="FormInput-field"
                                            value=""
                                            onChange={this.onCambios}
                                            data-reactid="19" />
                                        <label class="FormInput-label"
                                            data-reactid="20">
                                            <span data-reactid="21"
                                            >Tu numero movil</span>
                                        </label>
                                        <p className="FormInput-error"
                                            data-reactid="22">
                                        </p>
                                    </FormInput>

                                    <FormInput
                                        data-reactid="13">
                                        <input type="password"
                                            name="clave"
                                            id="txtClave"
                                            required=""
                                            autocomplete="off"
                                            placeholder="Tu clave"
                                            className="FormInput-field"
                                            value=""
                                            onChange={this.onCambios}
                                            data-reactid="34" />
                                        <label className="FormInput-label"
                                            data-reactid="35">
                                            <span data-reactid="36"
                                            >Tu clave</span>
                                        </label><p className="FormInput-error"
                                            data-reactid="37">
                                        </p>
                                    </FormInput>

                                    <FormInput
                                        data-reactid="38">
                                        <input type="password"
                                            name="confirmarclave"
                                            id="txtConfirmarClave"
                                            required=""
                                            autocomplete="off"
                                            placeholder="Confirma tu clave"
                                            className="FormInput-field"
                                            value=""
                                            onChange={this.onCambios}
                                            data-reactid="39" />
                                        <label className="FormInput-label"
                                            data-reactid="40">
                                            <span data-reactid="41"
                                            > Repite Tu clave</span>
                                        </label><p className="FormInput-error"
                                            data-reactid="42">
                                        </p>
                                    </FormInput>

                                    <BtnRegistro
                                        data-reactid="43"
                                        disabled={isInvalid}
                                        type="submit"
                                        onClick={this.onEnviar}
                                    >
                                        <span data-reactid="44"
                                            id="btnRegistro"
                                            type="submit"
                                            onClick={this.onEnviar}
                                        >Registrarse</span>
                                    </BtnRegistro>

                                </form>

                                {error && <p>{error.mensaje}</p>}

                            </RegistroConEmail>

                            <FooterInicioSesion data-reactid="45">
                                <div class="AccountFooter-create"
                                    data-reactid="46">
                                    <span data-reactid="47"
                                    >¿Ya tienes una cuenta con nosotros?, accede a tu cuenta</span>
                                </div>
                                <div class="AccountFooter-link"
                                    data-reactid="48">
                                    <a href="/inicioSesion"
                                        component={NavLink}
                                        to="/inicioSesion"
                                        className="AccountFooter-btn"
                                        data-reactid="49">
                                        <span data-reactid="50"
                                        >Iniciar Sesion
                                    </span> <InicioSesionLink />
                                    </a>
                                </div>
                            </FooterInicioSesion>
                        </div>
                    </Invitado>
                </RegistroVista>
            </Registro>
    )};
};

const mapDispatchToProps = {
    setUsuario,
    setInicioSesion,
};

const FormRegistro =
    withRouter((PaginaRegistro)
);

export default connect(null, mapDispatchToProps)(PaginaRegistro);

const InicioSesionLink = () => (
    <p>
        Ya tiene una cuenta? 
       <NavLink to="/inicioSesion"> Iniciar Sesion </NavLink>
    </p>
);

export { FormRegistro, InicioSesionLink };