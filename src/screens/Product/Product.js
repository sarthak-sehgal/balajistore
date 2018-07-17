import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import { addProduct } from '../../store/actions/index';

class Product extends Component {
    state = {
        selectedProduct: {},
        qty: [],
        selectedQty: ''
    }

    componentDidMount() {
        let selectedProduct = this.props.products.find(product => product.key === this.props.itemKey);
        this.setState({ selectedProduct: selectedProduct, qty: selectedProduct.qty, selectedQty: selectedProduct.qty[0] });
    }

    constructor(props) {
        super(props);
    }

    addToCart = (details) => {
        let cartDetails = {
            ...details,
            uid: this.props.uid
        };
        this.props.addProduct(cartDetails);
    }

    render() {
        // let picker = null;
        let qty = [...this.state.qty];
        // let pickerItems = qty.map(function (qty, key) {
        //     return <Picker.Item label={qty} value={qty.toLowerCase()} key={key} />
        // });
        // if (qty.length>0) {
        //     picker = (
        //         <Picker
        //             selectedValue={qty[0]}
        //             style={{ height: 50, width: 100 }}
        //             onValueChange={(itemValue) => this.setState({ selectedQty: itemValue })}>
        //             {/* {pickerItems} */}
        //             <Picker.Item label="Java" value="java" />
        //         </Picker>
        //     );
        // }
        return (
            <View style={styles.container}>
                <Text style={styles.productName}>{this.state.selectedProduct.name}</Text>
                <Text style={styles.productDescription}>{this.state.selectedProduct.description}</Text>
                <Text style={styles.productPrice}>Rs. {this.state.selectedProduct.price}</Text>
                <TouchableOpacity onPress={() => this.addToCart(this.state.selectedProduct)}>
                    <View style={styles.cartButton}>
                        <Icon
                            size={25}
                            name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                            style={styles.cartButtonIcon}
                        />
                        <Text style={styles.cartButtonText}>ADD TO CART</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    productName: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: '#000'
    },
    productDescription: {
        color: 'rgba(0,0,0,0.7)',
        fontSize: 15,
        color: '#000'
    },
    productPrice: {
        fontSize: 18,
        marginTop: 20,
        color: '#000'
    },
    cartButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 7,
        marginTop: 30
    },
    cartButtonText: {
        color: '#000'
    },
    cartButtonIcon: {
        marginRight: 10
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        uid: state.auth.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProduct: (cartDetails) => dispatch(addProduct(cartDetails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);