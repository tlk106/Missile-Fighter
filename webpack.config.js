const path = require('path');

module.exports = {
  entry: './Game/index.js', // Entry file
    output: {
        filename: 'bundle.js', // Output filename
        path: path.resolve(__dirname, 'Game'), // Output directory
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Load JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(png|jpg|gif|ico)$/, // Load image files
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]', // Output image filename
                        },
                    },
                ],
            },
            {
                test: /\.css$/, // Load CSS files
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    mode: 'production', // Set the mode to production
};