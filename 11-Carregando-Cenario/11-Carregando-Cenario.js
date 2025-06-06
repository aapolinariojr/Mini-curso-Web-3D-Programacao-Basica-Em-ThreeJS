// Hello World em Three.js

import * as THREE 			from 'three';
import { OrbitControls } 	from 'OrbitControls';
import { GLTFLoader } 		from 'glTF-loaders';

let renderer 	= null,
	scene 		= null,
	camera 		= null;

let controls 	= null; 				// Variável para os controles da câmera

let clock 		= new THREE.Clock(); 	// Usado para controlar o tempo de animação

// ************************************************************************
// **                                                                    **
// ************************************************************************
function main() {

	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0), 1.0); 	// Definindo a cor de fundo do canvas
	renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);
	renderer.setPixelRatio( window.devicePixelRatio );				// Definindo a proporção de pixels do canvas
	renderer.toneMapping = THREE.ACESFilmicToneMapping; 			// Definindo o mapeamento de tons
	renderer.toneMappingExposure = 1.0; 							// Definindo a exposição

	document.getElementById("threejs-canvas").appendChild(renderer.domElement);

	window.addEventListener("resize", onWindowResize, false);

	scene = new THREE.Scene();

	// cria Mapeamento de Ambiente
	const path          = "../Assets/Textures/Cubemaps/skyboxsun25deg/";
	const textCubeMap   =    [  path + "px.jpg", 
								path + "nx.jpg",
								path + "py.jpg", 
								path + "ny.jpg",
								path + "pz.jpg", 
								path + "nz.jpg"
							];

	const textureCube       = new THREE.CubeTextureLoader().load( textCubeMap );
	scene.background        = textureCube;

	let gltfLoader 		= new GLTFLoader();
	gltfLoader.load("../Assets/Models/glTF/Sponza/Sponza.gltf", configuraCamera);
	gltfLoader.load('../Assets/Models/glTF/Sponza/Sponza-lights.gltf', configuraLuzes);

	const light = new THREE.AmbientLight( 0xaaaaaa ); // soft white light
	scene.add( light );	
};

// ************************************************************************
// **                                                                    **
// ************************************************************************
function defEnvMap(texture) {
	texture.mapping 	= THREE.EquirectangularReflectionMapping;
	scene.background 	= texture;
	scene.environment 	= texture;
}

// ************************************************************************
// **                                                                    **
// ************************************************************************
function configuraCamera(loadedMesh) {

	const root = loadedMesh.scene;
	root.name 	= "MalhaPoligonal";
	
	scene.add(root);
	
	const helper = new THREE.BoxHelper(); 	// Cria um BoxHelper para calcular a caixa delimitadora da malha carregada
	helper.setFromObject(root); 			// Calcula a caixa delimitadora da malha carregada

	helper.geometry.computeBoundingBox(); 	// Calcula a caixa delimitadora da geometria

	const max = helper.geometry.boundingBox.max; 	// Obtém o ponto máximo da caixa delimitadora
	const min = helper.geometry.boundingBox.min; 	// Obtém o ponto mínimo da caixa delimitadora

	let farPlane = Math.max(	(max.x - min.x),
								(max.y - min.y),
								(max.z - min.z) ) * 2.0;

	camera 	= new THREE.PerspectiveCamera(	75.0, 
											window.innerWidth*0.8 / window.innerHeight*0.8, 
											0.1, farPlane); 
	camera.position.x = 0.0;
	camera.position.y = max.y /2.0;
	camera.position.z = 0.0;

	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	camera.updateProjectionMatrix();


	scene.add(new THREE.AxesHelper(5.0, 5.0, 5.0)); 	// Adicionando um AxesHelper para visualização

	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

	renderer.render(scene, camera);
	requestAnimationFrame(anime);
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************
function configuraLuzes(loadedMesh) {

	const root 	= loadedMesh.scene;
	root.name 	= "Lights";
	scene.add(root);
	root.traverse((child) => {
		
		if (child.isLight) {
			child.intensity = 5.0;
			}
    });

}


// ************************************************************************
// **                                                                    **
// ************************************************************************
function anime(time) {

	controls.update(clock.getDelta()); // Atualizando os controles da câmera

	renderer.render(scene, camera);
	requestAnimationFrame(anime);
}

// ************************************************************************
// **                                                                    **
// ************************************************************************
function onWindowResize() {

	camera.aspect = window.innerWidth*0.8 / window.innerHeight*0.8; 	// Redefinindo a proporção da câmera

  	renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);
	renderer.render(scene, camera);
}

// ************************************************************************
// ************************************************************************
// ************************************************************************
main()
