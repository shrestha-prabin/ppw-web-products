import React, { Component } from 'react'
import { TextField, InputLabel, Select, MenuItem, FormControl, Container } from '@material-ui/core';
import { formStyles } from '../../../configs/Styles'
import Button from '../../../components/Button'
import FormInputView, { INPUT_TYPE } from '../../../components/FormInputView';

export class Nwsc extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,

            detailsPage: false,
            customer_id: '',
            selected_office: '',
            officeList: [
                // { OfficeCodes: "BNP", Office: "BANEPA" },
                // { OfficeCodes: "BIN", Office: "POKHARA, BINDIYABASINI" },
                // { OfficeCodes: "HEM", Office: "POKHARA, HEMJA" },
                // { OfficeCodes: "POK", Office: "POKHARA, PARDI" }
            ]
        }
    }

    componentDidMount() {
        this.requestOfficeList()
    }

    requestOfficeList() {

        if (window.webkit) {
            window.webkit.messageHandlers.apiRequestListener.postMessage({
                'url': 'GetNWSCOfficeCode',
                'params': {}
            });
        }
        var metadata = null
        this.interval = setInterval(() => {
            let input = document.getElementById('json-data-container').
            metadata = input ? input.value: null
            console.log(metadata);

            if (metadata && metadata != '') {
                try {
                    let json = JSON.parse(metadata)
                    clearInterval(this.interval)

                    this.setState({
                        officeList: json.OfficeCodes || []
                    })

                } catch (err) {
                    console.log('Cannot parse JSON');
                }
            }
        }, 500);

    }
    handleValueChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }


    submitData = () => {

        this.setState({ isLoading: true })

        let url = 'GetNWSCBill'
        let params = {
            "CustomerId": this.state.customer_id,
            "OfficeCode": this.state.selected_office,
        }

        if (window.webkit) {
            window.webkit.messageHandlers.submitListener.postMessage({
                'url': url,
                'params': params,
                'OperatorName': 'NWSC',
                'showDetailsPage': true
            });
        }

    }

    showDetailsPage() {
        this.setState({
            detailsPage: true
        })

        return 'Success'
    }

    render() {

        if (this.state.detailsPage) {
            return <div>Details Page</div>
        }

        return (
            <Container maxWidth='sm'>

                <input id='json-data-container' type='hidden' />

                <form className='form'>

                    <FormInputView
                        label='Customer ID'
                        name='customer_id'
                        value={this.state.customer_id}
                        onChange={this.handleValueChange}
                    />

                    <FormInputView
                        name='selected_office'
                        label='Counter'
                        value={this.state.selected_office}
                        inputType={INPUT_TYPE.dropdown}
                        dropdownData={this.state.officeList.map(item => { return { 'name': item.Office, 'value': item.OfficeCodes } })}
                        onChange={this.handleValueChange} />

                    {/* <FormControl style={formStyles.input}>

                        <InputLabel>Counter</InputLabel>
                        <Select
                            name='selected_office'
                            label='Counter'
                            value={this.state.selected_office}
                            onChange={this.handleValueChange}
                        >
                            {
                                this.state.officeList.map(office => {
                                    return <MenuItem value={office.OfficeCodes}>{office.Office}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl> */}

                    <Button style={formStyles.button}
                        variant='contained'
                        onClick={this.submitData}>
                        Proceed
                    </Button>

                </form>
            </Container>

        )
    }
}

export default Nwsc
