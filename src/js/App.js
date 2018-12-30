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
import LoginDialog from './LoginDialog';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#aed581'
        },
        secondary: {
            main: '#388e3c'
        }
        // error: {
        //     main: '#f6685e'
        // }
    },
    typography: {
        useNextVariants: true,
    }
});

class App extends React.Component {
    state = {
        showLoginDialog: false
    };

    toggleDialog = onOff => () => {
      this.setState({showLoginDialog: onOff});
    };

    setUsername = username => {
        this.setState({
            username,
            showLoginDialog: false
        });
    };

    render() {

        return (
            <HashRouter>
                <MuiThemeProvider theme={theme}>
                    {/*<React.Fragment>*/}
                    <CssBaseline/>
                    <Header toggleDialog={this.toggleDialog}
                            username={this.state.username} />
                    <LoginDialog toggleDialog={this.toggleDialog}
                                 setUsername={this.setUsername}
                                 currentUsername={this.state.username}
                                 showLoginDialog={this.state.showLoginDialog} />
                    <Route exact path={'/'} component={Main}/>
                    {/*<Route exact path={'/login'} component={LoginDialog} />*/}
                    <Route path={'/addproduct'} component={AddProduct}/>
                    <Route path={'/products'} component={ShowProducts}/>
                    {/*TODO: ADD ROUTING TO EDITPRODUCT*/}
                    {/*<AddProduct/>*/}
                    {/*<ShowProducts/>*/}
                    {/*</React.Fragment>*/}
                </MuiThemeProvider>
            </HashRouter>
        );
    }

    componentDidMount = () => {
        if (!this.state.username) {
            this.setState({showLoginDialog: true});
        }
    }
}

export default App;