const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const entry = require('./webpack.common');
const { merge } = require('webpack-merge')

module.exports = merge( entry ,{
    mode: 'production',
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, "public"),
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
            filename: 'bundle.[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // favicon: './src/img/icon.ico',
            inject: 'head',
            filename: 'index.[contenthash:8].html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            },
        }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            "...",
            new CssMinimizerWebpackPlugin(),
        ]
    }
})