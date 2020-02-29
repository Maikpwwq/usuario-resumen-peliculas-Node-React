var _ = require('lodash');

function DescripcionPelicula(titulo, descripcion, a�o) {
  _.extend(this, {
      peliculas: peliculas.psicologicas.map(function (c) {
          return {
              titulo: c[0],
              descripcion: descripcion,
              a�o: a�o
          };
    })
  });
}

module.exports = DescripcionPelicula;
