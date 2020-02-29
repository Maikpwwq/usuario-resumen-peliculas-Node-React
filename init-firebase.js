import React, { Component } from 'react';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as app from "firebase/app";

// Add the Firebase products that you want to use
import * as auth from "firebase/auth";
import * as database from "firebase/database";
import * as storage from "firebase/storage";    

// Initialize Firebase
// TODO: Replace the following with your app's Firebase project configuration

const firebaseConfig = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

/* const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};*/

class Firebase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: null,
            error: null
        };

        // Initialize Firebase
        app.initializeApp({
            credential: app.credential.cert((firebaseConfig)),
            databaseURL: 'https://usuarios-resumen-peliculas.firebaseio.com/' // URL de nuestro proyecto
        });       

        // * this.serverValue = app.database.ServerValue;
        this.emailAuthProvider = new app.auth.EmailAuthProvider;

        /* Firebase APIs */
        this.auth = app.auth();
        this.db = app.database();
        this.firestore = app.firestore();
        this.storage = app.storage();
        this.auth = this.auth.bind(this);
        this.firestore = this.firestore.bind(this);       
        this.storage = this.storage.bind(this);
        this.db = this.database.bind(this);

        app.firestore.settings({
            timestampsInSnapshots: true
        });
    };  

    // Lenguaje del OAuth
    lenguaje = () => {
        app.auth().languageCode = 'es'
    };
        
    root = document.getElementById('root');

    dbRef = app.database().ref().child('text');
   

    // *** Auth API ***
    async register (name, email, clave) {
        await this.auth.crearUsuarioConEmailClave(email, clave)
        return this.auth.usuarioActual.actualizarPerfil({
            displayName: name
        })
    };

    doInicioSesion = (email, clave) => {
        return this.auth.inicioSesionConEmailClave(email, clave)
    };

    doCrearUsuarioConEmailClave = (email, clave) =>
        this.auth.crearUsuarioConEmailClave(email, clave);

    doInicioSesionConEmailClave = (email, clave) =>
        this.auth.inicioSesionConEmailClave(email, clave);

    doRegistraConEmailClave = (email, clave) =>
        this.auth.registroConEmailClave(email, clave);

    doCerrarSesion = () => { return this.auth.cerrarSesion() };

    async cerrarSesion() {
        await this.auth.cerrarSesion()
        this.props.history.push('/')
    };

    doCambioClave = (email) => this.auth.envioEmailCambioClave(email);

    doOlvidoClave = (email) => this.auth.envioEmailOlvidoClave(email);

    doActualizarClave = (clave) =>
        this.auth.usuarioActual.actualizarClave(clave);

    doEnviarEmailVerificacion = () =>
        this.auth.usuarioActual.envioEmailVerificacion({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        });
        
    // *** Notas o mensajes de usuario API ***

    addNota = (nota) => {
        if (!this.auth.usuarioActual) {
            return alert('No está autorizado')
        };

        return this.firestore.doc(`usuarios_codedamn_video/${this.auth.usuarioActual.uid}`).set({
            nota
        });
    };

    async getActualNotaUsuario () {
        const nota = await this.firestore.doc(`usuarios_codedamn_video/${this.auth.usuarioActual.uid}`).get()
        return nota.get('nota')
    };   

    // *** Propiedades de usuario API ***

    getUsuarioActualname = () => {
        return this.auth.usuarioActual && this.auth.usuarioActual.displayName;
    };

    isCorriendo = () => {
        return new Promise(resolve => {
            this.auth.onCambioEstadoAutorizacion(resolve);
        });
    };

    // *** Merge Auth and DB usuario API *** //
    onAutorizarUsuarioListener = (next, fallback) =>
        this.auth.onCambioEstadoAutorizacion (autorizarUsuario => {

            if (autorizarUsuario) {
                this.usuario(autorizarUsuario.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUsuario = snapshot.val();
                        // default empty roles
                        if (!dbUsuario.roles) {
                            dbUsuario.roles = {};
                        }
                        // merge auth and db usuario
                        autorizarUsuario = {
                            uid: autorizarUsuario.uid,
                            email: autorizarUsuario.email,
                            emailVerificado: autorizarUsuario.emailVerificado,
                            providerData: autorizarUsuario.providerData,
                            ...dbUsuario,
                        };
                        next(autorizarUsuario);
                    });
            }

            else {
                fallback();
            }
        });

    // *** usuarios API ***
    usuario = uid => this.db.ref(`usuarios/${uid}`);
    usuarios = () => this.db.ref('usuarios');
}

export default new Firebase();

export { storage, database, auth };