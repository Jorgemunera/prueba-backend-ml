function logErrors(err, req, res, next){
    console.log('--logErrors');
    console.log(err);
    next(err);
}

function ormErrorHandler(err, req, res, next) {
    if (err.message == 'Validation error') {
      res.status(409).json({
        statusCode: 409,
        message: err.name,
        errors: err.errors
      });
    }
    next(err);
}

function boomErrorHandler(err, req, res, next){
    console.log('--boomErrorHandler');
    if(err.isBoom){
        const {output} = err;
        res.status(output.statusCode).json(output.payload);
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next){
    console.log('--errorHandler');
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

module.exports = {
    logErrors,
    boomErrorHandler,
    ormErrorHandler,
    errorHandler
}
