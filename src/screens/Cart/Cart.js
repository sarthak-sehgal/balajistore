import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getCart } from '../../store/actions/index';

class Cart extends Component {
    state = {
        cart: {},
        isEmpty: true,
        itemsCount: 0,
        totalPrice: 0
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.cart) !== JSON.stringify(nextProps.cart)) {
            if (nextProps.cart) {
                this.setState({ cart: nextProps.cart, isEmpty: false });
                if (nextProps.cart.products) {
                    let count = Object.keys(nextProps.cart.products).length;
                    this.setState({itemsCount: count});
                    if (count === 0) {
                        this.setState({ isEmpty: true, totalPrice: 0 });
                        console.log("Cart empty!");
                    } else {
                        let price = 0;
                        Object.keys(nextProps.cart.products).map(key => {
                            price += parseInt(nextProps.cart.products[key].productPrice);
                        });
                        this.setState({totalPrice: price});
                    }
                } else {
                    this.setState({ isEmpty: true });
                }
            } else {
                this.setState({ cart: {}, isEmpty: true });
            }
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

    render() {
        let cart = <ActivityIndicator />;
        if (this.state.isEmpty) {
            cart = <Text>Cart is empty</Text>;
        } else {
            // FIX THIS
            cart = Object.keys(this.state.cart.products).map(key => {
                return <Text key={key}>{this.state.cart.products[key].productName}</Text>;
            });
        }
        return (
            <View style={styles.container}>
                <View style={styles.cartHeader}>
                    <Text style={styles.cartSubtotal}>Cart Subtotal ({this.state.itemsCount} Item): <Text style={styles.cartPrice}>Rs. {this.state.totalPrice}</Text></Text>
                    <TouchableOpacity>
                        <View style={styles.checkoutButton}>
                            <Text style={styles.checkoutButtonText}>PROCEED TO CHECKOUT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.cartContainer}>
                    {cart}
                </ScrollView>
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
        flexDirection: 'column'
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
    }
});

mapStateToProps = state => {
    return {
        uid: state.auth.uid,
        cart: state.cart.cart
    }
}

mapDispatchToProps = dispatch => {
    return {
        getCart: (uid) => dispatch(getCart(uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);