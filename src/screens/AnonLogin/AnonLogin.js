import React, { Component } from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import {autoAnonSignIn} from '../../store/actions/index';

class AnonLogin extends Component {
    componentDidMount() {
        this.props.onAutoSignIn();
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.jpg')}
                />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    logo: {
        height: 100,
        width: 100
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onAutoSignIn: () => dispatch(autoAnonSignIn())
    }
};

export default connect(null, mapDispatchToProps)(AnonLogin);