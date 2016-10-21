import React, { Component } from 'react';
import {
    View
} from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/loginForm';
import NewEmployeeForm from './components/newEmployeeForm';
class App extends Component {
    state = { loggedIn: null }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBrJT1sIb2UUUlMxnpiSnSblb-inHaiZ9s',
            authDomain: 'auth-a59c8.firebaseapp.com',
            databaseURL: 'https://auth-a59c8.firebaseio.com',
            storageBucket: 'auth-a59c8.appspot.com',
            messagingSenderId: '236071258083'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true: return <NewEmployeeForm />;//(<Button onPress={() => firebase.auth().signOut()}>Log Out</Button>);
            case false: return <LoginForm />;
            default: return <Spinner size='large' />;
        }
    }

    renderHeader() {
        switch (this.state.loggedIn) {
            case true: return <Header headerText="Registration form" />;
            case false: return <Header headerText="Authentication" />;
            default: return <Header headerText="Initializing" />;
        }
    }

    render() {
        return (
            <View>
                {this.renderHeader()}
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
