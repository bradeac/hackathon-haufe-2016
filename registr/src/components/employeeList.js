import React, { Component } from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
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

    onButtonPress() {
        this.state.onNextPage();
    }

    onSubmitPress() {
        console.log(this.state.employees);
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
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Register employee
                    </Button>
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                        <Button onPress={this.onSubmitPress.bind(this)}>
                            Submit employee
                    </Button>
                    </CardSection>
                </Card>
            </ScrollView>
        );
    }
}

export default EmployeeList;
