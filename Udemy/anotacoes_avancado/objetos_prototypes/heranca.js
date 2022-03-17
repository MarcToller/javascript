
// criando o Produto - pai
function Produto (nome, preco) {
    this.nome = nome;
    this.preco = preco;
};
Produto.prototype.desconto = function(quantia) {
    this.preco -= quantia;
}
Produto.prototype.aumento = function(quantia) {
    this.preco += quantia;
}

//criando o filho Camiseta do Produto
function Camiseta (nome, preco, cor) {
    Produto.call(this, nome, preco); // isso é a "herença" bem parecido com delphi
    this.cor = cor;        
}
//porem da da foma aciam ele não consegue utilizar os métodos de aumento e esconto do prototype do produto, então se faz o seguinte:
Camiseta.prototype = Object.create(Produto.prototype);
// porem o construtor de camiseta ainda vai aparecer como produto, então temos que ajustar isso tb:
Camiseta.prototype.constructor = Camiseta;
// sobrescrevendo o método aumento: Não "herda" o resultado da função pai como no Delphi, ele sobrescreve mesmo!
Camiseta.prototype.aumento = function(percentual) {
    this.preco = this.preco + (this.preco * (percentual/100));
}

//criando o filho Caneca do Produto
function Caneca(nome, preco, material){
    Produto.call(this, nome, preco);
    this.material = material;
    Object.defineProperty(this, 'estoque', {
        get: function() {
            return estoque;
        } ,
        set: function(valor){
            if (typeof valor === 'number'){
                estoque = valor;
            }              
        },

        enumerable: true,
        configurable: false        
    })
}
Caneca.prototype = Object.create(Produto.prototype);
Caneca.prototype.constructor = Caneca;

// criando os objetos
const produto = new Produto('Produto', 10);
const camiseta = new Camiseta('Regata', 50, 'Preta');
const caneca = new Caneca('caneca', 20, 'Plastico');
caneca.estoque = 100;


console.log(produto);
console.log(camiseta);
console.log(caneca);

