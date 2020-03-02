//  Consultar datos de las personas en la base de datos
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { getSecret } = require('../config');
const http = require('http');

//
import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
// En este archivo se cargan variables de entorno del usuario Firebase y se crean rutas a cada una de las paginas 
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// importar Propiedades usuario  
import { setUsuario, setInicioSesion } from './acciones.jsx';
// importar Registro por Firebase
import useFirebaseUsuario from '../useFirebaseUsuario';

// DB cargue de la data
import useGetData from '../useGetData';

//
const app = express();
app.enable('trust proxy');
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnInitializad: false
});
app.use(passport.initialize());
app.use(passport.session());

//
const port = process.env.PORT || 3000;

app.listen(port, () => {
    // submit(e => { e.preventDefault();
    console.log(`Servidor en servicio en puerto ${port}`);
});

//
const server = http.createServer(app);

server.listen(portfunction, () => {
    let puerto = server.address().port;
    console.log("Server started at http://localhost:%s", puerto);
});

server.on('error', onError);
server.on('listening', onListening);

// handle specific listen errors with friendly messages
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requiere privigilegios de administrador');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' ya se encuentra en uso');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event.

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Escuchando en el puerto' + bind);
}

// Rutas
// Get rutas
router.get('/', checkAutentificacion, (req, res) => {
        res.render('app.js', { name: req.user.name });
    });

email => users.find(user.email === email),
    id => users.find(user.id === id),

    router.get('/inicioSesion', (req, res) => {
        res.render('inicioSesion.js');
    });

router.post('/inicioSesion', passport.authenticate('local', {
    correcto: '/',
    incorrecto: '/inicioSesion',
    falloFlash: true
}))

// Get uno 


// Creando uno


// Actualizando uno
router.patch('/:id', (req, res) => {

});

app.delete('/CerrarSesion', (req, res) => {
    req.cerrarSesion();
    res.redirect('/');
});

router.post('/registro', passport.authenticate, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.doby.email,
            password: hashedPassword
        })
        res.redirect('/inicioSesion')
    } catch {
        res.redirect('/registro')
    }
});

function checkAutentificacion(req, res, next) {
    if (req.estaAutentificado()) {
        return next();
    }
    res.redirect('/iniciarSesion');
};

function checkNoAutentificacion(req, res, next) {
    if (req.estaAutentificado()) {
        return next()
    }
    res.redirect('/iniciarSesion')
};

//
class App extends Component {

    constructor(props) {
        super(props);

        this.estado = {

        };
        // Llamado al Hook de Asignacion id: usuario por Firebase
        this.FirebaseUsuario = useFirebaseUsuario();
        // Llamado al Hook importar datos de firebase     
        this.data = this.data.bind(this);
        this.FirebaseUsuario = this.FirebaseUsuario.bind(this);
    };

    data = useGetData();

    // Niveles de acceso segun rutas del buscador    
    render() {

        return (
            this.FirebaseUsuario !== false ? (
                this.data.length === 0 ?
                    (
                        <h1> Cargando ...</h1>
                    ) : (
                        <div className="App">

                            <div>
                                <div id="graph">
                                </div>

                                <div role="navigation" class="navbar navbar-default navbar-static-top">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm-6 col-md-6">
                                                <ul class="nav navbar-nav">
                                                    <li>
                                                        <form role="search" class="navbar-form" id="search">
                                                            <div class="form-group">
                                                                <input type="text"
                                                                    value="Matrix"
                                                                    placeholder="Search for Movie Title"
                                                                    class="form-control"
                                                                    name="search"/>
                                                            </div>
                                                                <button class="btn btn-default"
                                                                    type="submit">
                                                                    Listar
                                                                </button>
                                                        </form>
                                                    </li>

                                                </ul>
                                            </div>
                                            <div class="navbar-header col-sm-6 col-md-6">
                                                <div class="logo-well">
                                                    <a href="">
                                                        <img src=""
                                                            alt="Leading Graph Database"
                                                            id="logo"/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">

                                    <div class="col-md-5">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                Buscar Resultados
                                            </div>
                                            <table id="results" class="table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Titulos</th>
                                                        <th>Descripcion</th>
                                                        <th>Ano</th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                            <form role="form" action="/moviesDescription" method="get">
                                                <select id="peliculas" name="peliculas" size="10" multiple>
                                                    <option value="">
                                                        <input type="radio"
                                                            id=""
                                                            name=""
                                                            value=""
                                                            style="" />
                                                    </option>
                                                </select>
                                                <button type="submit" onclick="" />
                                            </form>

                                        </div>
                                    </div>

                                    <div class="col-md-7">
                                        <div class="panel panel-default">
                                            <div class="panel-heading"
                                                id="title">
                                                Detalles
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4 col-md-4">
                                                    <img src=""
                                                        class="well"
                                                        id="poster" />
                                                </div>
                                                <div class="col-md-8 col-sm-8">
                                                    <h4>Crew</h4>
                                                    <ul id="crew"></ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                    <div id="loader">
                        <CircularProgress />
                    </div>
                ));
    };
}

module.exports = { app };                            