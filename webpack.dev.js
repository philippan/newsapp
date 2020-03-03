const path = require('path');
const webpack = require('webpack');
const compiler = webpack(require('./webpack.dev.js'));
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: ['whatwg-fetch', './src/client/index.js'],
    mode: 'development',
    devtool: 'inline-source-map',
    stats: 'verbose',
    devServer: {
            contentBase: './dist',
            compress: true,
            open: 'Google Chrome',
            port: 1234
            },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                      name: '[name].[ext]',
                      outputPath: 'assets/',
                      // publicPath: '/'
                }
            },
            {
                test: '/\.json$/',
                loader: "json-loader"
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s(a|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                                limit: 8192,
                        }
                    }
                ],

            },
            {
                test: /\.html$/i,
                exclude: /node_modules/,
                loader: 'html-loader',
                options: {
                        root: path.resolve(__dirname, 'client')
                }
            },
         ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Progressive Web Application',
            template: "./src/client/views/index.html",
            filename: "./index.html"
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
        }),
    ],
    output: {
        filename: 'bundle.js',
        libraryTarget: 'var',
        library: 'Client',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }

};
