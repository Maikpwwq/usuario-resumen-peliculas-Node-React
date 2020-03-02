var _ = require('lodash');

function DescripcionPelicula(_node, titulo, descripcion, a�o) {
    _.extend(this, _node.properties); {
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