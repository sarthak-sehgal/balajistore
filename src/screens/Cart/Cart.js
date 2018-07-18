import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getCart, removeProduct } from '../../store/actions/index';
import QtyCounter from '../../components/qtyCounter/qtyCounter';

class Cart extends Component {
    state = {
        cart: {},
        isEmpty: true,
        itemsCount: 0,
        totalPrice: 0
    }
    componentWillReceiveProps(nextProps) {
        if ((JSON.stringify(this.props.cart) !== JSON.stringify(nextProps.cart))) {
            if (nextProps.cart) {
                this.setState({ cart: nextProps.cart, isEmpty: false });
                if (nextProps.cart.products) {
                    let count = Object.keys(nextProps.cart.products).length;
                    this.setState({ itemsCount: count });
                    if (count === 0) {
                        this.setState({ isEmpty: true, totalPrice: 0 });
                        console.log("Cart empty!");
                    }
                } else {
                    this.setState({ isEmpty: true });
                }
            } else {
                this.setState({ cart: {}, isEmpty: true });
            }
        }
        if (nextProps.cart.products) {
            let price = 0;
            Object.keys(nextProps.cart.products).map(key => {
                price += parseInt(nextProps.cart.products[key].productPrice * nextProps.cart.products[key].productQty);
            });
            this.setState({ totalPrice: price });
        }
    }
    componentDidMount() {
        this.getCart();
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left",
                    animated: true
                });
            }
        }
    }

    getCart() {
        this.props.getCart(this.props.uid)
            .then(
                result => {
                    this.setState({ cart: this.props.cart });
                    if (this.props.cart.products && Object.keys(this.props.cart.products).length) {
                        this.setState({ isEmpty: false });
                        console.log("Cart not empty!");
                    }
                },
                error => {
                    console.log("Cart empty");
                }
            )
            .catch(err => alert("Error occurred while loading cart!"));
    }

    removeProductFromCart(key) {
        this.props.removeProduct(key, this.props.uid)
            .catch(err => console.log(err))
            .then(result => console.log(result));
    }

    render() {
        let cart = <ActivityIndicator />;
        if (this.state.isEmpty) {
            cart = <Text>Cart is empty</Text>;
        } else {
            // FIX THIS
            cart = Object.keys(this.state.cart.products).map(key => {
                const item = { ...this.state.cart.products[key] };
                return (
                    <View key={key} style={styles.product}>
                        <Text style={styles.productName}>{item.productName}</Text>
                        <Text style={styles.productPrice}>Price: {item.productPrice}</Text>
                        <Text style={styles.productDescription}>{item.productDescription}</Text>
                        <View style={styles.productFooter}>
                            <QtyCounter itemKey={key} qty={item.productQty} />
                            <TouchableOpacity onPress={() => this.removeProductFromCart(key)}>
                                <View style={styles.removeBtn}>
                                    <Text style={styles.removeBtnText}>Remove</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            });
        }

        let cartContainer = (
            <View style={styles.container}>
                <View style={styles.cartHeader}>
                    <Text style={styles.cartSubtotal}>Cart Subtotal ({this.state.itemsCount} {this.state.itemsCount > 0 ? "items" : "item"}): <Text style={styles.cartPrice}>Rs. {this.state.totalPrice}</Text></Text>
                    <TouchableOpacity disabled={this.state.itemsCount === 0}>
                        <View style={styles.checkoutButton}>
                            <Text style={styles.checkoutButtonText}>PROCEED TO CHECKOUT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.cartContainer}>
                    {cart}
                </ScrollView>
            </View>
        );
        if (this.props.isLoading) {
            cartContainer = <ActivityIndicator />
        }

        return (
            <View style={styles.container}>
                {cartContainer}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '95%'
    },
    cartHeader: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        width: '100%',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    cartSubtotal: {
        fontSize: 17,
        color: '#000'
    },
    cartPrice: {
        fontWeight: 'bold'
    },
    checkoutButton: {
        marginTop: 5,
        width: '100%',
        borderRadius: 3,
        backgroundColor: 'rgb(0,122,255)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkoutButtonText: {
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#fff'
    },
    product: {
        backgroundColor: '#eee',
        borderRadius: 5,
        width: '100%',
        marginBottom: 10,
        padding: 10
    },
    productList: {
        width: '100%'
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    productDescription: {
        fontSize: 15,
        color: 'rgba(0,0,0,0.7)'
    },
    productPrice: {
        fontSize: 17,
        color: '#0090FF',
        marginBottom: 5
    },
    productFooter: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    removeBtn: {
        backgroundColor: '#ff3c3c',
        padding: 10,
        borderRadius: 4
    },
    removeBtnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    }
});

mapStateToProps = state => {
    return {
        uid: state.auth.uid,
        cart: state.cart.cart,
        isLoading: state.ui.cartLoading
    }
}

mapDispatchToProps = dispatch => {
    return {
        getCart: (uid) => dispatch(getCart(uid)),
        removeProduct: (key, uid) => dispatch(removeProduct(key, uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);