import React from 'react';
import firebase, {db} from "./firebase";
// import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    // root: {
    //     flexGrow: 1
    // },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        padding: theme.spacing.unit * 3,
        width: '90%'
        // textAlign: 'center',
    },
    textField: {
        margin: theme.spacing.unit,
        width: '90%',
    },
    textArea: {
        margin: theme.spacing.unit,
        width: '92%'
    },
    button: {
        margin: theme.spacing.unit,
        width: '50%'
    }
});

const categories = ['hoodie',
    't-shirt',
    'tank-top',
    'jumper',
    'windbreaker'];

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
    },
];

class AddProduct extends React.Component {
    state = {
        name: '',
        category: 'hoodie',
        price: '',
        currency: 'EUR',
        SKU: '',
        imageUrl: '',
        description: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = event => {
        console.log(this.state);
        const { state } = this.state;
        console.log(state.name);
        // db.collection('products').doc(this.state.name).set({
        //     name: this.state
        // })
    };

    render() {
        const {classes} = this.props;

        return (
            <Grid container spacing={24} justify={'center'}>
                <Paper className={classes.paper}>
                    <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete='off'>
                        <Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>
                            <TextField
                                id='product-name'
                                label='Product name'
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin='dense'
                                variant={'outlined'}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>
                            <TextField
                                id='product-price'
                                label='Product price'
                                className={classes.textField}
                                value={this.state.price}
                                onChange={this.handleChange('price')}
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
                                value={this.state.currency}
                                onChange={this.handleChange('currency')}
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
                                id='product-category'
                                select
                                label='Select'
                                className={classes.textField}
                                value={this.state.category}
                                onChange={this.handleChange('category')}
                                helperText='Please select product category'
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
                                id='product-sku'
                                label='Product SKU'
                                className={classes.textField}
                                value={this.state.SKU}
                                onChange={this.handleChange('SKU')}
                                margin='dense'
                                variant={'outlined'}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} container justify={'center'} alignContent={'center'}>
                            <TextField
                                id='product-image-url'
                                label='Product image URL'
                                className={classes.textField}
                                value={this.state.imageUrl}
                                onChange={this.handleChange('imageUrl')}
                                margin='dense'
                                variant={'outlined'}
                            />
                        </Grid>

                        <Grid item xs={12} container justify={'center'} alignContent={'center'}>
                            <TextField
                                id='product-description'
                                multiline={true}
                                rows={5}
                                rowsMax={10}
                                label='Product description'
                                className={classes.textArea}
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                margin='dense'
                                variant={'outlined'}
                            />
                        </Grid>

                        <Grid item xs={12} container justify={'center'} alignContent={'center'}>
                            <Button
                            color={'primary'}
                            variant={'outlined'}
                            className={classes.button}
                            fullWidth={true}
                            type={'submit'}
                            // size={'large'}
                            >
                                Add product
                            </Button>
                        </Grid>
                    </form>
                </Paper>

            </Grid>

        );
    }
}

export default withStyles(styles)(AddProduct);