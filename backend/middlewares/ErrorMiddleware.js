const errorHandler = (err, req, res, next) => {        
    res.json({
        message: err.message || 'Unknown error',
        stack: process.env.APP_ENV==='production' ? null : err.stack
    })  
}


module.exports = {
    errorHandler
}