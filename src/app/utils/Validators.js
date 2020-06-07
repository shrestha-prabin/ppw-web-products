function isValidMobileNumber(number) {
    if (number && number.length < 10) return false
    return true
}

function isValidLandlineNumber(number) {
    if (number && number.length < 6) return false
    return true
}

function isValidNumber(number, minValue, maxValue) {
    try {        
        let num = parseInt(number)
        
        if ((!num || num == null) && num!=0) {            
            throw Error('Invalid')
        }

        if (minValue && !maxValue) {
            if (num < minValue) {
                throw Error('Value should be greater than or equal to ' + minValue)
            }
        } else if (maxValue && !minValue) {
            if (num > maxValue) {
                throw Error('Value should be less than or equal to ' + maxValue)
            }
        } else if (minValue && maxValue) {
            if (num < minValue || num > maxValue) {
                throw Error('Value should be between ' + minValue + ' and ' + maxValue)
            }
        }

        return { valid: true, message: '' }

    } catch (error) {
        console.log(error);
        return { valid: false, message: error.message }
    }
}

function isValidEmail(email) {
    const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return REGEX_EMAIL.test(email)
}

export { isValidMobileNumber, isValidLandlineNumber, isValidNumber, isValidEmail }

