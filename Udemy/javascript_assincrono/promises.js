// pelo que entendi qum a ver com um assunto que ele já falou e exemplificou na auda de funçõies de callback sobre executar funções numa determinada ordem mesmo sem saber qual tempo cada uma vai levar
// São meio que threads


function rand(max, min) {
    // para já ficar em segundos
    min *= 1000;    
    max *= 1000;
    return Math.floor(Math.random() * (max-min) + min)
}
// assim executa as funções abaixo em ordem aleatória
/* function espera (mensagem, tempo) {
    setTimeout(() => {
        console.log(mensagem)
    }, tempo); 
}
espera('mensagem 1', rand(1,3));
espera('mensagem 2', rand(1,3));
espera('mensagem 3', rand(1,3)); */

// COM PROMISE:
 function espera (mensagem, tempo) {
     // parametro resolve Executa e o reject rejeita, mas nós é que controlamos eles
    return new Promise((resolve, reject) => {
        setTimeout(() => { // esse setTimeout é apenas para simular algo que possa demorar, só isso!
            // tratando erro:
            if (mensagem === 'xxx') {
                reject(mensagem + ' é proíbida!')
                //reject(new Error(mensagem + ' é proíbida!'))//pode ser assim tb
                // se quiser que ela pare tem que dar um return abaixo
                return;
            } else {
                resolve(mensagem);
            }               
        }, tempo); 
    })    
}
// o then será executado qdo o resolve for executado! e o catch será executado qdo o reject for executado!
espera('mensagemEspera 1', rand(1,5))
    .then(resposta => { // esse resposta é o retorno do quefoi passado no parametro do resolve!
        console.log(resposta);
        // agora encadeio a outra função, a 2!
        return espera('mensagemEspera 2', rand (1,5)); 
    }).then(resposta => {
        console.log(resposta);        
        // agora encadeio a outra função, a 3!
        return espera('xxx', rand (1,5)); // esse vai dar falha
    }).then(resposta => {//esse then  é da mensagem 3
        console.log(resposta);
    }).then(()=> {
        console.log('frase sem timeout que vai executar sempre por último')// posso simplesmente colocar uma mensagem sem um return anterior
    }) 
    .catch(erro => { // basta somente um catch na cadeia, se qualquer um der erro vai cair aqui e parar o resto. 
        console.log(erro);
    });
    // esse console.log vai executar primeiro pois o código acima é assincrono
    console.log('esse vai executar primeiro.')

    ////////////////// MÉTODOS UTEIS //////////////////
    const promises = [
        'primeiro valor',  
         espera('promiseAll 1', rand(1,5)),
         espera('promiseAll 2', rand(1,5)),
         espera('promiseAll 3', rand(1,5)),
         //espera('xxx', 1000), // essa vai ser rejeitada
         'Outro Valor'
    ]

    //////////////// .all ////////////////
    // se qualquer uma delas for rejeitada não retorna valor de nenhuma
    Promise.all(promises)
        .then(function(valor) {
            console.log(valor)
        })
        .catch(function(erro){
            console.log(erro)
        })

    //////////////// .race ////////////////
    const  promises1 = [        
            espera('promiseRace 1', rand(1,5)),
            espera('promiseRace 2', rand(1,5)),
            espera('promiseRace 3', rand(1,5)),
            //espera('xxx', 1000), // essa vai ser rejeitada            
    ]        
    Promise.race(promises1) // a primeira que executar retorna o valor mas continua executando as outras
        .then(function(valor) {
            console.log(valor)
        })
        .catch(function(erro){
            console.log(erro)
        })
//////////////// Promise.resolve / Promise.reject  ////////////////
function baixaPagina() {
    const emcache = true;

    if (emcache) {
        return Promise.resolve('Página já em cache') // caso algo já esteja resolvido e não se precise esperar.
        //Promise.reject('Página rejeitadaa') // caso algo já esteja rejeitado e não se precise esperar.
    } else {
        return espera('Baixei a página', 3000)
    }
}

baixaPagina() 
    .then(dadosPagina => {
        console.log(dadosPagina);
    })
    .catch(erro => {
        console.log(erro);
    })
    