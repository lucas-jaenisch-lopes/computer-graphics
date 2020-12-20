var scene;
var camera;
var renderer;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var direction = new THREE.Vector3(0, 0, 1);
var speed = 0;
var maxSpeed = 1;
var accel = 0.01;
var deaccel = 0.02;
var rotationSpeed = 0.05;

var ambientLight;

var bouding = [];
var boudingBox = [];
var boudingTree = [];

var loadedObject = [];
var objCarregado = [];
var vehicleLoaded = [];
var wheelLoaded = [];

var directionObject = [];

var objectLoader;
var textureLoader;


const noventa = Math.PI / 2;

init();
animate();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createCamera();
    createFloor();
    createVehicle();
    randomSpawner();
    directionalLight();
    render();


    ambientLight = new THREE.AmbientLight(0X000000);
    ambientLight.intensity = 1;

    renderer.shadowMap.enable = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    scene.add(new THREE.AmbientLight( 0x888888 ));

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
        case 83:    moveBackward = true; break;

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
        case 83:    moveBackward = false; break;

        case 39://direita
        case 68:    moveRight = false; break;

        case 37://esquerda
        case 65:    moveLeft = false; break;
    }
}

function createCamera(){
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set( 0, -100, 80 );
    camera.rotation.x = Math.PI / 4;
}

function directionalLight(){
    //corPixel = corPixel * corLuzDirecional * intensidade * tetha ... (integração das cores do ambeinte).

    directionalLight = new THREE.DirectionalLight(0xffffff, 1, 1000);
    directionalLight.position.y = 250;
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.left = 1000;
    directionalLight.shadow.camera.bottom = 1000;
    directionalLight.shadow.camera.right = -1000
    directionalLight.shadow.camera.top = -1000;

    directionalLight.target = ground;

    scene.add(directionalLight);
    scene.add(directionalLight.target);

    scene.add(new THREE.DirectionalLightHelper(directionalLight));

}

function randomSpawner(){

    fbxLoader = new THREE.FBXLoader();
    textureLoader = new THREE.TextureLoader();

    for (i=0; i<7; i++){
        createBox(Math.random()*40*(Math.random() > 0.5 ? -1: 1), Math.random()*40*(Math.random() > 0.5 ? -1: 1), 10 , 2, 2, 2, 0xFFFFFF);
        let voBH = new THREE.BoxHelper(objCarregado[i], 0xffff00);
        scene.add(voBH);
    }
}

function createVehicle(){

    fbxLoader = new THREE.FBXLoader();
    textureLoader = new THREE.TextureLoader();

    fbxLoader.load('assets/models/vehicle.fbx', function ( object ) {
        vehicleLoaded.push(object);
        object.scale.set(0.04, 0.04, 0.04);
        object.traverse( function ( child ) {
            if (child.isMesh) {
                child.material.map = textureLoader.load("assets/textura/correio.png");
                child.material.shininess = 0;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        object.castShadow = true;
        object.receiveShadow = true;

        object.rotation.y =  noventa * 2;
        object.rotation.x = noventa;
        scene.add(object);

        createWheel(100, 45, 120, 1, 0);
        createWheel(-100, 45, 120, 1, noventa*2);
        createWheel(100, 45, -120, 1, 0);
        createWheel(-100, 45, -120, 1, noventa*2);
    } );
}

function createFloor(){
    textureLoader = new THREE.TextureLoader();
    groundTexture = textureLoader.load('assets/textura/ground.png');

    material = new THREE.MeshStandardMaterial({map : groundTexture});
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 20, 20 );
    groundTexture.encoding = THREE.sRGBEncoding;
    groundTexture.anisotropy = 16;
    ground = new  THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100, 10),material);
    ground.position.y -= 6;

    ground.receiveShadow = true;

    scene.add(ground);
}

function createBox(position_x, position_y, position_z, x,y,z, color){
    fbxLoader.load('assets/models/box.fbx',function(object){
            objCarregado[i] = object;
            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/box.png");
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

            object.scale.x = 0.025;
            object.scale.y = 0.025;
            object.scale.z = 0.025;

            object.rotation.x = noventa;

            object.position.z = 0;
            object.position.x = position_x;
            object.position.y = position_y;

            object.castShadow = true;
            object.receiveShadow = true;

            scene.add(object);    
        },
    );
}

function createWheel(x, y, z ,scale, rotation){
    fbxLoader = new THREE.FBXLoader();
    textureLoader = new THREE.TextureLoader();
    fbxLoader.load('assets/models/wheel.fbx', function ( object ) {
        wheelLoaded.push(object);
        object.scale.set(scale, scale, scale);
        object.traverse( function ( child ) {
            if (child.isMesh) {
                child.material.map = textureLoader.load("assets/textura/correio.png");
            }
        });

        object.rotation.y =  noventa * 2;
        object.rotation.x = noventa;
        object.rotation.z = rotation;
        vehicleLoaded[0].add(object);

        object.position.x += x;
        object.position.y += y;
        object.position.z += z;
    } );
}

function rotateWheels(){

}

function animate(){
    requestAnimationFrame(animate);
    const time = performance.now();
        if(speed < -0.1 || speed > 0.1){
            if(speed < 0){     
                if(moveLeft){
                    vehicleLoaded[0].rotation.y += -rotationSpeed
                }
                if(moveRight){            
                    vehicleLoaded[0].rotation.y += rotationSpeed
                }
            }else{
                if(moveLeft){
                    vehicleLoaded[0].rotation.y += rotationSpeed
                }
                if(moveRight){            
                    vehicleLoaded[0].rotation.y += -rotationSpeed
                }
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
        vehicleLoaded[0].translateOnAxis(direction, speed);
}