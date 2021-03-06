function calcularIMC (evento) {
    evento.preventDefault();
    let peso = window.document.querySelector('#input-peso'); 
    let altura = window.document.querySelector('#input-altura');

    let mensagem_usuario = '';
    let classe_mensagem_usuario = '';    
    
    
    let valor_peso = Number.parseFloat(peso.value.replace(',','.'));
    let valor_altura = Number.parseFloat(altura.value.replace(',','.'));

    if (!valor_peso) { // o ! é um not, e valores ou variaves de valores retornam um "boolean" em JS 
        mensagem_usuario = 'Digite um peso válido';
        classe_mensagem_usuario = 'dados_invalidos';
    } else if (!valor_altura) {
        mensagem_usuario = 'Digite uma altura válida';
        classe_mensagem_usuario = 'dados_invalidos';
    } else {
        let valor_imc = valor_peso / (valor_altura**2);

        if (valor_imc < 18.5 ) {
            mensagem_usuario = 'Abaixo do peso';
            classe_mensagem_usuario = 'abaixo_peso';    
        } else if ((valor_imc >= 18.5) && (valor_imc <= 24.9)) {
            mensagem_usuario = 'Peso normal';
            classe_mensagem_usuario = 'peso_normal';    
        }  else if ((valor_imc >= 25) && (valor_imc <= 29.9)) {
            mensagem_usuario = 'Sobrepeso';
            classe_mensagem_usuario = 'sobrepeso';    
        }  else if ((valor_imc >= 30) && (valor_imc <= 34.9)) {
            mensagem_usuario = 'Obesidade grau 1';
            classe_mensagem_usuario = 'obesidade_1';    
        }  else if ((valor_imc >= 35) && (valor_imc <= 39.9)) {
            mensagem_usuario = 'Obesidade grau 2';
            classe_mensagem_usuario = 'obesidade_2';    
        }  else if (valor_imc > 40) {
            mensagem_usuario = 'Obesidade grau 3';
            classe_mensagem_usuario = 'obesidade_3';    
        } 

        mensagem_usuario = `Seu IMC é ${valor_imc.toFixed(2).replace('.', ',')}: `+mensagem_usuario;
    }  
    
    mostrarResultado(mensagem_usuario, classe_mensagem_usuario);
};

function mostrarResultado(mensagem, classe) {
    const resultado = window.document.querySelector('#resultado');    
    resultado.innerHTML = ''; // Tem ue limpar pois o create aqui de baixo vai duplicar os paragrafos
    
    const paragrafo = window.document.createElement('p');     

    paragrafo.innerHTML = mensagem;       
    paragrafo.classList.add('classe_base', classe);

    resultado.appendChild(paragrafo);  // Adiciona o paragrafo a div
}

const form_calculo = window.document.querySelector('#form_calculo');
form_calculo.addEventListener('submit', calcularIMC);
