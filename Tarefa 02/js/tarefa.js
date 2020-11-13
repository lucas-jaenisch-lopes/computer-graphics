var scene;
var camera;
var renderer;

var esfera;
var speedx = 0.5;
var speedy = 0.5;

var criaCubo = function (){
    var geometry = new THREE.SphereGeometry(10, 10, 10); //cria a mesh
    var material = new THREE.MeshBasicMaterial({color: "red"}); //cria o material

    esfera = new THREE.Mesh(geometry, material); //instancia a mesh com o material

    scene.add(esfera);
};

var render = function(){
    requestAnimationFrame(render);
    animaCubo();
    renderer.render(scene, camera);
};

var animaCubo = function(){
    if(this.esfera.position.x >= 60 || this.esfera.position.x <= -60){
        speedx *= -1;
    }
    if(this.esfera.position.y >= 30 || this.esfera.position.y <= -30){
        speedy *= -1;
    }

    this.esfera.position.x += speedx;
    this.esfera.position.y += speedy;
    console.log("Tamanho tela " + this.window.innerWidth);
}

var init = function (){
    scene = new THREE.Scene(); //cria cena
    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000); //40 campo de visao(angulo), padrao de tamanho, indo do 1 para a distancia 1000

    renderer = new THREE.WebGLRenderer(); //crian renderer, uma janela
    renderer.setSize(window.innerWidth, window.innerHeight); //seta o tamanho do renderer
    document.body.appendChild(renderer.domElement); //adiciona ao corpo da pagina
    
    camera.position.z = 100;

    criaCubo();

    render(); //desenha tela em loop
};

window.onload = this.init;