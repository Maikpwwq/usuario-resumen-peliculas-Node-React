import { useState, useEffect } from 'react';
import * as firebase from '../init-firebase.js';

/*var firebase = require('firebase-init')
firebase(function (error, initializedFirebaseReference) {
    if (error) throw error;
    else 
    // start using initializedFirebaseReference
})*/

// importar Propiedades usuario  
import { setUsuario, setInicioSesion} from './acciones.jsx';

const useFirebaseUsuario = () => {

    // Asignar propiedades de inicio de sesion id: usuario registrados por Firebase

    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

    useEffect(() => {
        firebase.isCorriendo().then(val => {
            setFirebaseInitialized(val);
        });
    }, []);

    useEffect(() => {
        firebase().onCambioEstadoAutentificacion((usuario) => {
            if (usuario) {
                this.props.setUsuario(usuario);
                this.props.setInicioSesion(true);
                console.log('Usuario')
            } else {
                console.log('Sin iniciar sesión aun');
            }
        });
    }, []);

    return firebaseInitialized;
}; 

// Asignar propiedades de inicio de sesion
const mapDispatchToProps = {
    setUsuario,
    setInicioSesion
};

export default connect(null, mapDispatchToProps)(useFirebaseUsuario);