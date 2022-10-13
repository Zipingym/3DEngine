const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {                              
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,     
                exclude: /node_module/,      
                use:{
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        publicPath: path.resolve(__dirname, '../dist'),
                        limit: 10000
                    }
                }
            },
            {
                test: /\.(gltf|glb)$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: path.resolve(__dirname, '../src/static/', 'index.html'),
            favicon: path.resolve(__dirname, '../src/static/favicon', 'favicon.ico')
        }),
    ]
}