import {extractTextPlugin} from './webpack.plugins';
const DEV = global.buildOptions.dev;

const wrapStyleLoader = loader => DEV
    ? `style-loader?sourceMap!${loader}`
    : extractTextPlugin.extract('style-loader?sourceMap', loader);

const appJsLoader = {
    test: /\.m?(j|t)sx?$/,
    use: [
        {
            loader: 'ts-loader'
         },
         {
             loader: 'babel-loader'
         }
    ],
    include: /client/,
    exclude: [/3rd-party/, /node_modules/]
};
//actually only used for htmlWebpackPlugin
const ejsLoader = {
    test: /\.ejs$/,
    use: [
        {
            loader: 'ejs-loader'
        }
    ]
};

// const rawJsLoader = {
//     test: /\.js$/,
//     // loaders: [],
//     // noParse: [/3rd-party/, /node_modules/],
//     include: [/3rd-party/, /node_modules/],
//     exclude: /client/,
// };

const thirdPartyStyleLoader = {
    test: /\.css$/,
    include: [/node_modules/],
    use: [
        { loader: DEV
            ? wrapStyleLoader('css?-loader&-url&sourceMap')
            : wrapStyleLoader('css?-loader&-url') }
    ] 

};
const thirdPartyStyleLoaderMDI = {
    test: /\.css$/,
    include: [/3rd-party/],
    use: [
        {loader: wrapStyleLoader('css?-loader&-url')}
    ]
};

const commonStyleLoader = {
    test: /\.css$/,
    include: /client/,
    exclude: [/3rd-party/, /node_modules/],
    use: [
        {
            loader: DEV
            ? wrapStyleLoader('css?modules&localIdentName=[hash:base64:5]&sourceMap!postcss')
            : wrapStyleLoader('css?modules&localIdentName=[hash:base64:5]!postcss')
        }
    ] 
};

const imagesLoader = {
    // ASSET LOADER
    // Reference: https://github.com/webpack/file-loader
    // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
    // Rename the file using the asset hash
    // Pass along the updated reference to your code
    // You can add here any file extension you want to get copied to your output
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    use: [
        { loader: 'url-loader?name=[name].[ext]' }
    ]
};

const sassLoader = {
    // Sass Loader
    test: /\.scss$/,
    use: [
        {
            loader: DEV
            ? wrapStyleLoader('css?sourceMap!postcss-loader!sass?sourceMap')
            : wrapStyleLoader('css!postcss-loader!sass')
        }
    ] 
};

const HTMLLoader = {
    test: /\.html$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'html-loader?attrs[]=md-icon:md-svg-src',
        }
    ]
};

export default [
    appJsLoader,
    // rawJsLoader,
    ejsLoader,
    thirdPartyStyleLoader,
    thirdPartyStyleLoaderMDI,
    commonStyleLoader,
    HTMLLoader,
    imagesLoader,
    sassLoader,
    {test: /\.woff$/, use: [
        {
            loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=[name].[ext]'
        }
    ]},
    {test: /\.woff2$/, use: [
        {
            loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=[name].[ext]'
        }
    ]},
    {test: /\.[ot]tf$/, use: [
        {
            loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=[name].[ext]'
        }
    ]},
    {test: /\.eot$/, use: [
        {loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=[name].[ext]'}
    ]}


];
