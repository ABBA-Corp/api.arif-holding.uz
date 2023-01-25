const { Services, Companies } = require('../../database');
const deleteFile = require('../../utils/deleteFile');
const { default: ErrorResponse } = require('../../utils/errorResponse');
const uploadFile = require('../../utils/uploadFile');

module.exports = {
    create: async (req, res, next) => {
        try {
            const serviceData = req.body;
            const serviceImage = uploadFile(req['files']['image'], 'images');
            const serviceLogo = uploadFile(req['files']['logo'], 'images');

            const data = await Services.create({
                ...serviceData,
                img_src: serviceImage[0].src,
                logo: serviceLogo[0].src,
            });

            res.status(201).json({
                success: true,
                data,
                message: 'Service was created succesfully!',
            });
        } catch (err) {
            next(err);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const data = await Services.findAll({
                include: Companies,
            });
            res.status(200).json({
                success: true,
                data,
            });
        } catch (err) {}
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await Services.findOne({
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

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { dataValues } = await Services.findOne({
                where: { id: id },
            });
            await Services.destroy({ where: { id: id } });
            deleteFile('images', dataValues.img_src);
            deleteFile('images', dataValues.logo);

            res.status(200).json({
                success: true,
                message: 'Service was deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const serviceData = req.body;
            const { id } = req.params;
            const { dataValues } = await Services.findOne({
                where: { id: id },
            });
            console.log(dataValues);
            serviceData.img_src = dataValues.img_src;
            serviceData.logo = dataValues.logo;

            if (!dataValues) {
                throw new ErrorResponse(400, 'Service was not found!');
            }

            if (req['files']) {
                if (req['files']['image']) {
                    const serviceImage = uploadFile(
                        req['files']['image'],
                        'images'
                    );
                    serviceData.img_src = serviceImage[0].src;
                    deleteFile('images', dataValues.img_src);
                }
                if (req['files']['logo']) {
                    const serviceLogo = uploadFile(
                        req['files']['logo'],
                        'images'
                    );
                    serviceData.logo = serviceLogo[0].src;
                    deleteFile('images', dataValues.logo);
                }
            }

            await Services.update(serviceData, {
                where: { id: id },
            });

            res.status(200).json({
                success: true,
                message: 'Service was updated successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};
