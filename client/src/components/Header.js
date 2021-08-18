import axios from 'axios';
import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        axios.defaults.headers.common = {'Authorization': ''};
        this.props.history.push('/');
    }

    render() {
        if(localStorage.getItem('token')){
            return (
                <div>
                    <nav className="navbar navbar-expand bg-dark navbar-dark">
                        <ul className="navbar-nav">
                            <li className="nav-item ">
                                <Link className="nav-link" to="/">home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/post/create">create blog</Link>
                            </li>
                            <li className="nav-item">
                                <a href="#logout" className="nav-link" onClick={this.logout}>logout</a>
                            </li>
                        </ul>
                    </nav>
                    <hr className="border border-danger"/>
                </div>
            );
        }

        return (
            <div>
                <nav className="navbar navbar-expand bg-dark navbar-dark">
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <Link className="nav-link" to="/">home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">signup</Link>
                        </li>
                    </ul>
                </nav>
                <hr className="border border-danger"/>
            </div>
        );
    }
}

export default withRouter(Header);