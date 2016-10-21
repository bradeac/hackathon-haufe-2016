import React from 'react';
import { Picker, View, Text } from 'react-native';

const Select = ({ label, value, onValueChange, children }) => {
    const { labelStyle, pickerStyle, containerStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <Picker
                selectedValue={value}
                onValueChange={onValueChange}
                style={pickerStyle}
                mode='dropdown'
            >
                {children}
            </Picker>
        </View>
    );
};

const styles = {
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    pickerStyle: {
        color: 'blue',
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

export { Select };
