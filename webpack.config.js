const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js", "*"]
    }
};


