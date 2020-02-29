const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[chunkhash].js'
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLPlugin({
            template: "./src/index.html"
        })
    ]
}