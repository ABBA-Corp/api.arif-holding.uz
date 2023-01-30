const { About } = require('../../database');
const deleteFile = require('../../utils/deleteFile');
const { default: ErrorResponse } = require('../../utils/errorResponse');
const uploadFile = require('../../utils/uploadFile');

module.exports = {
    create: async (req, res, next) => {
        try {
            const aboutData = req.body;
            console.log(req['files']);
            const photos = uploadFile(req['files']['images'], 'images');
            const aboutImage = uploadFile(req['files']['image'], 'images');

            const data = await About.create({
                ...aboutData,
                img_src: aboutImage[0].src,
                images: photos,
            });

            res.status(201).json({
                success: true,
                data,
                message: 'About was created succesfully!',
            });
        } catch (err) {
            next(err);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await About.findOne({ where: { id: id } });

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
            const data = await About.findAll();
            res.status(200).json({
                success: true,
                data,
            });
        } catch (err) {}
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { dataValues } = await About.findOne({
                where: { id: id },
            });
            await About.destroy({ where: { id: id } });
            deleteFile('images', dataValues.img_src);

            res.status(200).json({
                success: true,
                message: 'About was deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const aboutData = req.body;
            const { id } = req.params;
            const { dataValues } = await About.findOne({
                where: { id: id },
            });
            aboutData.img_src = dataValues.img_src;
            aboutData.images = dataValues.images;

            if (!dataValues) {
                throw new ErrorResponse(400, 'About was not found!');
            }

            if (req['files']?.image) {
                const aboutImage = uploadFile(req['files']['image'], 'images');
                aboutData.img_src = aboutImage[0].src;

                deleteFile('images', dataValues.img_src);
            }

            if (req['files']?.images) {
                const photos = uploadFile(req['files']['images'], 'images');
                aboutData.images = photos;

                photos.forEach((photo) => {
                    deleteFile('images', photo);
                });
            }

            await About.update(aboutData, {
                where: { id: id },
            });

            res.status(200).json({
                success: true,
                message: 'About was updated successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};
