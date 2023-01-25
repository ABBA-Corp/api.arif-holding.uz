const { decode, sign } = require('jsonwebtoken');
const { server } = require('../../config/conf');

const getExpiresOn = (token) => {
    const decoded = decode(token);

    const expiresAt = new Date(decoded.exp * 1000);

    return { token, expiresAt };
};
module.exports = {
    getAccessToken: (payload) => {
        return getExpiresOn(
            sign(
                {
                    ...payload,
                    token_type: 'access',
                },
                server.accessToken.secret,
                {
                    expiresIn: server.accessToken.expiresIn,
                }
            )
        );
    },

    getRefreshToken: (payload) => {
        return getExpiresOn(
            sign(
                {
                    ...payload,
                    token_type: 'refresh',
                },
                server.refreshToken.secret,
                {
                    expiresIn: server.refreshToken.expiresIn,
                }
            )
        );
    },
};
