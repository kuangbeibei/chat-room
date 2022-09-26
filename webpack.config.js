const path = require('path');
const Webpack = require('webpack');
const {
    merge
} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = require('dotenv').config({
    debug: true
}).parsed;

const isDevEnv = () => {
    return env.NODE_ENV === 'development'
}

const devConfg = {
    mode: 'development',
    devServer: {
        hot: true,
        open: true,
        compress: false,
        port: 7878,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                pathRewrite: { '^/api': '' },
            },
        }
    },
}

const prodConfig = {
    mode: 'production'
}

const mainConfig = {};

module.exports = merge(isDevEnv() ? devConfg : prodConfig, {
    entry: "./frontend/index.tsx",
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.png|.jpeg|.jpg$/,
                type: 'asset/resource', 
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(ts|tsx)?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        })
    ]
})