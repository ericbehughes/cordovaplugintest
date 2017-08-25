try {
    var path = require('path');
    var os = require('os');
    var cordovaNodeModules = path.join(os.homedir(), '.cordova', 'node_modules');

    var webpack = require(path.join(cordovaNodeModules, 'webpack'));
    var HtmlWebpackPlugin = require(path.join(cordovaNodeModules, 'html-webpack-plugin'));
    var ExtractTextPlugin = require(path.join(cordovaNodeModules, 'extract-text-webpack-plugin'));
    var ProgressBarPlugin = require(path.join(cordovaNodeModules, 'progress-bar-webpack-plugin'));

    var cssnext = require(path.join(cordovaNodeModules, 'postcss-cssnext'));
    var postcssImport = require(path.join(cordovaNodeModules, 'postcss-import'));

} catch (e) {
    throw new Error('Missing Webpack Build Dependencies.');
}

module.exports = {
    devtool: 'eval-source-map',
    context: __dirname,
    debug: true,
    cache: true,

    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8000/',
        'webpack/hot/only-dev-server',
        './src/main'
    ],

    output: {
        path: path.join(__dirname, 'www'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    resolve: {
        root: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'node_modules'),
            path.resolve(cordovaNodeModules)
        ],

        extensions: ['', '.js', '.vue', '.json', '.css', '.html', '.styl'],

        unsafeCache: true,

        alias: {
            vue: 'vue/dist/vue.common.js'
        }
    },

    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.(png|jpe?g|gif)$/,
            loader: 'file-loader?name=assets/[name].[ext]'
        }, {
            test: /\.css$/,
            include: [
                path.join(__dirname, 'node_modules', 'onsenui', 'css-components-src', 'src'),
                path.join(__dirname, 'src')
            ],
            loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&-raw!postcss')
        }, {
            test: /\.css$/,
            exclude: [
                path.join(__dirname, 'node_modules', 'onsenui', 'css-components-src', 'src'),
                path.join(__dirname, 'src')
            ],
            loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },

    vue: {
        loaders: {
            js: 'babel'
        }
    },

    babel: {
        presets: [
            path.join(cordovaNodeModules, 'babel-preset-es2015')
        ],
    },

    postcss: function() {
        return [
            postcssImport,
            cssnext({
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            })
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            template: 'src/public/index.html.ejs',
            chunksSortMode: 'dependency'
        }),
        new ProgressBarPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            jQuery: 'jquery',
            moment: 'moment',
            _: 'lodash',
            'window._': 'lodash',
        })
    ],

    resolveLoader: {
        root: cordovaNodeModules
    },

    devServer: {
        contentBase: './src/public',
        colors: true,
        inline: false,
        historyApiFallback: true,
        host: '0.0.0.0',
        stats: 'minimal',
        hot: true
    }
};