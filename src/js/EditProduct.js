import React from 'react';
import firebase, {db} from "./firebase";
import ProductForm from './ProductForm';

class EditProduct extends React.Component {
    state = {
        name: this.props.product.name,
        category: this.props.product.category,
        price: this.props.product.price,
        currency: this.props.product.currency,
        SKU: this.props.product.SKU,
        // imageUrl: this.props.product.imageUrl,
        quantity: this.props.product.quantity,
        description: this.props.product.description
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {
        db.collection(this.state.category).doc(this.state.SKU).set({
            name: this.state.name,
            category: this.state.category,
            price: this.state.price,
            currency: this.state.currency,
            SKU: this.state.SKU,
            // imageUrl: this.state.imageUrl,
            quantity: this.state.quantity,
            description: this.state.description
        }).then(() => {
            console.log('Product successfully updated');
            this.props.finishEdit(this.state);
            // setState not needed here in current version
            // this.setState({
            //     name: '',
            //     category: 'hoodie',
            //     price: '',
            //     currency: 'EUR',
            //     SKU: '',
            //     // imageUrl: '',
            //     quantity: '',
            //     description: ''
            // }, () => {
            //     this.props.finishEdit();
            // });
        }).catch(error => console.log('Error writing document: ', error));
    };

    render() {
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