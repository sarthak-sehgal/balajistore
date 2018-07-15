import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { Navigation } from 'react-native-navigation';

class SideDrawer extends Component {
    onClickItem = (screenName, title) => {
        Promise.all([
            Icon.getImageSource(platform + "-close", 40),
        ]).then(sources => {
            Navigation.showModal({
                screen: 'app.' + screenName, // unique ID registered with Navigation.registerScreen
                title: title, // navigation bar title of the pushed screen (optional)
                navigatorButtons: {
                    leftButtons: [
                        {
                            icon: sources[0],
                            title: "Close",
                            id: "closeModal"
                        }
                    ]
                }
            });
        });
    }
    render() {
        let platform = '';
        let size = 30;
        if (Platform.OS === 'ios') {
            platform = 'ios';
        } else {
            platform = 'md';
            size = 40;
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name={platform + "-apps"}
                            size={size}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text style={styles.drawerItemText}>View Orders</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onClickItem('AddProduct', 'Add A Product')}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name={platform + "-add-circle"}
                            size={size}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text style={styles.drawerItemText}>Add A Product</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onClickItem('RemoveProduct', 'Remove A Product')}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name={platform + "-remove-circle"}
                            size={size}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text style={styles.drawerItemText}>Remove A Product</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name={platform + "-arrow-dropup-circle"}
                            size={size}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text style={styles.drawerItemText}>Change Product Status</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name={platform + "-star"}
                            size={size}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text style={styles.drawerItemText}>Review Top Products</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name={platform + "-photos"}
                            size={size}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text style={styles.drawerItemText}>View My Orders</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem}>
                        <Icon
                            name={platform + "-log-out"}
                            size={size}
                            color="#aaa"
                            style={styles.drawerItemIcon}
                        />
                        <Text style={styles.drawerItemText}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                paddingTop: 50,
            },
            android: {
                paddingTop: 0,
            },
        }),
        backgroundColor: "white",
        flex: 1
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#eee",
        borderBottomWidth: 1,
        borderBottomColor: "#cecece"
    },
    drawerItemText: {
        ...Platform.select({
            ios: {
                fontSize: 15
            },
            android: {
                fontSize: 18
            },
        }),
    },
    drawerItemIcon: {
        margin: 10
    }
});

export default SideDrawer;