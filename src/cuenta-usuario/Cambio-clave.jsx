import React, { Component } from 'react';

import { firebase } from '../../init-firebase';

const ESTADO_REPOSO = {
    claveUno: '',
    claveDos: '',
    error: null,
};

class FormCambioClave extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { claveUno } = this.state;

        this.props.firebase
            .doActualizarClave(claveUno)
            .then(() => {
                this.setState({ ...ESTADO_REPOSO });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { claveUno, claveDos, error } = this.state;

        const isInvalid =
            claveUno !== claveDos || claveUno === '';

        return (
            <form onSubmit={this.onSubmit}>
                <label>Nueva Clave:</label>                
                <input
                    type="password"
                    name="claveUno"
                    value={claveUno}
                    onChange={this.onChange}                    
                    placeholder="Ingrese Nueva Clave"
                />
                <br/>
                <label>Confirme Nueva Clave:</label>
                <input
                    type="password"
                    name="claveDos"
                    value={claveDos}
                    onChange={this.onChange}
                    placeholder="Confirme la nueva clave"
                />
                <br/>
                <button disabled={isInvalid} type="submit">
                    Restablecer mi clave
                </button>
                <br/>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default FormCambioClave;