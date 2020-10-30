var scene;
var camera;
var renderer;

var cube;

var criaCubo = function(){
    var geometria = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshBasicMaterial({color: "blue"});

    cube = new THREE.Mesh(geometria, material);

    scene.add(cube);
};


var scene;
var camera;
var renderer;

var velocity = 0.1;
var velocityY = 0.1;
var velocityZ = 0.1;



var createACube = function() {
    var geometry = new THREE.BoxGeometry( 10, 10, 10 );

    red = new THREE.Color(1, 0, 0);
    green = new THREE.Color(0, 1, 0);
    blue = new THREE.Color(0, 0, 1);
    var colors = [red, green, blue]; //Constitui as cores.

    for (var i = 0; i < 3; i++){ //Colore as faces do cubo considenrando as faces opostas com a mesma cor
        geometry.faces[4*i].color = colors[i];    
        geometry.faces[4*i+1].color = colors[i];
        geometry.faces[4*i+2].color = colors[i];    
        geometry.faces[4*i+3].color = colors[i];
    }
    
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: true});

    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
};

var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.createACube();

    camera.position.z = 100;

    document.addEventListener('keydown', leDoTeclado);

    render();

};

var render = function() {
    //this.animateCube(); //Essa funÃ§Ã£o faz a animaÃ§Ã£o sozinha.
   
   requestAnimationFrame( render );
  renderer.render( scene, camera );
};


var animateCube = function() {

    if (cube.position.x >= 50  ||  cube.position.x <=(-65) ) { //GAMBIARA
        console.log("Trocou a posiÃ§ao: " + cube.position.x);
        velocity=velocity*(-1);
    }
    if (cube.position.y >= 30  ||  cube.position.y <=(-30) ) { //GAMBIARA
        console.log("Trocou a posiÃ§ao: " + cube.position.y);
        velocityY=velocityY*(-1);
    }

    if (cube.position.z >= 20  ||  cube.position.z <=(-20) ) { //GAMBIARA
        console.log("Trocou a direÃ§Ã£o de Z: " + cube.position.z);
        velocityZ=velocityZ*(-1);
    }
    cube.position.x += velocity;
    cube.position.y += velocityY;
    cube.position.z += velocityZ;



    cube.rotation.x += 0.01;
    cube.rotation.y += 0.001;


};


var rodaCuboPorBaixoDosPanos = function(){ //rotaciona o cubo, utilizada por baixo dos panos.
        
    var roatacaoQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.01, 0.01, 0, 'XYZ'));
    cube.quaternion.multiplyQuaternions(roatacaoQuaternion, cube.quaternion);
    
    console.log(cube.quaternion);
}


var leDoTeclado = function(e){
    console.log("UsuÃ¡rio apertou a tecla: " + e.keyCode);

    if (e.keyCode == 32){ //tecla " " espaÃ§o
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;
    }
    if (e.keyCode == 38){
        cube.position.y +=velocityY;
    }
};

window.onload = this.init;
