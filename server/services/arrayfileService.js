const fs = require('fs');
const path = require('path');

module.exports = {
    getElement: function (fileName, searchFunc) {
        const elems = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../${fileName}`), { encoding: 'utf-8' }));
        return elems.find(searchFunc);
    },

    getAllElements: function (fileName) {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, `../${fileName}`), { encoding: 'utf-8' }));
    },

    createElement: function (fileName, el) {
        const filePath = path.resolve(__dirname, `../${fileName}`);
        const elems = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));

        elems.push(el);
        fs.writeFileSync(filePath, JSON.stringify(elems));
    },

    updateElement: function (fileName, el, searchFunc) {
        const elems = this.getAllElements(fileName);
        const index = elems.findIndex(searchFunc);

        if (index === -1) {
            throw new Error(`Updating element with id=${el.id} in ${fileName} not found`);
        }

        const elem = elems[index];
        elems[index] = { ...elem, ...el };
        fs.writeFileSync(fileName, JSON.stringify(elems));
    },

    deleteElement: function (fileName, elementId) {
        const filePath = path.resolve(__dirname, `../${fileName}`);
        const elems = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
        const index = elems.findIndex(el => el.id === elementId);

        if (index === -1) {
            throw new Error(`Element with id=${elementId} in ${fileName} not found`);
        }

        elems.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(elems));
    },
};
