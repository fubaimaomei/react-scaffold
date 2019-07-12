
module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-px2viewport')
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    postcss: function() {
        return [px2viewport({viewportWidth: 750})];
    }
}
