
const middleware = {
    protected: (req, res, next) => {
        if (req.session && req.session.username === 'admin') {
            next();
        } else {
            res.status(401).json({
                message:
                    "You shall not pass! Incorrect username and/or password.",
            });
        }
    }
}


module.exports = middleware;