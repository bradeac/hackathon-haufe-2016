import React, { Component } from 'react';
import {
    Form, InputField,
    PickerField, DatePickerField
} from 'react-native-form-generator';

class NewEmployeeForm extends Component {
    scope = {
        firstName: '',
        lastName: '',
        gender: '',
        personalId: '',
        adress: '',
        birthday: Date
    };

    handleFormChange(formData) {
        /*
        formData will contain all the values of the form,
        in this example.
     
        formData = {
          first_name:"",
          last_name:"",
          gender: '',
          birthday: Date,
          has_accepted_conditions: bool
        }
         */

    }
    render() {
        return (
            <Form
                ref='registrationForm'
                onFocus={this.handleFormChange.bind(this)}
                onChange={this.handleFormChange.bind(this)}
                label="Personal Information"
            >
                <InputField ref='firstName' placeholder='First Name' />
                <InputField ref='lastName' placeholder='Last Name' />
                <PickerField
                    ref='gender'
                    placeholder='Gender'
                    options={{
                        male: 'Male',
                        female: 'Female'
                    }}
                />
                <DatePickerField
                    ref='birthday'
                    minimumDate={new Date('1/1/1900')}
                    maximumDate={new Date()} mode='date' placeholder='Birthday'
                />
            </Form>
        );
    }
}

export default NewEmployeeForm;
