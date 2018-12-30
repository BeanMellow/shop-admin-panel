import React from 'react';
import firebase, {db} from "./firebase";
// import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from "@material-ui/core/CardContent/CardContent";

const styles = theme => ({
    // root: {
    //     flexGrow: 1
    // },
    grid: {
      minWidth: 500
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 auto',
    },
    paper: {
        padding: theme.spacing.unit * 3,
        width: '90%'
        // margin: '0 auto'
        // textAlign: 'center',
    },
    textField: {
        margin: theme.spacing.unit * 3,
        width: '90%'
    },
    textArea: {
        margin: theme.spacing.unit * 3,
        width: '92%'
    },
    button: {
        margin: theme.spacing.unit * 3,
        width: '50%'
    }
});

const categories = [
    'hoodie',
    't-shirt',
    'tank-top',
    'jumper',
    'windbreaker'
];

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    }
];

class ProductForm extends React.Component {
    state = {
        errorObj: {}
    };

    validation = event => {
        event.preventDefault();
        const errorObj = {};

        if (this.props.state.name.length < 5) {
            errorObj.name = 'Name must contain at least 5 characters';
        }
        if (this.props.state.price.length < 1) {
            errorObj.price = 'Price must contain at least 1 digit';
        }
        if (this.props.state.SKU.length < 5) {
            errorObj.SKU = 'SKU must contain at least 5 digits';
        }
        if (this.props.state.imageUrl.length < 10) {
            errorObj.imageUrl = 'Image URL must contain at least 10 characters';
        }
        if (this.props.state.description.length < 15) {
            errorObj.description = 'Description must contain at least 15 characters';
        }

        if (Object.keys(errorObj).length > 0) {
            this.setState({
                errorObj
            });
        } else {
            this.setState({
                errorObj: {}
            });
            this.props.handleSubmit();
        }
    };

    render() {
        const {classes} = this.props;

        // SKU validation
        let validateSKU;
        if (this.props.isEdit) {
            validateSKU = 'Edit mode - can\'t change SKU';
        } else if (this.props.state.SKU.length < 5) {
            validateSKU = this.state.errorObj.SKU;
        }

        return (
            <Grid container spacing={24} justify={'center'} className={classes.grid}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" component="h2" align={'center'} gutterBottom>
                        {this.props.isEdit ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
                    </Typography>
                    {/* I removed < noValidate > from form props */}
                    {/*onSubmit={this.props.handleSubmit}*/}
                    <form onSubmit={this.validation} className={classes.container}
                          noValidate
                          autoComplete='off'>
                        <Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>
                            <TextField
                                error={this.props.state.name.length < 5 ? this.state.errorObj.hasOwnProperty('name') : false}
                                helperText={this.props.state.name.length < 5 ? this.state.errorObj.name : null}
                                // test
                                type={'text'}
                                id='product-name'
                                label='Product name'
                                className={classes.textField}
                                value={this.props.state.name}
                                onChange={this.props.handleChange('name')}
                                margin='dense'
                                variant={'outlined'}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>
                            <TextField
                                error={this.props.state.price.length < 1 ? this.state.errorObj.hasOwnProperty('price') : false}
                                helperText={this.props.state.price.length < 1 ? this.state.errorObj.price : null}
                                type={'number'}
                                id='product-price'
                                label='Product price'
                                className={classes.textField}
                                value={this.props.state.price}
                                onChange={this.props.handleChange('price')}
                                margin='dense'
                                variant={'outlined'}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>
                            <TextField
                                id='currency'
                                select
                                label='Select'
                                className={classes.textField}
                                value={this.props.state.currency}
                                onChange={this.props.handleChange('currency')}
                                helperText='Please select your currency'
                                margin='dense'
                            >
                                {currencies.map(el => (
                                    <MenuItem key={el.value} value={el.value}>
                                        {el.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>
                            <TextField
                                disabled={this.props.isEdit}
                                id='product-category'
                                select
                                label='Select'
                                className={classes.textField}
                                value={this.props.state.category}
                                onChange={this.props.handleChange('category')}
                                // helperText='Please select product category'
                                helperText={this.props.isEdit ? 'Edit mode - can\'t change category' : 'Please select product category'}
                                margin='dense'
                            >
                                {categories.map(el => (
                                    <MenuItem key={el} value={el}>
                                        {el}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>
                            <TextField
                                // moved this under render() -> more conditions
                                // helperText={this.props.isEdit && 'Edit mode - can\'t change SKU'}
                                error={this.props.state.SKU.length < 5 ? this.state.errorObj.hasOwnProperty('SKU') : false}
                                helperText={validateSKU}
                                type={'number'}
                                disabled={this.props.isEdit}
                                id='product-sku'
                                label='Product SKU'
                                className={classes.textField}
                                value={this.props.state.SKU}
                                onChange={this.props.handleChange('SKU')}
                                margin='dense'
                                variant={'outlined'}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>
                            <TextField
                                error={this.props.state.imageUrl.length < 10 ? this.state.errorObj.hasOwnProperty('imageUrl') : false}
                                helperText={this.props.state.imageUrl.length < 10 ? this.state.errorObj.imageUrl : null}
                                type={'url'}
                                id='product-image-url'
                                label='Product image URL'
                                className={classes.textField}
                                value={this.props.state.imageUrl}
                                onChange={this.props.handleChange('imageUrl')}
                                margin='dense'
                                variant={'outlined'}
                            />
                        </Grid>

                        <Grid item xs={12} container justify={'center'} alignContent={'center'}>
                            <TextField
                                error={this.props.state.description.length < 15 ? this.state.errorObj.hasOwnProperty('description') : false}
                                helperText={this.props.state.description.length < 15 ? this.state.errorObj.description : null}
                                type={'url'}
                                id='product-description'
                                multiline={true}
                                rows={5}
                                rowsMax={10}
                                label='Product description'
                                className={classes.textArea}
                                value={this.props.state.description}
                                onChange={this.props.handleChange('description')}
                                margin='dense'
                                variant={'outlined'}
                            />
                        </Grid>

                        <Grid item xs={12} container justify={'center'} alignContent={'center'}>
                            <Button
                                color={'secondary'}
                                variant={'outlined'}
                                className={classes.button}
                                fullWidth={true}
                                type={'submit'}
                                // size={'large'}
                            >
                                {/*Add product*/}
                                {this.props.isEdit ? 'Confirm changes' : 'Add product'}
                            </Button>
                        </Grid>
                    </form>
                </Paper>

            </Grid>

        );
    }
}

export default withStyles(styles)(ProductForm);
