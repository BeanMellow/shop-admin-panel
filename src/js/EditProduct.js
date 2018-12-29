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


class EditProduct extends React.Component {
    state = {
        name: this.props.product.name,
        category: this.props.product.category,
        price: this.props.product.price,
        currency: this.props.product.currency,
        SKU: this.props.product.SKU,
        imageUrl: this.props.product.imageUrl,
        description: this.props.product.description
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
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
            // TODO: ten set state ponizej mi tu chyba niepotrzebny, tylo submit
            console.log('Product successfully updated');
            this.props.finishEdit(this.state);
            // this.setState({
            //     name: '',
            //     category: 'hoodie',
            //     price: '',
            //     currency: 'EUR',
            //     SKU: '',
            //     imageUrl: '',
            //     description: ''
            // }, () => {
            //     this.props.finishEdit();
            // });
        })
            .catch(error => console.log('Error writing document: ', error));
    };

    render() {
        // const {classes} = this.props;

        return (
            <ProductForm state={this.state}
                         handleChange={this.handleChange}
                         handleSubmit={this.handleSubmit}
                         isEdit={true}
            />
        );
    }
}

export default EditProduct;