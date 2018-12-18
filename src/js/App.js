import React from 'react';
import {
    HashRouter,
    Route,
    NavLink
} from 'react-router-dom';
import firebase, {db} from "./firebase";
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: true
        }
    }


    render() {
        // let result;
        // if (this.state.isLogged) {
        //     result = <Header />;
        // } else {
        //     result = null;
        // }

        return (
            <HashRouter>
                <React.Fragment >
                    <CssBaseline />
                    <Header />
                </React.Fragment >
            </HashRouter>
        );
    }
}

export default App;