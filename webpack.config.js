const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractAntdCss = new ExtractTextPlugin('antd.css');
const extractBaseCass = new ExtractTextPlugin('base.css');


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
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use: extractBaseCass.extract({
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
            {   //  处理 antd
                test: /\.(less|css)$/,
                exclude: /src|components/,
                use: extractAntdCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader', 'less-loader']
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        extractAntdCss,
        extractBaseCass,
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