import React from 'react';
import {
    HashRouter,
    Route,
    NavLink
} from 'react-router-dom';
import firebase, {db} from "./firebase";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import AddProduct from "./AddProduct";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#9ccc65',
        },
        secondary: {
            main: '#cddc39',
        },
    },
    typography: {
        useNextVariants: true,
    }
});

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
                <MuiThemeProvider theme={theme}>
                    {/*<React.Fragment>*/}
                        <CssBaseline/>
                        <Header/>
                        <AddProduct/>
                    {/*</React.Fragment>*/}
                </MuiThemeProvider>
            </HashRouter>
        );
    }
}

export default App;