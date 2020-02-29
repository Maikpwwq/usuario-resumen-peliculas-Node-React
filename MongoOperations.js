var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/peliculasDb');
var db = mongoose.connection;

var movieSchema = mongoose.Schema({
    titulo: String,
    descripcion: String,
    año: Number,
});
var MovieModel = mongoose.model('pelicula', movieSchema);

db.on('error', console.error.bind(console, "error de conexion "));
db.once('Abrir', function () {
    console.log("Db de Peliculas esta en uso...");

    MovieModel.find().exec(function (error, results) {
        if (results.length === 0) {
            MovieModel.create({ name: "The Amazing Spider-Man 2"});
            MovieModel.create({ name: "The Other Woman"});
            MovieModel.create({ name: "Shaadi ke Side Effects"});
            MovieModel.create({ name: "Walk of Shame"});
            MovieModel.create({ name: "Lucky Kabootar"});
        }
    });
});

exports.fetch = function (req, res) {
    console.log("Recuperando Descripciones....");
    MovieModel.find().exec(function (err, res) {
        if (err) {
            res.send(500, { error: err });
        }
        else {
            res.send(res);
        }
    });
};

exports.add = function (req, res) {

    var newMovie = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        año: req.body.año
    };

    MovieModel.create(newMovie, function (addError, addedMovie) {
        if (addError) {
            res.send(500, { error: addError });
        }
        else {
            res.send({ success: true, movie: addedMovie });
        }
    });        
};


exports.modify = function (req, res) {
    var movieId = req.params.movieId;
    MovieModel.update({ _id: movieId }, { descripcion: req.body.descripcion, año: req.body.año}, { multi: false },
        function (error, rowsAffected) {
            if (error) {
                res.send(500, { error: error });
            }
            else if (rowsAffected === 0) {
                res.send(500, { error: "No se afecto la informacion almacenada" });
            }
            else {
                res.send(200);
            }
        }
    );
};