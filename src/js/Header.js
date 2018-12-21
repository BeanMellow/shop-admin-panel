import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
    NavLink
} from 'react-router-dom';

const styles = theme => ({
    root: {
        flexGrow: 1,
        // marginBottom: theme.spacing.unit * 5
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    icon: {
        marginLeft: theme.spacing.unit * 2
    }
});

@withStyles(styles)
class Header extends React.Component {

    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">*/}
                            {/*<MenuIcon />*/}
                        {/*</IconButton>*/}
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            ADMIN PANEL
                        </Typography>
                        <NavLink to={'addproduct'}>
                            <Button color={'inherit'} className={classes.menuButton}>
                                Add Product
                                <i className="material-icons">
                                    add_circle
                                </i>
                            </Button>
                        </NavLink>
                        <NavLink to={'products'}>
                            <Button color={'inherit'} className={classes.menuButton}>
                                Products List
                                <i className="material-icons">
                                    list_alt
                                </i>
                            </Button>
                        </NavLink>
                        <Button color={'inherit'}>Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

export default Header;