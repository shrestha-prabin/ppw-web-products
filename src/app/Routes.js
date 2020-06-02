import React, {Component} from 'react'
import { Route } from 'react-router-dom';
import Form from './pages/Form'
import DetailsPage from './pages/DetailsPage'

class Routes extends Component {

    render() {
        return (
            <div>
                <Route exact path='/' />

                <Route key='form' path='/:opCode' component={Form} />
                <Route key='details' path='/details/:opCode' component={DetailsPage} />
                
            </div>
        )
    }
}

export default Routes