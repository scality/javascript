const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index',
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            OIDC_PROVIDER_URL: JSON.stringify(process.env.OIDC_PROVIDER_URL),
            OIDC_CLIENT_ID: JSON.stringify(process.env.OIDC_CLIENT_ID),
            APISERVER_URL: JSON.stringify(process.env.APISERVER_URL),
        }),
    ],
    devServer: {
        port: 8000,
        historyApiFallback: true,
    },
};
