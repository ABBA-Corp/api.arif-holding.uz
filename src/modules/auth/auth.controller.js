const { Users, UserSessions } = require('../../database');
const { compareHash } = require('../../utils/bcrypt');
const ErrorResponse = require('../../utils/errorResponse');
const jwtService = require('./tokenService');

module.exports = {
    signIn: async (req, res, next) => {
        try {
            const { username, password } = req.body;

            const user = await Users.findOne({
                where: { username: username },
            });

            if (!user) throw new ErrorResponse(400, 'Username is wrong');

            const isValid = await compareHash(password, user.password);

            if (!isValid) {
                throw new ErrorResponse(400, 'Password is wrong');
            }

            const accessTokenPayload = { user_id: user.id };

            const accessToken = jwtService.getAccessToken(accessTokenPayload);
            const refreshToken = jwtService.getRefreshToken(accessTokenPayload);

            await UserSessions.create({
                user_id: user.dataValues.id,
                username: user.dataValues.username,
                refresh_token: refreshToken.token,
                refresh_token_expires_at: refreshToken.expiresAt,
            });

            const data = {
                tokens: {
                    accessToken,
                    refreshToken,
                },
                user: {
                    createdAt: user.created_at,
                    userId: user.id,
                    userName: user.username,
                },
            };

            res.status(200).json({
                success: true,
                data,
                message: `Login success`,
            });
        } catch (err) {
            next(err);
        }
    },
};
