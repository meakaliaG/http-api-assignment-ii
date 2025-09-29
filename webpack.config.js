const path = require('path');

module.exports = {
    entry: './src/client.js', 
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'client'),
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, 'client'),
        port: 8080,
        hot: true,
    }
    
};