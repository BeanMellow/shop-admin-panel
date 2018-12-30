import React from 'react';
import {withStyles} from '@material-ui/core/styles';
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
        marginBottom: theme.spacing.unit * 5,
        minWidth: 500
    },
    grow: {
        flexGrow: 1,
        // marginLeft: 70
    },
    menuButton: {
        // marginLeft: -12,
        // marginRight: 50,
        // marginRight: 50,
        padding: 30
    },
    icon: {
        marginLeft: theme.spacing.unit * 2
    }
});

@withStyles(styles)
class Header extends React.Component {

    render() {
        const iconStyle = {
            marginRight: '10px'
        };
        const {classes} = this.props;

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
                        <Button color={'inherit'} className={classes.menuButton} component={NavLink} to={'/'}>
                            <i className="material-icons"
                               style={iconStyle}
                            >
                                home
                            </i>
                            Main Page
                        </Button>
                        <Button color={'inherit'}
                                className={classes.menuButton}
                                component={NavLink}
                                to={'addproduct'}>
                            <i className="material-icons"
                               style={iconStyle}
                            >
                                add_circle
                            </i>
                            Add Product
                        </Button>
                        <Button color={'inherit'}
                                className={classes.menuButton}
                                component={NavLink}
                                to={'products'}>
                            <i className="material-icons"
                               style={iconStyle}
                            >
                                {/*list_alt*/}
                                {/*list*/}
                                view_list
                                {/*format_list_bulleted*/}
                            </i>
                            Products List
                        </Button>
                        <Button color={'inherit'}
                                className={classes.menuButton}
                                onClick={this.props.toggleDialog(true)}
                            // component={NavLink}
                            // to={'login'}
                        >
                            <i className="material-icons"
                               style={iconStyle}
                            >
                                account_circle
                            </i>
                            {/*Login*/}
                            {this.props.username ? this.props.username : 'Login'}
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

export default Header;