import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    dialog: {
        // marginLeft: theme.spacing.unit * 2,
        // marginRight: theme.spacing.unit * 2,
        width: 400
    }
});

class LoginDialog extends React.Component {
    state = {
        open: false,
        username: ''
    };

    handleChange = event => {
        this.setState({
            username: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            error: false
        });
        if (this.state.username.length > 4 && this.state.username.length < 11) {
            this.props.setUsername(this.state.username);
            this.props.toggleDialog(false);
        } else {
            this.setState({error: 'Username must contain between 5 and 10 characters'});
        }

    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                {/*<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>*/}
                {/*Open form dialog*/}
                {/*</Button>*/}
                <Dialog
                    open={this.state.open}
                    // onClose={this.handleClose}
                    onBackdropClick={this.props.toggleDialog(false)}
                >
                    <DialogTitle id="form-dialog-title" className={classes.dialog}>
                        {this.props.currentUsername ? 'Change username' : 'Log in'}
                    </DialogTitle>
                    <DialogContent className={classes.dialog}>
                        <DialogContentText>
                            {this.props.currentUsername ? 'Edit username below:' : 'Please enter your username below:'}
                        </DialogContentText>
                        <TextField
                            error={this.state.username.length < 5 || this.state.username.length > 10 ? this.state.hasOwnProperty('error') : false}
                            helperText={this.state.username.length < 5 || this.state.username.length > 10 ? this.state.error : null}
                            onChange={this.handleChange}
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions className={classes.dialog}>
                        <Button onClick={this.props.toggleDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button color="primary"
                            // type={'submit'}
                                onClick={this.handleSubmit}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.showLoginDialog !== prevProps.showLoginDialog) {
            const newStatus = this.props.showLoginDialog;
            this.setState({
                open: newStatus
            });
        }
    }
}

// export default LoginDialog;
export default withStyles(styles)(LoginDialog);