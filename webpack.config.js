const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/ts/FontSelector.ts",
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    output: {
        filename: 'font-selector.js',
        path: path.resolve(__dirname, 'dist'),
        library: "FontSelector",
        libraryExport: 'default',
        libraryTarget: "window"
    },
    plugins: [new MiniCssExtractPlugin({
        filename: 'styles.css',
    })],
};