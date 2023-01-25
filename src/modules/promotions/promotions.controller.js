const { ProductTypes } = require('../../database');
const deleteFile = require('../../utils/deleteFile');
const { default: ErrorResponse } = require('../../utils/errorResponse');
const uploadFile = require('../../utils/uploadFile');

module.exports = {
    create: async (req, res, next) => {
        try {
            const promotionData = req.body;
            const promotionImage = uploadFile(req['files']['image'], 'images');

            const data = await ProductTypes.create({
                ...promotionData,
                img_src: promotionImage[0].src,
            });

            res.status(201).json({
                success: true,
                data,
                message: 'Promotion was created succesfully!',
            });
        } catch (err) {
            next(err);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await ProductTypes.findOne({ where: { id: id } });

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
            const data = await ProductTypes.findAll();
            res.status(200).json({
                success: true,
                data,
            });
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { dataValues } = await ProductTypes.findOne({
                where: { id: id },
            });
            await ProductTypes.destroy({ where: { id: id } });
            deleteFile('images', dataValues.img_src);

            res.status(200).json({
                success: true,
                message: 'Promotion was deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const promotionData = req.body;
            const { id } = req.params;
            const { dataValues } = await ProductTypes.findOne({
                where: { id: id },
            });
            promotionData.img_src = dataValues.img_src;

            if (!dataValues) {
                throw new ErrorResponse(400, 'Product was not found!');
            }

            if (req['files']) {
                const promotionImage = uploadFile(
                    req['files']['image'],
                    'images'
                );
                promotionData.img_src = promotionImage[0].src;

                deleteFile('images', dataValues.img_src);
            }

            await ProductTypes.update(promotionData, {
                where: { id: id },
            });

            res.status(200).json({
                success: true,
                message: 'Product was updated successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};
