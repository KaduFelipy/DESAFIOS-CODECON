"use strict"

const inputHoras = document.getElementById('horas');
const inputMinutos = document.getElementById('minutos');
const inputSegundos = document.getElementById('segundos');

const botaoFullScreen = document.getElementById('fullscreen');
const botaoEditar = document.getElementById('editar');
const botaoPlay = document.getElementById('play');
const botaoPause = document.getElementById('pause');
const botaoReset = document.getElementById('reset');

let intervaloAtualizacao;
let Estado = false;

//VALORES PADRÃO DO CARREGAMENTO PÁGINA
document.addEventListener("DOMContentLoaded", ()=>{
    inputHoras.value = '00';
    inputMinutos.value = '00';
    inputSegundos.value = '30';
    atualizarBotoes(false, true, true, false);

});

//FUNÇAO HABILITA E DESABILITA OS BOTOES
function atualizarBotoes(play, pause, reset, edit){
    botaoPlay.disabled = play;
    botaoPause.disabled = pause;
    botaoReset.disabled = reset;
    botaoEditar.disabled = edit;
};

botaoPlay.addEventListener('click', ()=>{
    if(Estado) return; //se ele já tá rodando ele retorna
    Estado = true; //se não ele inicia o contador
    atualizarBotoes(true,false,false,true);
    intervaloAtualizacao = setInterval(contador, 1000);// atualiza o contador a cada 1s
})

botaoPause.addEventListener('click', ()=>{
    Estado = false; //Desativa o contador
    clearInterval(intervaloAtualizacao);// limpa o intervalo de atualização, fazendo para o contador
    atualizarBotoes(false,true,false,false);
})

botaoReset.addEventListener('click', ()=>{//devolve os parametros inicial e limpa o intervalo de atualização
    Estado = false;
    clearInterval(intervaloAtualizacao);
    inputHoras.value = '00';
    inputMinutos.value = '00';
    inputSegundos.value = '30';
    atualizarBotoes(false, true, true, false);

})

botaoEditar.addEventListener('click', ()=>{
    inputHoras.removeAttribute('readonly');
    inputMinutos.removeAttribute('readonly');
    inputSegundos.removeAttribute('readonly');
    atualizarBotoes(false, true, true, false);
})

botaoFullScreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
});

function contador(){
    let horas = parseInt(inputHoras.value,10);// conversão para númerico usando base padrão do parseInt para evitar erros
    let minutos = parseInt(inputMinutos.value,10);// conversão para númerico usando base padrão do parseInt para evitar erros
    let segundos = parseInt(inputSegundos.value,10);// conversão para númerico usando base padrão do parseInt para evitar erros

    if(segundos == 0 && minutos == 0 && horas == 0){
        clearInterval(intervaloAtualizacao);
        Estado = false;
        atualizarBotoes(false, true, true, false);
        return
    }

    if(segundos == 0){
        if(minutos > 0){
            minutos--;
            segundos = 59;
        } else if (horas > 0){
            horas--;
            minutos = 59;
            segundos = 59;
        }
    } else {
        segundos--;
    }
    inputHoras.value = horas.toString().padStart(2,"0");
    inputMinutos.value = minutos.toString().padStart(2,"0");
    inputSegundos.value = segundos.toString().padStart(2,"0");
}