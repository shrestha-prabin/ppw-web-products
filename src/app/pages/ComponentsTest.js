import React, { Component } from 'react'
import { Container } from '@material-ui/core'
import FormInputView, { INPUT_TYPE } from '../components/FormInputView'
import Button from '../components/Button'
import DatePickerView from '../components/DatePickerView'

export class ComponentsTest extends Component {

    constructor(props) {
        super(props)

        this.state = {
            
        }
    }


    handleValueChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleDateChange = (date) => {
        console.log(date);
        this.setState({
            value: date
        })

    }

    submit = () => {
        console.log(this.state);
    }

    render() {
        return (
            <Container maxWidth='sm'>
                <form className='form'>
                    <FormInputView
                        label='Mobile Number'
                        name='mobile_number'
                        value={this.state.mobile_number}
                        inputType={INPUT_TYPE.mobile_number}
                        onChange={this.handleValueChange} />


                    <FormInputView
                        label='Landline Number'
                        name='landline_number'
                        required={false}
                        value={this.state.landline_number}
                        inputType={INPUT_TYPE.landline_number}
                        onChange={this.handleValueChange} />

                    <FormInputView
                        label='Full Name'
                        name='name'
                        value={this.state.name}
                        inputType={INPUT_TYPE.name}
                        onChange={this.handleValueChange} />

                    <FormInputView
                        label='Email'
                        name='email'
                        value={this.state.email}
                        inputType={INPUT_TYPE.email}
                        onChange={this.handleValueChange} />


                    <FormInputView
                        label='Ward No.'
                        name='ward'
                        value={this.state.ward}
                        inputType={INPUT_TYPE.number}
                        maxLength={2}
                        minValue={1}
                        onChange={this.handleValueChange} />

                    <FormInputView
                        label='Amount'
                        name='amount'
                        value={this.state.amount}
                        inputType={INPUT_TYPE.number}
                        maxLength={5}
                        minValue={10}
                        maxValue={10000}
                        placeholder={'Amount between 10 to 10000'}
                        onChange={this.handleValueChange} />

                    <FormInputView
                        label='Gender'
                        name='gender'
                        value={this.state.gender}
                        inputType={INPUT_TYPE.dropdown}
                        dropdownData={[{'name': 'Male', 'value': '0'}, {'name': 'Female', 'value': '1'}]}
                        onChange={this.handleValueChange} />

                    <DatePickerView
                        label='Date Picker'
                        name='date'
                        onChange={this.handleDateChange} />

                    <Button style={{marginTop: 32}} onClick={this.submit}>
                        Submit
                    </Button>
                </form>
            </Container>
        )
    }
}

export default ComponentsTest
