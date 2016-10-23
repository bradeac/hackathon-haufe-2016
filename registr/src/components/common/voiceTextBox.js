import React from 'react';
import { TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import icon from './icons/mic.png';

const VoiceTextBox = ({ label, value, onChangeText, placeholder, onPress }) => {
    const { labelStyle, textBoxStyle, containerStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                autoCorrect={false}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={textBoxStyle}
                value={value}
                />
            <TouchableOpacity onPress={onPress}>
                <Image
                    style={styles.button}
                    source={icon}
                    />
            </TouchableOpacity>
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

export { VoiceTextBox };
