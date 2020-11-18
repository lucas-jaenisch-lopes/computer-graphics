var scene;
var camera;
var renderer;

var velocity = 2;

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

var criaCubo = function(position_x, position_y, position_z, x,y,z, color){
    var cubo_geometria = new THREE.BoxGeometry(x,y,z);
    var cubo_material = new THREE.MeshBasicMaterial({color: color, vertexColors: true});
    cubo = new THREE.Mesh(cubo_geometria, cubo_material);
    cubo.position.x = position_x;
    cubo.position.y = position_y;
    cubo.position.z = position_z;

    scene.add(cubo);
    pintaCubo(cubo_geometria, colors);
}

var reposiciona = function(position_x, position_y, position_z, objeto){
    objeto.position.x = position_x;
    objeto.position.y = position_y;
    objeto.position.z = position_z;
}

var init = function() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 
                                60                                          // angulo
                                ,window.innerWidth / window.innerHeight     //aspect
                                ,0.1                                       // Near
                                ,1000                                      // Far
                            );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.criaCubo( 10, -2.5, 10, 5, 5, 5, 0x333333);
    // this.criaCubo( 0, -2.5, 0, 5, 5, 5, 0x770777);
    cone_geometry = new THREE.ConeBufferGeometry( 5, 20, 32 );
    cone_material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    cone = new THREE.Mesh( cone_geometry, cone_material );
    this.reposiciona(0, 2.5, 0, cone);
    scene.add(cone);
    // this.criaCubo( -20, -2.5, 40, 5, 5, 5, 0xff00ff);
    cilindro_geometry = new THREE.CylinderBufferGeometry( 5, 5, 20, 32 );
    cilindro_material = new THREE.MeshBasicMaterial( {color: 0x006400} );
    cilindro = new THREE.Mesh( cilindro_geometry, cilindro_material );
    scene.add(cilindro);
    this.reposiciona(-20, 5, 40, cilindro);
    scene.add(cilindro);
    // this.criaCubo( 30, -2.5, 20, 5, 5, 5, 0xfaaaff);
    dodecaedro_material = new THREE.MeshStandardMaterial( { color: 0x006400 } );
    dodecaedro_geometry = new THREE.DodecahedronBufferGeometry(2,0);
    dodecaedro = new THREE.Mesh(dodecaedro_geometry, dodecaedro_material);
    this.reposiciona(20, -4, 20, dodecaedro);
    scene.add(dodecaedro);
    this.criaCubo( -30, -2.5, -40, 5, 5, 5, 0xaaaaaa);
   
	camera.position.set( 0, 20, 100 );

    //Essas linhas criam o gridView, lembrando que ele basicamente Ã© sÃ³ uma grade de linhas no eixo X
    //scene.add( new THREE.GridHelper( 400, 40 ) );
    
   /*Para criar o plano */
   chao = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 100, 100, 10 ),
        new THREE.MeshBasicMaterial( { color: 0xf0000f})
    ); //Cria a forma plana

    chao.rotation.x = - Math.PI / 2; // rotaciona para que ela fique paralela ao eixo X
    chao.position.y-=6; // Posiciona o ground abaixo da nossa figura.

    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    scene.add(pivot);
    scene.add(chao);

    render();

    document.addEventListener('keydown', onKeyDown ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;

var onKeyDown = function(e){
    console.log(e.keyCode);

    if(e.keyCode == 38){//cima
        camera.position.y+=velocity;
    }
    if(e.keyCode == 40){//baixo
        camera.position.y+=-velocity;
    }

    if(e.keyCode == 39){//direita
        camera.position.x+=velocity;
    }
    if(e.keyCode == 37){//esquerda
        camera.position.x+=-velocity;
    }

    if(e.keyCode == 81){//pra frente
        camera.position.z+=velocity;
    }
    if(e.keyCode == 69){//pra tras
        camera.position.z+=-velocity;
    }

    if (e.keyCode == 32){
        camera.rotation.y+=rotationVelocity;
    }
}

window.onload = this.init;
