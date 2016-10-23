import React, { Component } from 'react';
import { ScrollView, AsyncStorage, NetInfo, Alert } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, ListItem } from './common';


class EmployeeList extends Component {
    constructor({ onNextPage }) {
        super();
        this.state = {
            employees: [],
            onNextPage
        };
    }
    state = {

    };

    componentWillMount() {
        AsyncStorage.getItem('employees').then((value) => {
            if (value !== null) {
                this.setState({ employees: JSON.parse(value) });
            }
        }).done();
    }

    onRegisterPress() {
        this.state.onNextPage();
    }

    onSubmitPress() {
        NetInfo.isConnected.fetch().then(isConnected => {
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
                        AsyncStorage.removeItem('employees');
                        this.setState({ employees: [] });
                    }
                    catch (err) {
                        console.log(`Error while pushing data: ${err}`);
                    }
                });
            } else {
                Alert.alert(
                    'Connectivity error',
                    'No internet connection detected. Employees will be submited after a connection is established',
                    [
                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]
                );
            }
        });
    }

    onRemovePress() {
        AsyncStorage.removeItem('employees');
        this.setState({ employees: [] });
    }

     renderButton() {
        if (this.state.employees.length === 0) {
            return;
        }
        return (
            <Card>
                <CardSection>
                    <Button onPress={this.onSubmitPress.bind(this)}>
                        Submit employee
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onRemovePress.bind(this)}>
                        Remove pending employees
                    </Button>
                </CardSection>
            </Card>
        );
    }

    renderEmployees() {
        return (<Card>{this.state.employees.map(employee =>
            <CardSection key={employee.personalId}>
                <ListItem
                    label={`${employee.lastName}, ${employee.firstName}, ${employee.personalId}`}
                    />
            </CardSection>
        )}
        </Card>);
    }

    render() {
        return (
            <ScrollView>
                {this.renderEmployees()}
                <Card>
                    <CardSection>
                        <Button onPress={this.onRegisterPress.bind(this)}>
                            Register employee
                    </Button>
                    </CardSection>
                </Card>

                {this.renderButton()}

            </ScrollView>
        );
    }
}

export default EmployeeList;
