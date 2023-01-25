const { Products, ProductTypes, Companies } = require('../../database');
const deleteFile = require('../../utils/deleteFile');
const { default: ErrorResponse } = require('../../utils/errorResponse');
const uploadFile = require('../../utils/uploadFile');

module.exports = {
    create: async (req, res, next) => {
        try {
            const productData = req.body;
            const productImage = uploadFile(req['files']['image'], 'images');

            const data = await Products.create({
                ...productData,
                img_src: productImage[0].src,
            });

            res.status(201).json({
                success: true,
                data,
                message: 'Product was created succesfully!',
            });
        } catch (err) {
            next(err);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await Products.findOne({
                where: { id: id },
                include: ProductTypes,
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
            const data = await Products.findAll({
                include: [ProductTypes, Companies],
            });
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
            const { dataValues } = await Products.findOne({
                where: { id: id },
            });
            await Products.destroy({ where: { id: id } });
            deleteFile('images', dataValues.img_src);

            res.status(200).json({
                success: true,
                message: 'Product was deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const productData = req.body;
            const { id } = req.params;
            const { dataValues } = await Products.findOne({
                where: { id: id },
            });
            productData.img_src = dataValues.img_src;

            if (!dataValues) {
                throw new ErrorResponse(400, 'Product was not found!');
            }

            if (req['files']) {
                const productImage = uploadFile(
                    req['files']['image'],
                    'images'
                );
                productData.img_src = productImage[0].src;

                deleteFile('images', dataValues.img_src);
            }

            await Products.update(productData, {
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
