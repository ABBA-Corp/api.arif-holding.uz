const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://backend:719364825g@localhost:5432/arifholding');

const Companies = sequelize.define('companies', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    img_src: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description_ru: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description_en: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

const Products = sequelize.define('products', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img_src: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description_ru: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description_en: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

const ProductTypes = sequelize.define('product_types', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    img_src: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description_ru: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description_en: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

const Workers = sequelize.define('workers', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description_ru: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description_en: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img_src: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const News = sequelize.define('news', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    img_src: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    text_ru: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    text_en: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    news_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    news_type_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    news_type_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_primary: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    viewers: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
    },
});

const Services = sequelize.define('services', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img_src: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description_ru: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description_en: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

const Numbers = sequelize.define('numbers', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    count: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
});

const About = sequelize.define('about', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    img_src: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_ru: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description_ru: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description_en: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
});

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const UserSessions = sequelize.define('user_sessions', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refresh_token_expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

Companies.hasMany(Workers, { onDelete: 'cascade' });
Workers.belongsTo(Companies);

Companies.hasMany(Products, { onDelete: 'cascade' });
Products.belongsTo(Companies);

Companies.hasMany(Services, { onDelete: 'cascade' });
Services.belongsTo(Companies);

Products.belongsToMany(ProductTypes, { through: 'types' });
ProductTypes.belongsToMany(Products, { through: 'types' });

Workers.hasMany(News, { onDelete: 'cascade' });
News.belongsTo(Workers);

Users.hasOne(UserSessions, { onDelete: 'cascade' });
UserSessions.belongsTo(Users);

module.exports = {
    Companies,
    Products,
    ProductTypes,
    Workers,
    News,
    Services,
    Numbers,
    About,
    Users,
    UserSessions,
    sequelize,
};
