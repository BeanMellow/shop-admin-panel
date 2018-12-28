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
import ShowProducts from "./ShowProducts";
import Main from './Main';
import EditProduct from "./EditProduct";
// import LoginDialog from './LoginDialog';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#aed581'
        },
        secondary: {
            main: '#388e3c'
        },
        error: {
            main: '#f6685e'
        }
    },
    typography: {
        useNextVariants: true,
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }


    render() {
        // let result;
        // if (this.state.isLogged) {
        //     result = <Header />;
        // } else {
        //     result = (null);
        // }

        return (
            <HashRouter>
                <MuiThemeProvider theme={theme}>
                    {/*<React.Fragment>*/}
                    <CssBaseline/>
                    <Header/>
                    <Route exact path={'/'} component={Main} />
                    {/*<Route exact path={'/login'} component={LoginDialog} />*/}
                    <Route path={'/addproduct'} component={AddProduct} />
                    <Route path={'/products'} component={ShowProducts} />
                    {/*TODO: ADD ROUTING TO EDITPRODUCT*/}
                    {/*<AddProduct/>*/}
                    {/*<ShowProducts/>*/}
                    {/*</React.Fragment>*/}
                </MuiThemeProvider>
            </HashRouter>
        );
    }
}

export default App;