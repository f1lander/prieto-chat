import React from 'react';
import { ILoginState } from '../../types';

class Login extends React.Component {

    public state: ILoginState
    constructor(props: Readonly<ILoginState>) {
        super(props)

        this.state = {
            email: '',
            password: ''
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }
    onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        alert('Authentication coming soon!');
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login Prieto Chat!</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required
                />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Login;