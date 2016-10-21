import React, { Component } from 'react';
import {
    View
} from 'react-native';
import firebase from 'firebase';
import { Header, Spinner } from './components/common';
import LoginForm from './components/loginForm';
import NewEmployeeForm from './components/newEmployeeForm';
import EmployeeList from './components/employeeList';
import ButtonHeader from './components/buttonHeader';

class App extends Component {
    state = {
        loggedIn: null,
        currentPage: ''
    }

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
            case true: return this.renderPages();
            case false: return <LoginForm />;
            default: return <Spinner size='large' />;
        }
    }

    renderPages() {
        switch (this.state.currentPage) {
            case 'NewEmployee': return (<NewEmployeeForm
                onNextPage={() => { this.setState({ currentPage: 'EmployeeList' }); }}
            />);
            default: return (<EmployeeList
                onNextPage={() => { this.setState({ currentPage: 'NewEmployee' }); }}
            />);
        }
    }

    renderHeader() {
        switch (this.state.loggedIn) {
            case true: return this.renderPageHeader();
            case false: return <Header headerText="Authentication" />;
            default: return <Header headerText="Initializing" />;
        }
    }

    renderPageHeader() {
        switch (this.state.currentPage) {
            case 'NewEmployee': return (<ButtonHeader
                headerText="Registration form"
                buttonText="X"
                onPress={() => firebase.auth().signOut()}
            />);
            default: return (<ButtonHeader
                headerText="Pending employees"
                buttonText="X"
                onPress={() => firebase.auth().signOut()}
            />);
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
