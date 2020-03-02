var _ = require('lodash');

function DescripcionPelicula(_node, titulo, descripcion, año) {
    _.extend(this, _node.properties); {
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