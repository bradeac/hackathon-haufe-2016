import React, { Component } from 'react';
import {
    View, NetInfo, AsyncStorage
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
        if (isConnected) {
            const { currentUser } = firebase.auth();
            const userName = currentUser.email.substring(0, currentUser.email.indexOf('@'));
            AsyncStorage.getItem('employees').then(value => {
                const jsonObj = JSON.parse(value);
                try {
                    for (let i = 0; i < jsonObj.length; i++) {
                        console.log(jsonObj[i]);
                        firebase.database().ref(`user/${userName}/employees`)
                            .push({
                                firstName: jsonObj[i].firstName,
                                lastName: jsonObj[i].lastName,
                                personalId: jsonObj[i].personalId,
                                address: jsonObj[i].address,
                                gender: jsonObj[i].gender,
                                birthday: jsonObj[i].birthday
                            });
                    }

                   EmployeeList.onRemovePress();
                }
                catch (err) {
                    console.log(`Error while pushing data: ${err}`);
                }
            });
        }
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
