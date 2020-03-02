var app = angular.module('moviesApp', []);

// Peliculas acciones

$(function () {
    renderGraph();
    search();

    $("#search").submit(e => {
        e.preventDefault();
        search();
    });
});

function showMovie(titulo) {
    api
        .getMovie(titulo)
        .then(movie => {
            if (!movie) return;

            $("#title").text(movie.titulo);
            $("#poster").attr("src", "http://neo4j-contrib.github.io/developer-resources/language-guides/assets/posters/" + movie.title + ".jpg");
            var $list = $("#crew").empty();
            movie.cast.forEach(cast => {
                $list.append($("<li>" + cast.name + " " + cast.job + (cast.job == "acted" ? " as " + cast.role : "") + "</li>"));
            });
        }, "json");
}

function search() {
    var query = $("#search").find("input[name=search]").val();
    api
        .searchMovies(query)
        .then(movies => {
            var t = $("table#results tbody").empty();

            if (movies) {
                movies.forEach(movie => {
                    $("<tr><td class='movie'>" + movie.title + "</td><td>" + movie.released + "</td><td>" + movie.tagline + "</td></tr>").appendTo(t)
                        .click(function () {
                            showMovie($(this).find("td.movie").text());
                        })
                });

                var first = movies[0];
                if (first) {
                    showMovie(first.title);
                }
            }
        });
}

function renderGraph() {
    var width = 800, height = 800;
    var force = d3.layout.force()
        .charge(-200).linkDistance(30).size([width, height]);

    var svg = d3.select("#graph").append("svg")
        .attr("width", "100%").attr("height", "100%")
        .attr("pointer-events", "all");

    api
        .getGraph()
        .then(graph => {
            force.nodes(graph.nodes).links(graph.links).start();

            var link = svg.selectAll(".link")
                .data(graph.links).enter()
                .append("line").attr("class", "link");

            var node = svg.selectAll(".node")
                .data(graph.nodes).enter()
                .append("circle")
                .attr("class", d => {
                    return "node " + d.label
                })
                .attr("r", 10)
                .call(force.drag);

            // html title attribute
            node.append("title")
                .text(d => {
                    return d.title;
                });

            // force feed algo ticks
            force.on("tick", () => {
                link.attr("x1", d => {
                    return d.source.x;
                }).attr("y1", d => {
                    return d.source.y;
                }).attr("x2", d => {
                    return d.target.x;
                }).attr("y2", d => {
                    return d.target.y;
                });

                node.attr("cx", d => {
                    return d.x;
                }).attr("cy", d => {
                    return d.y;
                });
            });
        });
}

app.factory('moviesCRUD', function ($http, $q) {
    var baseurl = "/NodeMovieList/";
    function getAllMovies() {
        var deferred = $q.defer();

        $http.get(baseurl+'api/movies').then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function addMovie(newMovie) {
        var deferred = $q.defer();

        $http.post(baseurl + 'api/movies', newMovie).then(function (result) {
            deferred.resolve(result.data.movie);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function modifyMovie(updatedMovie) {
        var deferred = $q.defer();

        $http.put(baseurl + 'api/movies/' + updatedMovie._id, updatedMovie).then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    return {
        getAllMovies: getAllMovies,
        addMovie: addMovie,
        modifyMovie: modifyMovie
    };
});

app.controller('MoviesCtrl', function ($scope, moviesCRUD) {
    $scope.released = { released: true };
    $scope.notReleased = { released: false };
    
    function init() {
        moviesCRUD.getAllMovies().then(function (movies) {
            $scope.movies = movies;
        }, function (error) {
            console.log(error);
        });        
    }

    $scope.movieReleased = function (movie) {

        moviesCRUD.modifyMovie({ _id: movie._id, name: movie.name, released: true, watched: movie.watched })
                  .then(function (result) {
                      if (result.status === 200) {
                          movie.released = true;
                      }
                  }, function (error) {
                      console.log(error);
                  });        
    };

    $scope.movieWatched = function (movie) {
        moviesCRUD.modifyMovie(movie)
                  .then(function (result) {
                      if (result.status === 200) {
                          console.log("Movie updated");
                      }
                  }, function (error) {
                      movie.watched = !movie.watched;
                  });        
    };

    $scope.addMovie = function () {
        moviesCRUD.addMovie({ name: $scope.newMovieText }).then(function (newMovie) {
            $scope.movies.push(newMovie);
            $scope.newMovieText = "";
        }, function (error) {
            console.log(error);
        });        
    };

    init();
});