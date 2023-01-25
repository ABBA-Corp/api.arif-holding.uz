const { Numbers } = require('../../database');
const { default: ErrorResponse } = require('../../utils/errorResponse');

module.exports = {
    create: async (req, res, next) => {
        try {
            const numbersData = req.body;

            const data = await Numbers.create(numbersData);

            res.status(201).json({
                success: true,
                data,
                message: 'Created succesfully!',
            });
        } catch (err) {
            next(err);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await Numbers.findOne({
                where: { id: id },
            });

            res.status(200).json({
                success: true,
                data,
            });
        } catch (err) {
            next(err);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const data = await Numbers.findAll();
            res.status(200).json({
                success: true,
                data,
            });
        } catch (err) {}
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            await Numbers.destroy({ where: { id: id } });

            res.status(200).json({
                success: true,
                message: 'Deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const numbersData = req.body;
            const { id } = req.params;

            await Numbers.update(numbersData, {
                where: { id: id },
            });

            res.status(200).json({
                success: true,
                message: 'Updated successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};
