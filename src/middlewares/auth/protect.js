const { verify } = require('jsonwebtoken');
const { server } = require('../../config/conf');
const { Users } = require('../../database');
const ErrorResponse = require('../../utils/errorResponse');

const accessToken = server.accessToken;

const protect = async (req, res, next) => {
    try {
        let authToken = '';
        const authorization = req.headers.authorization;

        if (authorization && authorization.startsWith('Bearer ')) {
            authToken = authorization.split(' ')[1];
        }
        if (!authToken)
            throw new ErrorResponse(401, 'Please login in to get access');

        const decodedToken = verify(authToken, accessToken.secret);

        if (!decodedToken || decodedToken.token_type !== 'access')
            throw new ErrorResponse(401, 'Unauthorized!');

        const user = await Users.findOne({
            where: { id: decodedToken.user_id },
        });

        if (!user) throw new ErrorResponse(401, 'User does not exist');

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = protect;
