const PATH = require('path');
var webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: [
        'script-loader!jquery/dist/jquery.min.js', 'script-loader!bootstrap/dist/js/bootstrap.min.js', './app/components/app.jsx'
    ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery'
    })],
    output: {
        path: __dirname,
        filename: 'public/bundle.js'
    },
    resolve: {
        modules: [
            __dirname, 'node_modules'
        ],
        alias: {
            //components
            SideBar: 'app/components/SideBar.jsx',
            Collaborators: 'app/components/Collaborators.jsx',
            colaborador: 'app/components/colaborador.jsx',
            Loader: 'app/components/loader/Loader.jsx',
            WithLoading: 'app/components/hoc/WithLoading.jsx'
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            query: {
                presets: ['react', 'env', 'stage-0'],
            },
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }, {
            test: /\.(jpg|png)$/,
            loader: 'file-loader',
            options: {
                name: '[path][name].[hash].[ext]'
            },
            exclude: /(node_modules|bower_components)/
        }]
    }
};