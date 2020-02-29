var _ = require('lodash');

function DescripcionPelicula(titulo, descripcion, año) {
  _.extend(this, {
      peliculas: peliculas.psicologicas.map(function (c) {
          return {
              titulo: c[0],
              descripcion: descripcion,
              año: año
          };
    })
  });
}

module.exports = DescripcionPelicula;
