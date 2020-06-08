import React, { Component } from 'react'

import { TextField, createMuiTheme, ThemeProvider, MenuItem, InputLabel, FormControl, Select } from '@material-ui/core';
import { formStyles, theme } from '../configs/Styles';
import { isValidMobileNumber, isValidLandlineNumber, isValidEmail, isValidNumber } from '../utils/Validators';

import Colors from '../configs/Colors'


const INPUT_TYPE = {
    'text': 0,
    'number': 1,
    'mobile_number': 2,
    'landline_number': 3,
    'name': 4,
    'email': 5,
    'dropdown': 6
}

export class FormInputView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputType: props.inputType,
            label: props.label,
            name: props.name,
            value: props.value,
            dropdownData: props.dropdownData || [],
            placeholder: props.placeholder,

            disabled: false,

            keyboardType: 'text',
            required: props.required == null ? true : props.required,
            isValid: true,
            helperText: null,
            maxLength: props.maxLength || 1024,
            minValue: props.minValue,
            maxValue: props.maxValue,
            characterSet: props.characterSet
        }
    }

    componentDidMount() {
        this.setupInputType()
    }

    componentDidUpdate(oldProps) {
        if (oldProps !== this.props) {
            this.setState({
                label: this.props.label,
                name: this.props.name,
                value: this.props.value,
                required: this.props.required == null ? true : this.props.required,
                dropdownData: this.props.dropdownData
            })
        }
    }

    setupInputType() {

        var { keyboardType, maxLength, characterSet } = this.state
        switch (this.state.inputType) {
            case INPUT_TYPE.mobile_number:
                maxLength = 10
                characterSet = '0123456789'
                keyboardType = 'tel'
                break;

            case INPUT_TYPE.landline_number:
                maxLength = 9
                characterSet = '0123456789'
                keyboardType = 'tel'
                break;

            case INPUT_TYPE.name:
                maxLength = 256
                characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '.,"

            case INPUT_TYPE.email:
                keyboardType = 'email'

            default:
                console.log('Invalid InputType', this.state.inputType);
                break;
        }

        this.setState({ keyboardType, maxLength, characterSet })
    }

    handleValueChange = (e) => {
        let { maxLength, characterSet } = this.state

        let value = e.target.value

        // Limit value input to maxLength
        if (e.target.value.length > maxLength) return

        // Only allow characters defined in characterSet
        if (characterSet) {
            let characterSetArray = characterSet.split('')
            for (const c of value) {
                if (!characterSetArray.includes(c)) {
                    value = value.replace(c, '')
                }
            }
        }

        this.setState({
            [e.target.name]: value,
            isValid: true,
            helperText: null
        })

        this.props.onChange(e.target.name, value)
    }

    isValidInput = () => {
        var { isValid, helperText, value, required, minValue, maxValue } = this.state

        if (value == null || value == '') {
            if (required) {
                isValid = false
                helperText = 'Required'
            } else {
                isValid = true
                helperText = ''
            }
        } else {
            switch (this.state.inputType) {
                case INPUT_TYPE.mobile_number:
                    if (!isValidMobileNumber(value)) {
                        isValid = false
                        helperText = 'Invalid'
                    }
                    break;

                case INPUT_TYPE.landline_number:
                    if (!isValidLandlineNumber(value)) {
                        isValid = false
                        helperText = 'Invalid'
                    }
                    break;

                case INPUT_TYPE.number:
                    let { valid, message } = isValidNumber(value, minValue, maxValue)
                    isValid = valid
                    helperText = message
                    break

                case INPUT_TYPE.email:
                    if (!isValidEmail(value)) {
                        isValid = false
                        helperText = 'Invalid'
                    }
                    break;

                default:
                    console.log('Invalid InputType', this.state.inputType);

                    break;
            }
        }


        this.setState({ isValid, helperText })
    }

    setError(error) {
        this.setState({
            isValid: false,
            errorText: error
        })
    }

    render() {
        let { label, name, value, placeholder, required, keyboardType } = this.state

        if (this.state.inputType == INPUT_TYPE.dropdown) {
            return <ThemeProvider theme={theme}>
                <FormControl style={formStyles.input} color='secondary'>
                    <InputLabel >{label}</InputLabel>
                    <Select
                        name={name}
                        value={value}
                        onChange={this.handleValueChange}
                    >
                        {
                            this.state.dropdownData.map(item => {
                                return < MenuItem value={item.value}>{item.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </ThemeProvider>
        }

        return (
            <ThemeProvider theme={theme}>

                <TextField style={formStyles.input}
                    ref={ref => this.textField = ref}
                    error={!this.state.isValid}
                    helperText={this.state.helperText}
                    label={`${label} ${required ? '' : '(Optional)'}`}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    type={keyboardType}
                    onChange={this.handleValueChange}
                    onBlur={this.isValidInput}
                    color='secondary'
                />
            </ThemeProvider>
        )
    }
}

export default FormInputView

export { INPUT_TYPE }
