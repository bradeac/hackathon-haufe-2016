import React, { Component } from 'react';
import {
    View, NetInfo, AsyncStorage, Alert
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


    componentDidMount() {
        const dispatchConnected = isConnected => { this.onConnected(isConnected); };

        NetInfo.isConnected.fetch().then().done(() => {
            NetInfo.isConnected.addEventListener('change', dispatchConnected);
        });
    }

    onConnected(isConnected) {
        AsyncStorage.getItem('onlinestatuslist').then((value) => {
            let onlinestatuslist = [];
            if (value !== null) {
                onlinestatuslist = JSON.parse(value);
            }
            onlinestatuslist.push(isConnected);
            AsyncStorage.setItem('onlinestatuslist', JSON.stringify(onlinestatuslist))
                .then(() => { 
                    Alert.alert(
            'Alert Title',
            JSON.stringify(onlinestatuslist),
            [
                { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]
        ); })
                .catch();
        }).done();
    }

    onSaveSuccess() {
        this.state.onNextPage();
    }

    onSaveFail(error) {
        this.setState({
            loading: false,
            error: `An error occuerd! ${error}`
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
                onNextPage={() => { this.setState({ currentPage: 'EmployeeList' }); } }
                />);
            default: return (<EmployeeList
                onNextPage={() => { this.setState({ currentPage: 'NewEmployee' }); } }
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
