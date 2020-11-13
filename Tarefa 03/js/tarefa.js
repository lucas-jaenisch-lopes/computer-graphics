//LUCAS JAENISCH LOPES
//A abstração deste braco eh que ele simule os movimentos possíveis dum braço esquerdo humano e suas limitacoes
var scene;
var camera;
var renderer;

var velocity = 1.5;
var rotationVelocity = 0.1;

red = new THREE.Color(1, 0, 0);
green = new THREE.Color(0, 1, 0);
blue = new THREE.Color(0, 0, 1);
yellow = new THREE.Color(1, 0, 0);
cyan = new THREE.Color(0, 1, 0);
magenta = new THREE.Color(0, 0, 1);
var colors = [red, green, blue, yellow, cyan, magenta];

var pintaCubo = function(objeto_geometria, colors){
    for (var i = 0; i < 3; i++) {
        objeto_geometria.faces[4 * i].color = colors[i];
        objeto_geometria.faces[4 * i+1].color = colors[i];
        objeto_geometria.faces[4 * i+2].color = colors[i];
        objeto_geometria.faces[4 * i+3].color = colors[i];
    }
}

var criaBraco = function() {
    
    var ombro_geometria = new THREE.SphereGeometry(2, 32, 32);
    var ombro_material = new THREE.MeshBasicMaterial( { color: 0xfffa00} );
    ombro = new THREE.Mesh(ombro_geometria, ombro_material);
    scene.add(ombro);

    var braco_geometria = new THREE.BoxGeometry(2,10,2);
    var braco_material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: true } );
    braco = new THREE.Mesh(braco_geometria, braco_material);
    braco.position.y -= 5;
    ombro.add(braco);

    pintaCubo(braco_geometria, colors);

    var cotovelo_geometria = new THREE.SphereGeometry(2, 20, 32);
    var cotovelo_material = new THREE.MeshBasicMaterial( { color: 0x7ac1f8} );
    cotovelo = new THREE.Mesh(cotovelo_geometria, cotovelo_material);
    cotovelo.position.y -= 5;
    braco.add(cotovelo);

    var ante_braco_geometria = new THREE.BoxGeometry(2,10,2);
    var ante_braco_material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: true } );
    ante_braco = new THREE.Mesh(ante_braco_geometria, ante_braco_material);
    ante_braco.position.y -= 5;
    cotovelo.add(ante_braco);

    pintaCubo(ante_braco_geometria, colors);

    var mao_geometria = new THREE.BoxGeometry(3,4,3);
    var mao_material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: true } );
    mao = new THREE.Mesh(mao_geometria, mao_material);
    mao.position.y -= 5;
    ante_braco.add(mao);

    pintaCubo(mao_geometria, colors);
};

var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.criaBraco();

    camera.position.z = 100;

    render();

    document.addEventListener('keydown', onKeyDown ); 

};

//var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var onKeyDown = function(e){
    console.log(e.keyCode);

    //////////////////////////////////////////
    //reposiciona braco, a partir do ombro
    //////////////////////////////////////////

    if(e.keyCode == 37){
        ombro.position.x-=velocity;
    }
    if(e.keyCode == 39){
        ombro.position.x+=velocity;
    }
    if(e.keyCode == 40){
        ombro.position.y-=velocity;
    }
    if(e.keyCode == 38){
        ombro.position.y+=velocity
    }

    //////////////////////////////////////////
    //rotacoes ombro
    //////////////////////////////////////////

    //Usa AWSD para girar o ombro pra frente esquerda cima e baixo
    //USA QE para girar ombro no sentido horario e anti horario

    if(e.keyCode == 68){   //direita  
        if(ombro.rotation.z < 3){
            ombro.rotation.z += rotationVelocity;
        }
    }

    if(e.keyCode == 65){    //esquerda 
        if(ombro.rotation.z > -0.6){
         ombro.rotation.z -= rotationVelocity;
        }
    }

    if(e.keyCode == 87){    //lateral cima  
        if(ombro.rotation.x < 2){
            ombro.rotation.x += rotationVelocity;
        }
    }

    if(e.keyCode == 83){    //lateral baixo 
        if(ombro.rotation.x > -1){
            ombro.rotation.x -= rotationVelocity;
        }
    }

    // q 81
    // e 69
     if(e.keyCode == 69){ //horario
        if(ombro.rotation.y > -1.5){
            ombro.rotation.y -= rotationVelocity
        }
    }

    if(e.keyCode == 81){  //antihorario
        if(ombro.rotation.y < 1.5){
            ombro.rotation.y += rotationVelocity
        }
    }

    //////////////////////////////////////////
    //rotacoes cotovelo
    //////////////////////////////////////////


    //USA JIKL para mover o cotovelo e antebraço
    //O cotovelo nao gira na direcao do antebraco no corpo, o pulso é quem possui essa rotacao, e o ombro quando gira rotaciona o cotovelo este sentido
    
    if(e.keyCode == 76){   //direita
        if(cotovelo.rotation.z < 2.5){
            cotovelo.rotation.z += rotationVelocity;
        }
    }

    if(e.keyCode == 74){    //esquerda
        if(cotovelo.rotation.z > -0.10){
            cotovelo.rotation.z -= rotationVelocity;
        }
    }

    if(e.keyCode == 73){    //frente  fora
        if(cotovelo.rotation.y < 0.5){
            cotovelo.rotation.y += rotationVelocity;
        }
    }

    if(e.keyCode == 75){    //tras 
        if(cotovelo.rotation.y > -1){
            cotovelo.rotation.y -= rotationVelocity;
        }        
    }   

    //Nao foi adicioado movimento do pulso pois nao foi exigido

    if (e.keyCode == 187){ // +
        ombro.scale.x+=0.1;
        ombro.scale.y+=0.1;
        ombro.scale.z+=0.1;
    }
    if (e.keyCode == 189){ // -
        ombro.scale.x-=0.1;
        ombro.scale.y-=0.1;
        ombro.scale.z-=0.1;
    }
}

window.onload = this.init;