import React from 'react';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainChat from '../MainChat/MainChat';
import Home from '../Home/Home';

class NavBar extends React.Component {

    render() {

        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/chat">Secret</Link></li>
                    </ul>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/chat" component={MainChat} />
                    </Switch>
                </div>
            </Router>
        );
    }


}

export default NavBar
