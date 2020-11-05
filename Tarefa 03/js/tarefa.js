//Bom, o trabalho (T3), consiste em fazer um 'braço robótico'.
//Na última aula aprendemos a fazer a rotação baseado em um ponto (pivot)
//e também a juntar dois elementos para que se comportem como 1.
//O trabalho deve ser feito utilizando uma esfera fixa (o ombro),
//e outra móvel (cotovelo). Além de dois cubos (ou paralelepípedos,
//ou mesmo cilindros) que serão os 'ossos' do braço.
//Você deve utilizar teclas do teclado para controlar os movimentos
//ou se preferir faça uma animação que demonstre o movimento como um todo.
//O movimento deve ser semelhante a do braço humano. ou seja, abrir cerca de 140°,
//girar um pouco dobre o cotovelo. Além de ter certa mobilidade sobre o ombro.
//A única peça totalmente fixa deve ser o ombro.

//https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
//https://pt.wikipedia.org/wiki/RGB

var scene;
var camera;
var renderer;

var velocity = 1.5;
var rotationVelocity = 0.1;

var posicaoMouser = { //controla a posição do mouser
    x: 0,
    y: 0
};

var cliquePressionado = false; //para controlar o tempo que o cara esta pressionando o botao do mouser


var createACube = function() {
    

    var cotovelo_geometria = new THREE.SphereGeometry(2, 32, 32);
    var cotovelo_material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    cotovelo = new THREE.Mesh(cotovelo_geometria, cotovelo_material);
    scene.add(cotovelo);

    var braço_geometria = new THREE.BoxGeometry( 2, 10, 2 );

    red = new THREE.Color(1, 0, 0);
    green = new THREE.Color(0, 1, 0);
    blue = new THREE.Color(0, 0, 1);
    var colors = [red, green, blue];

    for (var i = 0; i < 3; i++) {
        braço_geometria.faces[4 * i].color = colors[i];
        braço_geometria.faces[4 * i+1].color = colors[i];
        braço_geometria.faces[4 * i+2].color = colors[i];
        braço_geometria.faces[4 * i+3].color = colors[i];
    }

    var braço_material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: true } );
    braço = new THREE.Mesh( braço_geometria, braço_material );
    scene.add( braço );

    var ombro_geometria = new THREE.SphereGeometry(2, 32,32);
    var ombro_material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    ombro = new THREE.Mesh(ombro_geometria, ombro_material);
    ombro.position.y-=5;
    braço.add(ombro);

    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    pivot.add(braço);

    scene.add(pivot);
    braço.position.y+=pivot.position.x+5;

};

var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.createACube();

    camera.position.z = 100;

    render();

    document.addEventListener('keydown', onKeyDown ); 

    //document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    //document.addEventListener('mouseup', onMouseUp ); 
    //document.addEventListener('mousemove', onMouseMouse ); 
  
};

//var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var onKeyDown = function(e){
    console.log(e.keyCode);
    if(e.keyCode == 37){
        pivot.position.x-=velocity;
    }
    if(e.keyCode == 39){
        pivot.position.x+=velocity;
    }
    if(e.keyCode == 40){
        pivot.position.y-=velocity;
    }
    if(e.keyCode == 38){
        pivot.position.y+=velocity
    }
    // if (e.keyCode == 32){ //espaço -> rotação pelo pivo.
    //     console.log("Z: "+ pivot.rotation.z);
    //     if (pivot.rotation.z > 1.7 || pivot.rotation.z < -1){
    //         rotationVelocity*=-1;
    //     }
    //     pivot.rotation.z+=rotationVelocity; 
    // }

    if(e.keyCode == 65){   //esquerda
        pivot.rotation.z+=rotationVelocity;
    }

    if(e.keyCode == 68){    //direita
        pivot.rotation.z-=rotationVelocity;
    }

    if(e.keyCode == 87){    //frente  
        pivot.rotation.x+=rotationVelocity;
    }

    if(e.keyCode == 83){    //tras 
        pivot.rotation.x-=rotationVelocity;
    }

    if (e.keyCode == 107){ // +
        cube.scale.x+=0.1;
        cube.scale.y+=0.1;
        cube.scale.z+=0.1;
    }
    if (e.keyCode == 109){ // -
        cube.scale.x-=0.1;
        cube.scale.y-=0.1;
        cube.scale.z-=0.1;
    }
}


var onMouseDown = function(e){
    cliquePressionado = true;
    //console.log("Apertou Clicou")
}


var onMouseUp = function(e){
    cliquePressionado = false;
  //  console.log("Soltou o clique");
}


// var onMouseMouse = function (e){
//     if (cliquePressionado){

//         var deltaMovimento = {
//             x: e.offsetX - posicaoMouser.x,
//             y: e.offsetY - posicaoMouser.y,
//         }

//         cube.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
//         cube.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
//     }

//     posicaoMouser = {  //nova posiÃ§Ã£o do mouser
//         x : e.offsetX,
//         y : e.offsetY
//     };
// }

window.onload = this.init;

// function toRadians(angle) {
// 	return angle * (Math.PI / 180);
// }