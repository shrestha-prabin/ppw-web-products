import Colors from './Colors'
import { createMuiTheme } from '@material-ui/core'

const formStyles = {
    input: {
        width: '100%',
        marginTop: 16,
    },
    button: {
        marginTop: 32,
        // backgroundColor: Colors.primary,
        // color: '#fff'
    }
}


const theme = createMuiTheme({
    palette: {
        primary: { 500: Colors.primary },
        secondary: { main: '#444444'},
        error: { 500: Colors.primary }
    }
})



export { formStyles, theme }