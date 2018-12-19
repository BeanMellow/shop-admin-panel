import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        margin: theme.spacing.unit * 2,
        width: 200,
    },
    textArea: {
        width: 700
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

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete='off'>
                <TextField
                    id='product-name'
                    label='Product name'
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin='dense'
                    variant={'outlined'}
                />

                <TextField
                    id='product-price'
                    label='Product price'
                    className={classes.textField}
                    value={this.state.price}
                    onChange={this.handleChange('price')}
                    margin='dense'
                    variant={'outlined'}
                />

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

                <TextField
                    id='product-sku'
                    label='Product SKU'
                    className={classes.textField}
                    value={this.state.SKU}
                    onChange={this.handleChange('SKU')}
                    margin='dense'
                    variant={'outlined'}
                />

                <TextField
                    id='product-image-url'
                    label='Product image URL'
                    className={classes.textField}
                    value={this.state.imageUrl}
                    onChange={this.handleChange('imageUrl')}
                    margin='dense'
                    variant={'outlined'}
                />

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

            </form>
        );
    }
}

AddProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddProduct);