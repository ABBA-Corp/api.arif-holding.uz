const { Workers, Companies } = require('../../database');
const deleteFile = require('../../utils/deleteFile');
const { default: ErrorResponse } = require('../../utils/errorResponse');
const uploadFile = require('../../utils/uploadFile');

module.exports = {
    create: async (req, res, next) => {
        try {
            const workerData = req.body;
            const workerImage = uploadFile(req['files']['image'], 'images');

            const data = await Workers.create({
                ...workerData,
                img_src: workerImage[0].src,
            });

            res.status(201).json({
                success: true,
                data,
                message: 'Worker was created succesfully!',
            });
        } catch (err) {
            next(err);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await Workers.findOne({
                where: { id: id },
                include: Companies,
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
            const data = await Workers.findAll({ include: Companies });
            res.status(200).json({
                success: true,
                data,
            });
        } catch (err) {}
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { dataValues } = await Workers.findOne({
                where: { id: id },
            });
            await Workers.destroy({ where: { id: id } });
            deleteFile('images', dataValues.img_src);

            res.status(200).json({
                success: true,
                message: 'Worker was deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const workerData = req.body;
            const { id } = req.params;
            const { dataValues } = await Workers.findOne({
                where: { id: id },
            });
            workerData.img_src = dataValues.img_src;

            if (!dataValues) {
                throw new ErrorResponse(400, 'Worker was not found!');
            }

            if (req['files']) {
                const workerImage = uploadFile(req['files']['image'], 'images');
                workerData.img_src = workerImage[0].src;

                deleteFile('images', dataValues.img_src);
            }

            await Workers.update(workerData, {
                where: { id: id },
            });

            res.status(200).json({
                success: true,
                message: 'Worker was updated successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};
