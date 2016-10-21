import React from 'react';
import { Text, View } from 'react-native';
import { Button } from './common';

const ButtonHeader = (props) => {
    const { textStyle, viewStyle, buttonStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
            <Button style={buttonStyle} onPress={props.onPress}>
                {props.buttonText}
            </Button>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        flexDirection: 'row',
        paddingBottom: 10,
    },
    textStyle: {
        margin: 10,
        
        fontSize: 20,
        flex: 4
    },
    buttonStyle: {
        flex: 1,
        
    }
};

export default ButtonHeader;
