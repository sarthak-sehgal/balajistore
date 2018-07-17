import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class QtyCounter extends Component {
    state = {
        counter: 1
    }

    counterRemove = () => {
        let updatedCounter = this.state.counter - 1;
        if(updatedCounter>0) {
            this.setState({counter: updatedCounter});
        }
    }

    counterAdd = () => {
        let updatedCounter = this.state.counter + 1;
        this.setState({counter: updatedCounter});
    }

    render () {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.counterRemove}>
                    <View style={styles.btn}>
                        <Icon 
                            size={20}
                            color="#fff"
                            name="md-remove"
                        />
                    </View>
                </TouchableOpacity>
                <Text style={styles.counterText}>{this.state.counter}</Text>
                <TouchableOpacity onPress={this.counterAdd}>
                    <View style={styles.btn}>
                        <Icon 
                            size={20}
                            color="#fff"
                            name="md-add"
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btn: {
        padding: 5,
        backgroundColor: 'rgba(0,122,255, 0.7)',
        borderRadius: 5
    },
    counterText: {
        marginRight: 7,
        marginLeft: 7,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default QtyCounter;