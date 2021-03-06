// importando o módulo path
const path = require('path');

// exportando um objeto de configurações
module.exports = {
    //mode: 'development', // desenvolvimento, vai tentar diminuir ao máximo o arquivo, encurta nomes de variáveis, sem quebra de linha..
    mode: 'production', 
    entry: './frontend/main.js', // arquivo de entrada
    output: { // é um objeto
        path: path.resolve(__dirname, 'public', 'assets', 'js'), // nesta pasta vai ser gerado o arquivo bundle que contem o código js compativel com navegadores mais antigos
        filename: 'bundle.js'
    },
    module: {
        rules: [{ // array de objetos, no nosso caso só vamos ter um pois só vamos trabalhar com JS
            exclude: /node_modules/, // para não ficar analizando a pasta node_modules, é uma expressão regular
            test: /\.js$/, // expressão regular, test é para considerar os arquivos com extensão JS para formar o bundle
            use: {
                loader: 'babel-loader',// esta no package.json
                options: {
                    presets: ['@babel/env']
                }
            } 
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map' // esse cara permite que o navegador mostre qual o fonte (moderno) deu algum erro, pois o bondle é um unico arquivo completamemte diferente e ainda por cima engloba vários outros arquivos, então é impossivel encontrar um erro nele sendo que ele é gerado automaticamente. É para criar um arquivo bundle.js.map
}