const fs = require('fs');
const path = require('path');

module.exports = {
    getFullElement: function (fileName) {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, `../${fileName}`), { encoding: 'utf-8' }));
    },

    getElementByKey: function (fileName, key) {
        const obj = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../${fileName}`), { encoding: 'utf-8' }));

        return obj[key];
    },

    createElement: function (fileName, key, el) {
        const filePath = path.resolve(__dirname, `../${fileName}`);
        const obj = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
        obj[key] = el;
        fs.writeFileSync(filePath, JSON.stringify(obj));
    },

    updateElement: function (fileName, key, newEl) {
        const obj = this.getFullElement(fileName);

        if (!Object.keys(obj).includes(key)) {
            throw new Error(`Updating element with id=${key} in ${fileName} not found`);
        }

        obj[key] = newEl;
        const filePath = path.resolve(__dirname, `../${fileName}`);
        fs.writeFileSync(filePath, JSON.stringify(obj));
    },

    deleteElement: function (fileName, key) {
        const filePath = path.resolve(__dirname, `../${fileName}`);
        const obj = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));

        if (!Object.keys(obj).includes(key)) {
            throw new Error(`Element with id=${key} in ${fileName} not found`);
        }

        delete obj[key];
        fs.writeFileSync(filePath, JSON.stringify(obj));
    },
};
