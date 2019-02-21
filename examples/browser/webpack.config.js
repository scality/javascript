const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './index',
    resolve: {
        alias: {
            '@kubernetes/client-javascript': path.resolve(__dirname, '../../dist/browser/bundle.js'),
        },
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
    devServer: {
        proxy: {
            '/api': 'http://localhost:8001',
        },
    },
};
