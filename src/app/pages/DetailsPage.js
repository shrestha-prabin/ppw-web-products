import React, { Component } from 'react'
import NwscDetails from './bill_payments/water/details/NwscDetails';

export class DetailsPage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             opCode: props.match.params.opCode
        }
        
    }

    renderDetailsPage() {
        switch (this.state.opCode) {
            
            case "2":
                return <NwscDetails />
                
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                {this.renderDetailsPage()}
            </div>
        )
    }
}

export default DetailsPage
