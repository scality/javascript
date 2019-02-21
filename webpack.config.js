const path = require('path');

module.exports = {
    entry: './src/browser',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            /* The code generated from the OpenAPI spec uses the NodeJS
             * 'request' library to perform HTTP calls. This library is not
             * available in browser environments. We replace it with a shim that
             * provides some of its functionality based on the 'fetch' API, and
             * errors out otherwise.
             */
            'request': path.resolve(__dirname, 'src/browser/request-fetch'),
        },
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/browser'),
        libraryTarget: 'commonjs2',
    },
};
