const PATH = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'script-loader!jquery/dist/jquery.min.js', 'script-loader!bootstrap/dist/js/bootstrap.min.js', './app/components/app.jsx'
    ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery'})],
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
            side_bar: 'app/components/side_bar.jsx',
            colaboradores: 'app/components/colaboradores.jsx',
            colaborador: 'app/components/colaborador.jsx',
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env', 'stage-0']
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
            }
        ]
    }
};