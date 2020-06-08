import React, { Component } from 'react'
import 'date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { formStyles, theme } from '../configs/Styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Colors from '../configs/Colors';


export class DatePickerView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            label: props.label,
            name: props.name,
            value: props.value
        }
    }

    render() {
        let { name, value, label } = this.state
        return (
            <ThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        style={formStyles.input}
                        name={name}
                        label={label}
                        format='yyyy/MM/dd'
                        value={value}
                        helperText=''
                        onChange={this.props.onChange}
                        color='secondary'
                    />
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        )
    }
}

export default DatePickerView
