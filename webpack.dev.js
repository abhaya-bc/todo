const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const entry = require('./webpack.common');
const { merge } = require('webpack-merge')

module.exports = merge( entry ,{
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dev-pack"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: 'file-loader',
                generator: {
                        filename: 'img/[name][ext]'
                    }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // favicon: './src/img/icon.ico',
            inject: 'head',
            filename: 'index.html',
            minify: {
                removeEmptyAttributes: 'true',
            },
        }),
        new CleanWebpackPlugin()
    ]
})