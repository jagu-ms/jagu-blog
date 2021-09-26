import React from 'react';

import axios from 'axios';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem('token')){
            this.props.history.push('/');
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
        };
    };

    onChangeName(e){
        this.setState({
            name: e.target.value,
            error: ""
        });
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value,
            error: ""
        });
    }
    
    onChangePassword(e){
        this.setState({
            password: e.target.value,
            error: ""
        });
    }

    onSubmit(e){
        e.preventDefault();

        let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }

        axios.post('/api/signup',data)

        .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('_id', res.data._id);
            axios.defaults.headers.common = {'Authorization': res.data.token};
            this.props.history.push('/login');
        })

        .catch(err => {
            this.setState({
                error: err.response.data.message,
            });
        });
    }

    renderError(){
        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";
    }

    render() {

        return (
                <div className=" container text-center form-width pt-2">
                    <h4>Sign Up</h4>
                    {this.renderError()}
                    <br/>
                    <div> 
                        <form onSubmit={this.onSubmit}  >
                            <label  className="mb-2 mr-sm-2">name:</label>
                            <br/>
                            <input type="text" 
                            value={this.state.name} 
                            onChange={this.onChangeName} 
                            className="form-control mb-2 mr-sm-2" 
                            placeholder="Enter name" 
                            />

                            <label  className="mb-2 mr-sm-2">email:</label>
                            <br/>
                            <input type="email" 
                            value={this.state.email} 
                            onChange={this.onChangeEmail} 
                            className="form-control mb-2 mr-sm-2" 
                            placeholder="Enter email"
                            />
                            
                            <label  className="mb-2 mr-sm-2">password:</label>
                            <input type="password" 
                            value={this.state.password} 
                            onChange={this.onChangePassword} 
                            className="form-control mb-2 mr-sm-2" 
                            placeholder="Enter password"
                            />

                            <button type="submit" className="btn btn-outline-danger mb-2">
                                Sign Up 
                            </button>
                        </form>
                    </div>
                </div>
        );
    }
}

export default Signup;