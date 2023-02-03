const path = require('path');
const uuidv4 = require('uuid').v4;

const uploadFile = (files, folder) => {
    const arr = [];
    if (Array.isArray(files)) {
        for (const file of files) {
            const ext = file['mimetype'].split('/')[1];
            const fileName = uuidv4() + '.' + ext;
            file.mv(
                path.join(
                    __dirname,
                    '..',
                    '..',
                    'public',
                    'uploads',
                    folder,
                    fileName
                )
            );
            const f = {
                name: file.name,
                src: fileName,
                size: file.size,
                ext: ext,
                mimetype: file.mimetype,
            };
            arr.push(f.src);
        }
    } else {
        const ext = files['mimetype'].split('/')[1];
        const fileName = uuidv4() + '.' + ext;
        files.mv(
            path.join(
                __dirname,
                '..',
                '..',
                'public',
                'uploads',
                folder,
                fileName
            )
        );
        const f = {
            name: files.name,
            src: fileName,
            size: files.size,
            ext: ext,
            mimetype: files.mimetype,
        };
        arr.push(f);
    }

    return arr;
};

module.exports = uploadFile;
