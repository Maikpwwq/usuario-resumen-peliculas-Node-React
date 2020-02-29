// autorizarUsuario
export const autorizarUsuario = payload => ({
    type: 'SET_AUTORIZAR_USUARIO',
    payload
});

export const setUsuario = payload => ({
    type: 'SET_USUARIO',
    payload
});

export const setFirebaseInitialized = payload => ({
    type: 'SET_INICIO_FIREBASE',
    payload
});

export const setInicioSesion = payload => ({
    type: 'SET_INICIO_SESION',
    payload
});