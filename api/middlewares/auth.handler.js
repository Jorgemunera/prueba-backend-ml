const boom = require('@hapi/boom');


function checkRoles(roles) {
    return (req, res, next) => {
        const user = req.user;
        const isIncluded = user.role.some((item) => roles.some((element) => element.includes(item)));
        if (isIncluded){
            next();
        } else {
            next(boom.unauthorized());
        }
    }
}

module.exports = { checkRoles }
