const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractBaseCss = new ExtractTextPlugin('base.css');
const extractModuleCss = new ExtractTextPlugin('module.css');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {   //  提取 antd 样式
                test: /\.(less|css)$/i,
                include: /node_modules/,
                use: extractBaseCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader', 'less-loader']
                })
            },
            {   // 提取css模块 以及 公共样式
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use: extractModuleCss.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true
                        },
                    }, 'postcss-loader', 'less-loader']
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        extractModuleCss,
        extractBaseCss,
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '领略数据支付',
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true// 压缩内联css
            },
            filename: 'index.html',
            template: './index.html',
            hash: true
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist'
    }
};