import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import { updateQty } from '../../store/actions';

class QtyCounter extends Component {
    state = {
        counter: 1
    }

    componentDidMount () {
        this.setState({counter: this.props.qty})
    }

    counterRemove = () => {
        let updatedCounter = this.state.counter - 1;
        if(updatedCounter>0) {
            this.setState({counter: updatedCounter});
            this.props.updateQty(this.props.itemKey, updatedCounter);
        };
    }

    counterAdd = () => {
        let updatedCounter = this.state.counter + 1;
        this.setState({counter: updatedCounter});
        this.props.updateQty(this.props.itemKey, updatedCounter);
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.qtyText}>Qty: </Text>
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
        width: 20,
        height: 20,
        backgroundColor: 'rgba(0,122,255, 0.7)',
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterText: {
        marginRight: 7,
        marginLeft: 7,
        fontSize: 20,
        fontWeight: 'bold'
    },
    qtyText: {
        fontSize: 20
    }
});

const mapDispatchToProps = dispatch => {
    return {
        updateQty: (key, qty) => dispatch(updateQty(key, qty))
    }
}

export default connect(null, mapDispatchToProps)(QtyCounter);