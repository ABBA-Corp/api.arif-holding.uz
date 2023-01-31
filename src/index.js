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

// const net = require('net');
// const socketFile = '/run/apiarif.sock';

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(
    '/uploads',
    express.static(path.join(__dirname, '..', 'public', 'uploads'))
);
app.use('/', router);
app.use(errorHandler);

let FORCE = true;

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
// const server = net.createServer(app);

// server.listen(socketFile, () =>
//    {console.log('Listening on socket file: ${socketFile}');
// });

app.listen(port, () => console.log('Listening on port ' + port));
