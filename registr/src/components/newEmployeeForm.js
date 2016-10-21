import React, { Component } from 'react';
import { AsyncStorage, Text, Picker } from 'react-native';
import { Button, Card, CardSection, Spinner, TextBox, Select, DateTime } from './common';

const Item = Picker.Item;

class NewEmployeeForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        gender: '',
        personalId: '',
        adress: '',
        birthday: '2016-10-21',
        loading: false,
        error: ''
    };

    onButtonPress() {
        this.setState({ loading: true });
        AsyncStorage.getItem('employees').then((value) => {
            let employees = [this.state.formData];
            if (value !== null) {
                employees = employees.concat(JSON.parse(value));
            }
            console.log(employees);
            AsyncStorage.setItem('employees', JSON.stringify(employees))
                .then(this.onSaveSuccess.bind(this))
                .catch(this.onSaveFail.bind(this));
        }).done();
    }

    onSaveSuccess() {
        this.setState({
            firstName: '',
            lastName: '',
            gender: '',
            personalId: '',
            adress: '',
            birthday: '2016-10-21',
            loading: false
        });
        AsyncStorage.getItem('employees').then((value2) => {
            console.log(value2);
        }).done();
    }

    onSaveFail(error) {
        this.setState({
            loading: false,
            error: `An error occuerd! ${error}`
        });
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
                        onChangeText={adress => this.setState({ adress })}
                        placeholder={'str. Address nr. 0'}
                        value={this.state.adress}
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
