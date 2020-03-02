import DescripcionPelicula from './peliculas/descripcionPelicula';

function ListadoPeliculas({ Peliculas }) {

    const { _id, index, titulo, descripcion, año } = Pelicula

    const [pelicula, setPelicula] = useState((EstadoInicial) => {
        const EstadoInicial = data.Peliculas[0];
        return EstadoInicial;
    }, [props.Productos]);

    key = {`Carrusel-${index}`
};
{
    Peliculas && Peliculas.map((Pelicula, index) => (
        <NavLink to={{
            pathname: `/peliculas/${index}-${Pelicula.name}`,
            estado: { ...Peliculas }
        }}>
            <FichaPeliculas
                Pelicula={Pelicula}

                key={`Pelicula-${index}`}
                id={`Pelicula-${_id}`}
            /> No Producto Actual: {Pelicula.index}
        </NavLink>
    ))
}


<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title> Lista de peliculas</title>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />
    <link rel="stylesheet" href="../../styles/site.css" />
</head>
<body>

    <div class="container">
        <div class="text-center" 
             ng-app="moviesApp" 
             ng-controller="MoviesCtrl">

            <h1> Listado de Peliculas</h1>
            <div class="col-md-12 control-group">
                <input type="text" 
                       style="width: 200px;" 
                       ng-model="newMovieText" />

                <button id="btnAddTodo" 
                        class="btn" 
                        style="margin: 2px;" 
                        ng-click="addMovie()" 
                        ng-disabled="!newMovieText">
                Add Movie</button>
            </div>

            <div class="col-md-5 sticky-note">
                <h3 class="text-center">Released Movies</h3>
                <div class="col-md-5 rowmargin todoItem" 
                     ng-repeat="movie in movies | filter:{released:true}">
                    <div class="thumbnail">
                        <input type="checkbox" 
                               ng-model="movie.watched" 
                               ng-change="movieWatched(movie)" />
                        &nbsp;
                        <span ng-class="{watchedMovie: movie.watched}">
                        {{movie.name}}</span>
                    </div>
                </div>
            </div>

            <div class="col-md-5 sticky-note">
                <h3 class="text-center">Coming Up...</h3>
                <div class="col-md-5 rowmargin todoItem" 
                     ng-repeat="movie in movies | filter:{released:false}">
                    <div class="thumbnail">
                        {{movie.name}}
                        <br />
                        <br />
                        <input type="button" 
                               value="Released!" 
                               class="btn btn-link released-button" 
                               ng-click="movieReleased(movie)" 
                               style="" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.js"></script>
    <script src="../movie.js"></script>
</body>
</html>