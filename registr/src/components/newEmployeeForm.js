import React, { Component } from 'react';
import { AsyncStorage, Text, Picker } from 'react-native';
import { Button, Card, CardSection, Spinner, TextBox, Select, DateTime } from './common';

const Item = Picker.Item;

class NewEmployeeForm extends Component {
    constructor({ onNextPage }) {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            gender: 'Male',
            personalId: '',
            address: '',
            birthday: (new Date()).toISOString().slice(0, 10).replace(/-/g, ''),
            loading: false,
            error: '',
            onNextPage,
            inputBorder: '#eded'
        };
    }

    onButtonPress() {
        if (this.validateFields()) {
            this.setState({ loading: true });
            AsyncStorage.getItem('employees').then((value) => {
                let employees = [];
                const employee = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    gender: this.state.gender,
                    personalId: this.state.personalId,
                    address: this.state.address,
                    birthday: this.state.birthday
                };
                if (value === null) {
                    employees.push(employee);
                } else {
                    employees = JSON.parse(value);
                    employees.push(employee);
                }
                console.log(employees);
                AsyncStorage.setItem('employees', JSON.stringify(employees))
                    .then(this.onSaveSuccess.bind(this))
                    .catch(this.onSaveFail.bind(this));
            }).done();
        }
    }

    onSaveSuccess() {
        this.state.onNextPage();
    }

    validateFields() {
        if (this.isEmpty(this.state.firstName) ||
            this.isEmpty(this.state.lastName) ||
            this.isEmpty(this.state.gender) ||
            this.isEmpty(this.state.personalId) ||
            this.isEmpty(this.state.address) ||
            this.isEmpty(this.state.birthday)) {
            this.setState({
                error: 'All fields are required'
            });
            return false;
        }
        return true;
    }
    onSaveFail(error) {
        this.setState({
            loading: false,
            error: `An error occuerd! ${error}`
        });
    }

    isEmpty(str) {
        return (!str || str.length === 0);
    }

    handleFormChange(formData) {
        this.setState({ formData });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size='small' />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Save
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <TextBox
                        label={'First name'}
                        onChangeText={firstName => this.setState({ firstName })}
                        placeholder={'eg. John'}
                        value={this.state.firstName}
                        />
                </CardSection>
                <CardSection>
                    <TextBox
                        label={'Last name'}
                        onChangeText={lastName => this.setState({ lastName })}
                        placeholder={'eg. Snow'}
                        value={this.state.lastName}
                        />
                </CardSection>
                <CardSection>
                    <TextBox
                        label={'Personal id'}
                        onChangeText={personalId => this.setState({ personalId })}
                        placeholder={'12345678'}
                        value={this.state.personalId}
                        />
                </CardSection>
                <CardSection>
                    <TextBox
                        label={'Address'}
                        onChangeText={address => this.setState({ address })}
                        placeholder={'str. Address nr. 0'}
                        value={this.state.address}
                        />
                </CardSection>
                <CardSection>
                    <Select
                        label={'Gender'}
                        onValueChange={gender => this.setState({ gender })}
                        value={this.state.gender}
                        >
                        <Item label="Male" value="Male" />
                        <Item label="Female" value="Female" />
                    </Select>
                </CardSection>
                <CardSection>
                    <DateTime
                        label={'Birth date'}
                        onDateChange={birthday => {
                            this.setState({ birthday });
                            console.log(this.state.birthday);
                        } }
                        value={this.state.birthday}
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

export default NewEmployeeForm;
