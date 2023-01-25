const { Companies, Workers, Products, News } = require('../../database');
const deleteFile = require('../../utils/deleteFile');
const { default: ErrorResponse } = require('../../utils/errorResponse');
const uploadFile = require('../../utils/uploadFile');

module.exports = {
    create: async (req, res, next) => {
        try {
            const companyData = req.body;
            console.log(req);
            const companyImage = uploadFile(req['files']['image'], 'images');

            const data = await Companies.create({
                ...companyData,
                img_src: companyImage[0].src,
            });

            res.status(201).json({
                success: true,
                data,
                message: 'Company was created succesfully!',
            });
        } catch (err) {
            next(err);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await Companies.findOne({
                where: { id: id },
                include: Products,
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
            const data = await Companies.findAll({
                include: Products,
            });
            res.status(200).json({
                success: true,
                data,
            });
        } catch (err) {}
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { dataValues } = await Companies.findOne({
                where: { id: id },
            });
            await Companies.destroy({ where: { id: id } });
            deleteFile('images', dataValues.img_src);

            res.status(200).json({
                success: true,
                message: 'Company was deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const companyData = req.body;
            const { id } = req.params;
            const { dataValues } = await Companies.findOne({
                where: { id: id },
            });
            companyData.img_src = dataValues.img_src;

            if (!dataValues) {
                throw new ErrorResponse(400, 'Company was not found!');
            }

            if (req['files']) {
                const companyImage = uploadFile(
                    req['files']['image'],
                    'images'
                );
                companyData.img_src = companyImage[0].src;

                deleteFile('images', dataValues.img_src);
            }

            await Companies.update(companyData, {
                where: { id: id },
            });

            res.status(200).json({
                success: true,
                message: 'Company was updated successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};
