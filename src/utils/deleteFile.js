const fs = require('fs');
const path = require('path');

const deleteFile = (folder, fileName) => {
    fs.unlink(
        path.join(__dirname, '..', '..', 'public', 'uploads', folder, fileName),
        (err) => {
            console.log(err);
        }
    );
};

module.exports = deleteFile;
