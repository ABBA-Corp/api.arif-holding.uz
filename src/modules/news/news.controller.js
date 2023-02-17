const { News, Workers } = require('../../database');
const deleteFile = require('../../utils/deleteFile');
const uploadFile = require('../../utils/uploadFile');
const { default: ErrorResponse } = require('../../utils/errorResponse');

module.exports = {
    create: async (req, res, next) => {
        try {
            const newsData = req.body;
            const newsImage = uploadFile(req['files']['image'], 'images');

            const data = await News.create({
                ...newsData,
                img_src: newsImage[0].src,
            });

            res.status(201).json({
                success: true,
                data,
                message: 'News was created succesfully!',
            });
        } catch (err) {
            next(err);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await News.findOne({
                where: { id: id },
                include: Workers,
            });
            await News.update(
                {
                    viewers: Number(data.dataValues.viewers) + 1,
                },
                { where: { id: id } }
            );

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
            const data = await News.findAll({ include: Workers });
            res.status(200).json({
                success: true,
                data,
            });
        } catch (err) {}
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { dataValues } = await News.findOne({
                where: { id: id },
            });
            await News.destroy({ where: { id: id } });
            deleteFile('images', dataValues.img_src);

            res.status(200).json({
                success: true,
                message: 'News was deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const newsData = req.body;
            const { id } = req.params;
            const { dataValues } = await News.findOne({
                where: { id: id },
            });
            newsData.img_src = dataValues.img_src;

            if (!dataValues) {
                throw new ErrorResponse(400, 'News was not found!');
            }

            if (req['files']) {
                const newsImage = uploadFile(req['files']['image'], 'images');
                newsData.img_src = newsImage[0].src;

                deleteFile('images', dataValues.img_src);
            }

            await News.update(newsData, {
                where: { id: id },
            });

            res.status(200).json({
                success: true,
                message: 'News was updated successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};
