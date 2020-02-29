import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const INITIAL_STATE = {
    email: '',
    error: null,
};

class FormClaveOlvidada extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doRestablecerClave(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
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
        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <h1>Olvido la clave</h1>
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email"
                />
                <button disabled={isInvalid} type="submit">
                    Restablecer mi clave
        </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const OlvidoClaveLink = () => (
    <p>
        <NavLink to="/cambioClave"> Olvido su contrasena?</NavLink>
    </p>
);

export default FormClaveOlvidada;

export { OlvidoClaveLink };