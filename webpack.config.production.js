const webpack = require('webpack');
const config = {
    entry: {
        app: __dirname + '/src/index.js',
        scripts: __dirname + '/src/components/index.js',
        vendor: ['whatwg-fetch', 'slick-carousel', 'jquery'],
    },
    output: {
        path: __dirname + '/deploy/javascript/',
        filename: '[name].js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            Promise: "bluebird"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    plugins: ["transform-runtime", "react-html-attrs"],
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader?sourceMap!postcss-loader?sourceMap="inline"!stylus-loader?paths=src'
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },

    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/
    },
    performance: {
        hints: false
    },
};

module.exports = config;
