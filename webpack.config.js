const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { DuplicatesPlugin } = require("inspectpack/plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    mode: 'development',  // 'production'
    devtool: "inline-source-map", //'source-map'
    // entry: "./app.ts",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['web.js', '.js', 'web.ts', 'ts', 'web.tsx', '.tsx', '.json', 'web.jsx', '.jsx', 'node'],
        publicPath: "/public/",
        filename: 'bundle.js',
        alias: {
            'react': path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom'),
            'lodash': path.resolve(__dirname, 'node_modules/lodash'),
            'react-scripts': path.resolve('./node_modules/react-scripts'),

        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'astroturf/loader'],

                test: /\.html$/,
                exclude: /node_modules/,
                use: [{
                    loader: "html-loader",
                }],

                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'style-loader', 'postcss-loader'],
                options: {
                    importLoaders: 1,
                },

                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[path][name]-[hash:8].[ext]"
                    }
                }],

                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },


                test: /\.tsx?$/,
                use: [{
                    loader: "ts-loader"
                }]
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./build/index.html/",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new FaviconsWebpackPlugin({
            logo: '',
            prefix: './src/'
        }),
        new DuplicatePackageCheckerPlugin(),
        new DuplicatesPlugin({
            // Emit compilation warning or error? (Default: `false`)
            emitErrors: false,
            // Handle all messages with handler function (`(report: string)`)
            // Overrides `emitErrors` output.
            emitHandler: undefined,
            // Display full duplicates information? (Default: `false`)
            verbose: false
        }),
        new DashboardPlugin(),
        new Dotenv()
    ]
};