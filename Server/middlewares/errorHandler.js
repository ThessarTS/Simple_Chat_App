function errorHandler(err, req, res, next) {
    let stat = 500
    let message = 'Internal server error'

    console.log(err);

    if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {
        stat = 400
        message = err.errors[0].message
    }
    else if (err.name == 'blankUsername') {
        stat = 400
        message = 'Username required'
    }
    else if (err.name == 'blankPass') {
        stat = 400
        message = 'Password required'
    }
    else if (err.name == 'invalidUsernamePass') {
        stat = 401
        message = 'Invalid Username / Password'
    }
    else if (err.name == 'invalidToken' || err.name == 'JsonWebTokenError') {
        stat = 401
        message = 'Invalid token'
    }

    res.status(stat).json({ message })
}

module.exports = errorHandler