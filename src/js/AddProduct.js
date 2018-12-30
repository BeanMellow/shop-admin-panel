import React from 'react';
import firebase, {db} from "./firebase";
import ProductForm from './ProductForm';
// import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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
            [name]: event.target.value
        });
    };

    handleSubmit = () => {
        // (event)
        // event.preventDefault();
        db.collection(this.state.category).doc(this.state.SKU).set({
            name: this.state.name,
            category: this.state.category,
            price: this.state.price,
            currency: this.state.currency,
            SKU: this.state.SKU,
            imageUrl: this.state.imageUrl,
            description: this.state.description
        }).then(() => {
            console.log('Product successfully added to database');
            this.setState({
                name: '',
                category: 'hoodie',
                price: '',
                currency: 'EUR',
                SKU: '',
                imageUrl: '',
                description: ''
            });
        })
            .catch(error => console.log('Error writing document: ', error));
    };

    render() {
        // const {classes} = this.props;

        return (
            <ProductForm state={this.state}
                         handleChange={this.handleChange}
                         handleSubmit={this.handleSubmit}
                         isEdit={false}
            />
        );
    }
}

export default AddProduct;