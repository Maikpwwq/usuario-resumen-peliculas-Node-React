//  Consultar datos de las personas en la base de datos
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
//const session = require('./cuenta-usuario/session'); 
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

//
import ListadoPeliculas from './peliculas/listadoPeliculas';
import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
// En este archivo se cargan variables de entorno del usuario Firebase y se crean rutas a cada una de las paginas 
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// importar Registro por Firebase
import useFirebaseUsuario from '../useFirebaseUsuario';

// DB cargue de la data
import useGetData from './useGetData';

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


const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

const users = [];

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnInitializad: false
});
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))

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
/*
        email => users.find(user.email === email),
        id => users.find(user.id === id),
 */
// Get rutas
router.get('/', checkAutentificacion, (req, res) => {
        res.render('index.jsx', { name: req.user.name });
    });

router.get('/inicioSesion', checkNoAutentificacion, (req, res) => {
    res.render('inicioSesion.jsx');
});

app.get('/listadoPeliculas', function (req, res) {
    res.sendfile("./listaPeliculas.html");
});

app.get('/ListadoPeliculas/api/movies', mongoOps.fetch);
app.post('/ListadoPeliculas/api/movies', mongoOps.add);
app.put('/ListadoPeliculas/api/movies/:movieId', mongoOps.modify);
app.use('/ListadoPeliculas', express.static(path.join(__dirname, 'public')));


router.post('/inicioSesion', checkNoAutentificacion, passport.authenticate('local', {
    correcto: '/',
    incorrecto: '/inicioSesion',
    falloFlash: true
}));

router.get('/registro', checkNotAuthenticated, (req, res) => {
    res.render('registro.jsx')
});

router.post('/registro', checkNoAutentificacion, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        usuarios.push({
            id: Date.now().toString(),
            nombre: req.body.nombre,
            correo: req.body.correo,
            clave: hashedPassword
        })
        res.redirect('/inicioSesion')
    } catch {
        res.redirect('/registro')
    }
});

// Get uno 
router.get('/:id', checkAutentificacion, (req, res) => {
    res.render();
});

// Creando uno

// Actualizando uno
router.patch('/:id', (req, res) => {

});

// 
router.delete('/CerrarSesion', (req, res) => {
    req.cerrarSesion();
    res.redirect('/inicioSesion');
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
        data = useGetData();
        FirebaseUsuario = useFirebaseUsuario();
        this.data = this.data.bind(this);
        this.FirebaseUsuario = this.FirebaseUsuario.bind(this);
    };
    // Llamado al Hook de Asignacion id: usuario por Firebase
    // Llamado al Hook importar datos de firebase     
    // Buscador por titulos de peliculas
    onListar


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

                                <form action="/cerrarSesion?_method=DELETE" method="POST">
                                    <button type="submit">Cerrar Sesion</button>
                                </form>

                                <div role="navigation" class="navbar navbar-default navbar-static-top">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm-9 col-md-9">
                                                <ul class="nav navbar-nav">
                                                    <li>
                                                        <form role="search" class="navbar-form" id="search">
                                                            <div class="form-group">
                                                                <input type="text"
                                                                    value="Buscar por titulo"
                                                                    placeholder="Buscar una pelicula por titulo"
                                                                    class="form-control"
                                                                    name="search"/>
                                                            </div>
                                                            <button class="btn btn-default"
                                                                onClick="onListar"
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

                                    <div class="col-md-9">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                Buscar Resultados
                                            </div>
                                            <table id="results"
                                                class="table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Titulos</th>                                                        
                                                    </tr>
                                                </thead>
                                                <br/>
                                                <tbody>
                                                </tbody>
                                            </table>

                                            <ListadoPeliculas Peliculas={data.peliculas} />

                                            <form role="form" action="/descripcionPelicula" method="get">
                                                <select id="peliculas" name="peliculas" size="10" multiple>

                                                    <option value="XXX">
                                                        <input type="radio"
                                                            id=""
                                                            name=""
                                                            value=""
                                                            style="" />
                                                    </option>
                                                </select>
                                                <button type="submit"
                                                    onclick=""> Resumenes
                                                </button>
                                            </form>

                                        </div>
                                    </div>
                                    <br/>
                                    <div class="col-md-7">
                                        <div class="panel panel-default">

                                            <div class="panel-heading"
                                                id={id}>
                                                Tu consulta
                                            </div>

                                            <div class="row">
                                                <div class="col-sm-4 col-md-4">
                                                    <img src=""
                                                        class="well"
                                                        id="poster" />
                                                </div>
                                                <div class="col-md-8 col-sm-8">
                                                    <h4>Titulo</h4>
                                                    <ul id={titulo}></ul>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )) : (
                    <div id="loader">
                        <CircularProgress />
                    </div>
                ));
    };
}

module.exports = { app };               