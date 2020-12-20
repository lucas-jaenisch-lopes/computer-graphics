var scene;
var camera;
var renderer;
var controls;

var velocity = 0.1;

var ambientLight;

var ground;

var objLoader;
var textureLoader;

// var spotLight;

var obj; //objeto dinamico.

var objCarregado = [];

var char = [];

var texture;

const clock = new THREE.Clock();
var mixer,action;

var guiFunction = function(){
    const gui = new dat.GUI();

    var parametroQualquer;

    param = {
        campoTexto: "Teste Texturas",
        escala: 1,
        cor: "#000000",
        x:0,
        y:0,
        z:0,
        animais: ""
    };    

    var pastAmb = gui.addFolder("Luz Ambiente");

    gui.add(param, 'campoTexto').name("nome obj");

    
    
    var scale = gui.add(param, 'escala').min(0.1).max(5).step(0.1).name("escala");
    scale.onChange(function (parametroQualquer){
        objCarregado.scale.x = parametroQualquer;
        objCarregado.scale.y = parametroQualquer;
        objCarregado.scale.z = parametroQualquer;
    });


    var colore = gui.addColor(param, 'cor').name("Cor Obj");
    colore.onChange(function (parametroQualquer){
        
        ambientLight.color.setHex(parametroQualquer.replace("#", "0x"));
        //cotovelo.material.color.setHex(parametroQualquer.replace("#", "0x"));
    });


    var pastaPosicao = gui.addFolder("Posicao");

    var posX = pastaPosicao.add(param, 'x').min(-30).max(30).step(1).name("x");
    posX.onChange(function (parametroQualquer){
        objCarregado.position.x = parametroQualquer;
    });

    var posY = pastaPosicao.add(param, 'y').min(-30).max(30).step(1).name("y");
    posY.onChange(function (parametroQualquer){
        objCarregado.position.y = parametroQualquer;
    });

    var posZ = pastaPosicao.add(param, 'z').min(-30).max(30).step(1).name("z");
    posZ.onChange(function (parametroQualquer){
        objCarregado.position.z = parametroQualquer;
    });
    
    var chGeometry = gui.add(param, 'animais', ['Bebe Rex', 'Spinossauro', 'Rex', 'Raptor', 'Bebe Brachiossauro', 'Bebe Triceratops', 'Triceratops' ]).name("Elementos");
    chGeometry.onChange(function(parametroQualquer){
        
        if (parametroQualquer == 'Bebe Rex'){
            camera.lookAt(objCarregado[0].position);
        }else if (parametroQualquer == 'Spinossauro'){
            camera.lookAt(objCarregado[1].position);
        }else if (parametroQualquer == 'Rex'){
            camera.lookAt(objCarregado[2].position);
        }else if (parametroQualquer == 'Raptor'){
            camera.lookAt(objCarregado[3].position);
        }else if (parametroQualquer == 'Bebe Brachiossauro'){
            camera.lookAt(objCarregado[4].position);
        }else if (parametroQualquer == 'Bebe Triceratops'){
            camera.lookAt(objCarregado[5].position);
        }else if (parametroQualquer == 'Triceratops'){
            camera.lookAt(objCarregado[6].position);
        }
        
    });

    gui.open();
   
};


