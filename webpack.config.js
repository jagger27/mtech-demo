const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './webpack.js',
    output: {
        path: path.join(__dirname, 'public/javascripts/'),
        filename: "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery-slim'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};
