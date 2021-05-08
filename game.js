const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const context = canvas.getContext('2d');

const sprites = new Image();
sprites.src = './hero_spritesheet.png';

let frames = 0;

const objHero = {
    spriteX: 0,
    spriteY:0,
    altura: 100,
    largura:80,
    x:100,
    y:50,
    velocidade : 1,
    aceleracao: 0.3,
    movimentos: [
        {spriteX: 0, spriteY:92},
        {spriteX: 80, spriteY:92},
        {spriteX: 160, spriteY:92},
        {spriteX: 240, spriteY:92},
        {spriteX: 320, spriteY:92},
        {spriteX: 400, spriteY:92},
    ],
    frameatual : 0,

    atualiza: function(){
        const passouOIntervalo = frames % 5 === 0;
        if(passouOIntervalo){
            objHero.frameatual++;
            objHero.velocidade = objHero.velocidade + objHero.aceleracao;
            objHero.x = objHero.x + objHero.velocidade; 
        }
    },
    desenha: function(){
        const { spriteX, spriteY } = objHero.movimentos[objHero.frameatual % objHero.movimentos.length];
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            sprites,
            spriteX, spriteY,
            objHero.largura, objHero.altura,
            objHero.x, objHero.y,
            objHero.largura, objHero.altura,
        )

    }

}

function criouColisao(mx, my, hx, hy){
    if (mx > hx && mx < hx + 80 && my > hy && my < hy + 80) {
        return true;
    }
    return false;
}

canvas.addEventListener('click', function(e){
    if(criouColisao(e.x, e.y, objHero.x, objHero.y)){
        console.log('colidiu');
    }
})

function loop(){
    frames +=  1;
    objHero.desenha();
    objHero.atualiza();
    requestAnimationFrame(loop);
}

loop();
