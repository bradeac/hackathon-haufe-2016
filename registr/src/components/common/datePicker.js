import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';

class DateTime extends Component {
    constructor({ label, value, onDateChange }) {
        super();
        this.state = {
            label,
            value,
            onDateChange
        };
    }

    render() {
        const { labelStyle, datePickerStyle, containerStyle } = styles;
        return (
            <View style={containerStyle}>
                <Text style={labelStyle}>{this.state.label}</Text>
                <DatePicker
                    date={this.state.value}
                    mode="date"
                    format="YYYY-MM-DD"
                    minDate='1900-01-01'
                    maxDate='2016-10-21'
                    confirmBtnText='Confirm'
                    cancelBtnText="Cancel"
                    onDateChange={(date) => {
                        this.state.onDateChange(date);
                        this.setState({ value: date });
                    }}
                    style={datePickerStyle}
                />
            </View>
        );
    }
}

const styles = {
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    datePickerStyle: {
        paddingLeft: 5,
        paddingRight: 5,
        flex: 2
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { DateTime };
