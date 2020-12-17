var scene;
var camera;
var renderer;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var rotationSpeed = 0.05;

var direction = new THREE.Vector3(0, 1, 0);
var velocity = new THREE.Vector3(0, 0, 0);
var speed = 0;
var maxSpeed = 1;
var accel = 0.01;
var deaccel = 0.01;

const noventa = Math.PI / 2;

init();
animate();

function init() {

    scene = new THREE.Scene();

    createCamera();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createFloor();
    createVehicle();

    render();

    document.addEventListener('keydown', onKeyDown ); 
    document.addEventListener('keyup', onKeyUp );
};

function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
};

function onKeyDown(event){
    console.log(event.keyCode);

    switch(event.keyCode){

        case 38://cima
        case 87:    moveForward = true; break; 

        case 40://baixo
        case 83:    moveBackward = true; rotationSpeed *= -1; break;

        case 39://direita
        case 68:    moveRight = true; break;

        case 37://esquerda
        case 65:    moveLeft = true; break;
    }
}

function onKeyUp(event){
    switch(event.keyCode){

        case 38://cima
        case 87:    moveForward = false; break;

        case 40://baixo
        case 83:    moveBackward = false; rotationSpeed *= -1; break;

        case 39://direita
        case 68:    moveRight = false; break;

        case 37://esquerda
        case 65:    moveLeft = false; break;
    }
}

function createCamera(){
    camera = new THREE.PerspectiveCamera( 
        60                                          // angulo
        ,window.innerWidth / window.innerHeight     //aspect
        ,0.1                                       // Near
        ,1000                                      // Far
    );

    camera.position.set( 0, 0, 200 );
}

function createVehicle(){
    createCube( 10, -2.5, 10, 5, 10, 5, 0xFFFFFF);
    createWheel(3, 1, 0.15, cubo);
    createWheel(-3, 1, 0.15, cubo);
    createWheel(3, -3, 0.15, cubo);
    createWheel(-3, -3, 0.15, cubo);
}

function createFloor(){
    chao = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 100, 100, 10 ),
        new THREE.MeshBasicMaterial( { color: 0xf0000f})
    ); //Cria a forma plana

    // chao.rotation.x = - Math.PI / 2; // rotaciona para que ela fique paralela ao eixo X
    chao.position.y-=6; // Posiciona o ground abaixo da nossa figura.

    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    scene.add(pivot);
    scene.add(chao);
}

function createCube(position_x, position_y, position_z, x,y,z, color){
    var cubo_geometria = new THREE.BoxGeometry(x,y,z);
    var cubo_material = new THREE.MeshBasicMaterial({color: color, vertexColors: true});
    cubo = new THREE.Mesh(cubo_geometria, cubo_material);
    cubo.position.x = position_x;
    cubo.position.y = position_y;
    cubo.position.z = position_z;

    scene.add(cubo);
}

function createWheel(x, y, scale, vehicle){
    var wheel_geometry = new THREE.TorusGeometry( 5, 3, 8, 100 );
    wheel_material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    wheel = new THREE.Mesh( wheel_geometry, wheel_material );
    wheel.rotation.x = noventa;
    wheel.position.x += x;
    wheel.position.y += y;
    wheel.rotation.y = noventa;
    wheel.scale.x = scale;
    wheel.scale.y = scale;
    wheel.scale.z = scale;
    vehicle.add(wheel);
}

function animate(){
    requestAnimationFrame(animate);
    const time = performance.now();
        if(speed < -0.1 || speed > 0.1){
            if(moveLeft){
                cubo.rotation.z += rotationSpeed
            }
            if(moveRight){            
                cubo.rotation.z += -rotationSpeed
            }
        }
        if(moveForward){
            speed += accel;
            if(speed > maxSpeed){
                speed = maxSpeed
            }
        }
        if(moveBackward){
            speed -= accel;
            if(speed < -maxSpeed){
                speed = -maxSpeed
            }
        }
        if(!moveForward && !moveBackward){
            if(speed > 0){
                speed -= deaccel;
                if(speed < 0){
                    speed = 0;
                }
            }else{
                speed -= -deaccel;
                if(speed > 0){
                    speed = 0;
                }
            }
        }

        cubo.translateOnAxis(direction, speed);
}