var criaGround = function (){

    textureLoader = new THREE.TextureLoader();
    
    groundTexture = textureLoader.load('assets/textura/terrain/grasslight-big.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 20, 20 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;
    material = new THREE.MeshBasicMaterial({map : groundTexture});
    
    material.normalMap =  textureLoader.load('assets/textura/terrain/grasslight-big-nm.jpg');

    ground = new  THREE.Mesh(
        new THREE.PlaneGeometry(1050, 1050, 25,25),
        material
    );

    ground.rotation.x -= Math.PI / 2;
    ground.position.y=-2;

    scene.add(ground);
};

var loadObj = function(){
    objLoader = new THREE.OBJLoader();
    fbxLoader = new THREE.FBXLoader();
    textureLoader = new THREE.TextureLoader();
 

    for (i=0; i<7; i++){
        objLoader.load(
            'assets/models/tree.obj', //arquivo que vamos carregar
            function(object){
                
                object.traverse( function ( child ) {
                            if ( child instanceof THREE.Mesh ) {
                                child.material.map = textureLoader.load("assets/textura/Wood.jpg");
                                //child.material.shininess = 0;
                            }
                        });

                object.scale.x =50;
                object.scale.y = 50;
                object.scale.z = 50;

                object.position.z = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
                object.position.x = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
                
                object.position.y = -1;

                object.AmbientLight


                //object.rotation.y += 1;

                object.castShadow = true;

            // camera.lookAt(objCarregado.position)

                scene.add(object);    
            },//metodo, tudo deu certo
            function( andamento) {
                console.log((andamento.loaded / andamento.total *100) + "% pronto!");
            },//metodo executa enquanto carrega
            function (error){
                console.log("Deu caca: " + error);
            } //metodo deu merda
        );
    }

    fbxLoader.load(
        'assets/models/babyrex.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[0] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/correio.png");
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.1;
            object.scale.y = 0.1;
            object.scale.z = 0.1;

            object.position.z = 0;
            object.position.x = 5;
            object.position.y = -5;


            object.rotation.y += 1;

            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/spinossaurus.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[1] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/spino_color.png");
                            child.material.normalMap = 
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.1;
            object.scale.y = 0.1;
            object.scale.z = 0.1;

            object.position.z = -40;
            object.position.x = 70;
            object.position.y = 0;          

            object.rotation.y -= 1.25;
            // object.rotation.x -= 0.85;
            // object.rotation.z -= 0.15;

            // object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/rex.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[2] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            texture = textureLoader.load("assets/textura/rex_color.png");
                            texture.mapSize = 1;
                            child.material.map = texture;
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.1;
            object.scale.y = 0.1;
            object.scale.z = 0.1;

            object.position.z = 0;
            object.position.x = 5;
            object.position.y = 0;

            object.rotation.y += 1;

            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/raptor.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[3] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/raptor_color.png");
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.1;
            object.scale.y = 0.1;
            object.scale.z = 0.1;

            object.position.z = 0;
            object.position.x = 5;
            object.position.y = 0;

            object.rotation.y += 1;

            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/babybrachio.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[4] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/brachio_color.png");
                            child.material.shininess = 0;
                            
                        }
                    });

            object.scale.x = 0.02;
            object.scale.y = 0.02;
            object.scale.z = 0.02;

            object.position.z = 40;
            object.position.x = 40;
            object.position.y = -2;

            object.rotation.y += -20;

            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/babytriceratops.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[5] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/triceratops_color.png");
                            child.material.shininess = 0;
                            
                        }
                    });

            object.scale.x = 0.02;
            object.scale.y = 0.02;
            object.scale.z = 0.02;

            object.position.z = 70;
            object.position.x = 20;
            object.position.y = 0;

            object.rotation.y += 1;

            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(
        'assets/models/triceratops.fbx', //arquivo que vamos carregar
        function(object){
            objCarregado[6] = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/triceratops.png");
                            child.material.shininess = 0;
                        }
                    });

            object.scale.x = 0.04;
            object.scale.y = 0.04;
            object.scale.z = 0.04;

            object.position.z = 30;
            object.position.x = 200;
            object.position.y = 0;

            object.rotation.y += 6;

            object.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(object);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

}

var init = function() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //createACube();

    loadObj();
   
    camera.position.z = 100;
    camera.position.y = 30;


    //Iluminação 
    //Não se preocupe com essa parte por enquanto, apenas usem :)
    // spotLight = new THREE.SpotLight( 0xffffff , 0.5);
    // scene.add(spotLight);
    // spotLight.position.set( 100, 100, 100 );
    // spotLight.castShadow = true;
    // spotLight.shadow.mapSize.width = 0;
    // spotLight.shadow.mapSize.height = 0;
    // spotLight.shadow.camera.near = 1;
    // spotLight.shadow.camera.far = 99;
    // spotLight.shadow.camera.fov = 40;

    ambientLight = new THREE.AmbientLight(0X888888);
    ambientLight.intensity = 1.3;

    // scene.add(ambientLight);

    renderer.shadowMap.enable = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    //controls = new THREE.OrbitControls( camera, renderer.domElement );
    
    scene.add(new THREE.AmbientLight( 0x888888 ));

    criaGround();

    guiFunction();
    
    scene.fog = new THREE.Fog( 0xcce0ff, 200, 500 );

    render();
    //  synchronizeCrossFade( ) ;
    
    document.addEventListener('keydown', onKeyDown ); 

    document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    document.addEventListener('mouseup', onMouseUp ); 
    document.addEventListener('mousemove', onMouseMouse ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    const delta = clock.getDelta();

	if ( mixer ) mixer.update( delta );
    
   // controls.update();
    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;

var onKeyDown = function(e){
    console.log(e.keyCode);
    if(e.keyCode == 37){
        obj.position.x-=velocity;
    }
    if(e.keyCode == 38){
        if (camera.position.y >=0)
            camera.position.y-= 1;
    }
    if(e.keyCode == 40){
        camera.position.y+= 1;
    }
    if (e.keyCode == 32){ //espaço -> rotação pelo pivo.
       camera.lookAt(objCarregado[1].position);
    }
    if(e.keyCode == 87){
        camera.position.z-= 0.5;
    }
    if(e.keyCode == 83){
        camera.position.z+= 0.5;
    }
    
}


var posicaoMouser = { //controla a posição do mouser
    x: 0,
    y: 0
};

var cliquePressionado = false; //para controlar o tempo que o cara esta pressionando o botao do mouser

var onMouseDown = function(e){
    cliquePressionado = true;
    //console.log("Apertou Clicou")
}


var onMouseUp = function(e){
    cliquePressionado = false;
  //  console.log("SOltou o clique");
}


var onMouseMouse = function (e){
    if (cliquePressionado){

        var deltaMovimento = {
            x: e.offsetX - posicaoMouser.x,
            y: e.offsetY - posicaoMouser.y,
        }

        //cube.position.x += deltaMovimento.x*0.01;
        //cube.position.y += deltaMovimento.y*0.01*-1;

      // camera.rotation.x += toRadians(deltaMovimento.y*0.5)*0.1;
       camera.rotation.y += toRadians(deltaMovimento.x*0.1)*0.1;
      
    }

    posicaoMouser = {  //nova posição do mouser
        x : e.offsetX,
        y : e.offsetY
    };
}

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

var stop = false;