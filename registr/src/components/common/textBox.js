import React from 'react';
import { TextInput, View, Text } from 'react-native';

const TextBox = ({ label, value, onChangeText, placeholder, isPassword }) => {
    const { labelStyle, textBoxStyle, containerStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                autoCorrect={false}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={isPassword}
                style={textBoxStyle}
                value={value}
            />
        </View>
    );
};

const styles = {
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    textBoxStyle: {
        color: 'blue',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { TextBox };
