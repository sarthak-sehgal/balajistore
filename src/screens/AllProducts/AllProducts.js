import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

class AllProducts extends Component {
    componentDidMount() {
        console.log(this.props.uid);
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

    render () {
        return (
            <View>
                <Text>AllProducts Screen</Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        uid: state.auth.uid,
    }
}

export default connect(mapStateToProps)(AllProducts);