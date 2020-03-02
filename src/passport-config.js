const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUsuarioByCorreo, getUsuarioById) {
    const autorizarUsuario = async (correo, clave, done) => {
        const usuario = getUsuarioByCorreo(correo)
        if (user == null) {
            return done(null, false, { mesnsaje: 'No existen usuarios con esa cuenta de correo' })
        }

        try {
            if (await bcrypt.compare(clave, usuario.clave)) {
                return done(null, usuario)
            } else {
                return done(null, false, { message: 'Clave incorrecta' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'correo'
    }, autorizarUsuario))

    passport.serializeUser((usuario, done) =>
        done(null, usuario.id))

    passport.deserializeUser((id, done) => {
        return done(null, getUsuarioById(id))
    })    
}

module.exports = initialize