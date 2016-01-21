var webpack = require('webpack');
var path = require('path')

var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {

    entry: {
        app: ['./src/app.js'],
    },

    output: {
        path: __dirname + '/build',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },

    module: {
        loaders: [
            { test: /\.html$/, exclude: /node_modules/, loader: 'html'},
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap&importLoaders=1!postcss-loader')},
            { test: /\.png$/, exclude: /node_modules/, loader: 'file'}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),

        new ExtractTextPlugin('[id].[contenthash].css', { allChunks: true })
    ],

    postcss: function () {
        return [
            require('postcss-easysprites')()
        ];
    }
};