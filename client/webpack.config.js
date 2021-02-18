// require('@babel/register');
const path = require('path');
global.buildOptions = require('minimist')(process.argv.slice(2));
global.buildOptions.dev = !global.buildOptions.prodBuild;

module.exports = {
    entry: './client/app/app.ts',
    module: {
        rules: [
            {
                test: /\.(j|t)s?$/,
                use: 'babel-loader',
                exclude: /(node_modules|dist|tests)/,
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'pixi.js': 'pixi.js/bin/pixi.js',
        }
    },
    output: {
        publicPath: global.buildOptions.publicPath || '/',
        // desktopBuild: !!global.buildOptions.desktop,
        filename: '[name].bundle.js',
        chunkFilename: '[id].[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
}

// require('./webpack.config.babel/'); 