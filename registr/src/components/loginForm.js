import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, TextBox, Spinner } from './common';


class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
        inputBorder: '#eded'
    };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onBlur() {
        console.log('this.state.defaultVal', this.state.email, this.state.error, this.state.loading, this.state.password);
        if(this.state.email.indexOf(' ') >= 0 && this.state.error.indexOf(' ') >= 0 && this.state.loading.indexOf(' ') >= 0 && this.state.password.indexOf(' ') >= 0) {
            this.setState({
                inputBorder: 'blue'
            });
        }
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false
        });
    }

    onLoginFail() {
        this.setState({
            error: 'Authentication Failed.',
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size='small' />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <TextBox
                        label={'Email'}
                        onChangeText={email => this.setState({ email })}
                        placeholder={'user@eamil.domain'}
                        value={this.state.email}
                    />
                </CardSection>
                <CardSection >
                    <TextBox
                        isPassword
                        label={'Password'}
                        onChangeText={password => this.setState({ password })}
                        placeholder={'password'}
                        value={this.state.password}
                    />
                </CardSection>
                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
