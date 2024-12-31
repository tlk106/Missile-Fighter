const path = require('path');

module.exports = {
    entry: './game/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'game'), // Output in the same directory
    },
    mode: 'development', // Change to 'production' for production builds
};