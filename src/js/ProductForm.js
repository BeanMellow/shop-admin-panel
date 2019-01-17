import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
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
        label: '$'
    },
    {
        value: 'EUR',
        label: '€'
    },
    {
        value: 'PLN',
        label: 'zł'
    },
    {
        value: 'BTC',
        label: '฿'
    },
    {
        value: 'JPY',
        label: '¥'
    }
];

class ProductForm extends React.Component {
    state = {
        errorObj: {}
    };

    validation = event => {
        event.preventDefault();
        const product = this.props.state;
        const errorObj = {};

        if (product.name.length < 5 || product.name.length > 20) {
            errorObj.name = 'Name must contain between 5 and 20 characters';
        }
        if (product.price.length < 1 || product.price.length > 7) {
            errorObj.price = 'Price must contain between 1 and 7 signs';
        }
        if (product.SKU.length < 5 || product.SKU.length > 10) {
            errorObj.SKU = 'SKU must contain between 5 and 10 digits';
        }
        // if (product.imageUrl.length < 10) {
        //     errorObj.imageUrl = 'Image URL must contain at least 10 characters';
        // }
        if (product.quantity.length < 1 || product.quantity.length > 3) {
            errorObj.quantity = 'Quantity must contain between 1 and 3 digits';
        }
        if (product.description.length < 15 || product.description.length > 400) {
            errorObj.description = 'Description must contain between 15 and 400 characters';
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
        const product = this.props.state;
        const error = this.state.errorObj;

        // SKU validation
        let validateSKU;
        if (this.props.isEdit) {
            validateSKU = 'Edit mode - can\'t change SKU';
        } else if (product.SKU.length < 5 || product.SKU.length > 10) {
            validateSKU = error.SKU;
        }

        return (
            <Grid container spacing={24} justify={'center'} className={classes.grid}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" component="h2" align={'center'} gutterBottom>
                        {this.props.isEdit ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
                    </Typography>
                    <form onSubmit={this.validation}
                          className={classes.container}
                          noValidate
                          autoComplete='off'>
                        <Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>
                            <TextField
                                error={product.name.length < 5 || product.name.length > 20  ? error.hasOwnProperty('name') : false}
                                helperText={product.name.length < 5 || product.name.length > 20 ? error.name : null}
                                type={'text'}
                                id='product-name'
                                label='Product name'
                                className={classes.textField}
                                value={product.name}
                                onChange={this.props.handleChange('name')}
                                margin='dense'
                                variant={'outlined'}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>
                            <TextField
                                error={product.price.length < 1 || product.price.length > 7 ? error.hasOwnProperty('price') : false}
                                helperText={product.price.length < 1 || product.price.length > 7 ? error.price : null}
                                type={'number'}
                                id='product-price'
                                label='Product price'
                                className={classes.textField}
                                value={product.price}
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
                                value={product.currency}
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
                                value={product.category}
                                onChange={this.props.handleChange('category')}
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
                                error={product.SKU.length < 5 || product.SKU.length > 10 ? error.hasOwnProperty('SKU') : false}
                                helperText={validateSKU}
                                type={'number'}
                                disabled={this.props.isEdit}
                                id='product-sku'
                                label='Product SKU'
                                className={classes.textField}
                                value={product.SKU}
                                onChange={this.props.handleChange('SKU')}
                                margin='dense'
                                variant={'outlined'}
                            />
                        </Grid>

                        {/*<Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>*/}
                            {/*<TextField*/}
                                {/*error={product.imageUrl.length < 10 ? error.hasOwnProperty('imageUrl') : false}*/}
                                {/*helperText={product.imageUrl.length < 10 ? error.imageUrl : null}*/}
                                {/*type={'url'}*/}
                                {/*id='product-image-url'*/}
                                {/*label='Product image URL'*/}
                                {/*className={classes.textField}*/}
                                {/*value={product.imageUrl}*/}
                                {/*onChange={this.props.handleChange('imageUrl')}*/}
                                {/*margin='dense'*/}
                                {/*variant={'outlined'}*/}
                            {/*/>*/}
                        {/*</Grid>*/}

                        <Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>
                            <TextField
                                error={product.quantity.length < 1 || product.quantity.length > 3 ? error.hasOwnProperty('quantity') : false}
                                helperText={product.quantity.length < 1 || product.quantity.length > 3 ? error.quantity : null}
                                type={'number'}
                                id='product-quantity'
                                label='Product quantity'
                                className={classes.textField}
                                value={product.quantity}
                                onChange={this.props.handleChange('quantity')}
                                margin='dense'
                                variant={'outlined'}
                            />
                        </Grid>

                        <Grid item xs={12} container justify={'center'} alignContent={'center'}>
                            <TextField
                                error={product.description.length < 15 || product.description.length > 400 ? error.hasOwnProperty('description') : false}
                                helperText={product.description.length < 15 || product.description.length > 400 ? error.description : null}
                                type={'url'}
                                id='product-description'
                                multiline={true}
                                rows={5}
                                rowsMax={10}
                                label='Product description'
                                className={classes.textArea}
                                value={product.description}
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
