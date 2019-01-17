import React from 'react';
import firebase, {db} from "./firebase";
import ProductForm from './ProductForm';

class AddProduct extends React.Component {
    state = {
        name: '',
        category: 'hoodie',
        price: '',
        currency: 'EUR',
        SKU: '',
        // imageUrl: '',
        quantity: '',
        description: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
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
            console.log('Product successfully added to database');
            this.setState({
                name: '',
                category: 'hoodie',
                price: '',
                currency: 'EUR',
                SKU: '',
                // imageUrl: '',
                quantity: '',
                description: ''
            });
        })
            .catch(error => console.log('Error writing document: ', error));
    };

    render() {
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