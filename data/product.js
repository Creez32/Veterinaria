const fs = require('fs');
const path = require('path');

let productos = path.join(__dirname, 'product.json')

module.exports = {
    getProducts : JSON.parse(fs.readFileSync(productos,'utf-8')),
    writeProducts : (data) => {
        fs.writeFileSync(
            productos,
            JSON.stringify(data, null, 2),
            "utf-8"
        )}
}