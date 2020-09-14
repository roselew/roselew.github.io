const { resolve } = require("path");
const webpack = require("webpack");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (env) {
    var prod = env !== undefined && env.production === true;
    var dev = env !== undefined && env.development === true;

    return {
        entry: {
            app: "./src/js/app.js",
            vendors: ["jquery"],
        },

        output: {
            publicPath: dev ? "/dist/" : "",
            path: resolve(__dirname, "dist/"),
            filename: prod ? "[name].[chunkhash].js" : "[name].js",
        },

        devtool: prod ? "source-map" : "cheap-module-eval-source-map",

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["es2015"],
                            plugins: ["syntax-dynamic-import"],
                        },
                    },
                },
                {
                    test: /\.hbs$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "handlebars-loader",
                    },
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader!sass-loader",
                    }),
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "[name].[ext]",
                        },
                    },
                },
            ],
        },

        plugins: [
            new ExtractTextWebpackPlugin("main.css"),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendors",
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
            }),
        ],
    };
};
