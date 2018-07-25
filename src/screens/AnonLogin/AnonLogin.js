import React, { Component } from 'react';
import { View, NetInfo, Image, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { autoAnonSignIn } from '../../store/actions/index';
import { GoogleSignin } from 'react-native-google-signin';
import config from '../../config';
import startMain from '../StartMain/StartMain';

class AnonLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null,
        };
    }
    async componentDidMount() {
        console.log("Welcome to app!");
        await this._configureGoogleSignIn();
        await this._getCurrentUser();
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type === "none") {
                alert("Please connect to internet");
                console.log("No internet detected!");
            } else if (this.state.user !== null) {
                console.log("User found!", this.state.user);
                startMain();
            } else {
                console.log("Anonymous sign in!");
                this.props.onAutoSignIn();
            }
        });
    }

    async _configureGoogleSignIn() {
        await GoogleSignin.hasPlayServices({ autoResolve: true });
        const configPlatform = {
            ...Platform.select({
                ios: {
                    iosClientId: config.iosClientId,
                },
                android: {
                    androidClientId: config.androidClientId,
                },
            }),
        };

        await GoogleSignin.configure({
            ...configPlatform,
            webClientId: config.webClientId,
            offlineAccess: false,
        });
    }

    async _getCurrentUser() {
        try {
            const user = await GoogleSignin.currentUserAsync();
            this.setState({ user, error: null });
        } catch (error) {
            this.setState({
                error,
            });
            console.log(error);
        }
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