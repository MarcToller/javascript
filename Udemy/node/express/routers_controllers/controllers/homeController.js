exports.paginaInicial = (req, res) => {
    res.send(`<form action="/" method="POST"> 
    Nome: <input type="text" name="nome">
    Sobrenome: <input type="text" name="sobrenome">
    <button>Enviar</button>
    </form>`); 
}

exports.trataPost = (req, res) => {
    res.send('Olá, nova rota de POST')
}