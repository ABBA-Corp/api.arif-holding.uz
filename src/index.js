const cors = require('cors');
const express = require('express');
const app = express();
const expressFileUpload = require('express-fileupload');
const { sequelize, Users } = require('./database');
const path = require('path');
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');
const { Admin } = require('./config/conf');
const { generateHash } = require('./utils/bcrypt');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(
    '/api/uploads',
    express.static(path.join(__dirname, '..', 'public', 'uploads'))
);
app.use('/api', router);
app.use(errorHandler);

let FORCE = false;

sequelize
    .sync({ force: FORCE })
    .then(() => {
        console.log('Drop end Resync db');
        (async function () {
            if (FORCE) {
                await Users.create({
                    username: Admin.username,
                    password: await generateHash(Admin.password),
                });
            }
        })();
    })
    .catch((err) => console.log(err));

const port = process.env.PORT || 4044;

app.listen(port, () => console.log('Listening on port ' + port));
