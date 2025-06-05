// Hello World em Three.js

import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

let renderer 	= null,
	scene 		= null,
	camera 		= null;

let controls 	= null; 				// Variável para os controles da câmera

let clock 		= new THREE.Clock(); 	// Usado para controlar o tempo de animação

let tex 		= null, 				// Variável para a textura
 	texNormal 	= null; 				// Variável para a textura normal

// ************************************************************************
// **                                                                    **
// ************************************************************************
function main() {

	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0), 1.0); 	// Definindo a cor de fundo do canvas
	renderer.shadowMap.enabled = true; 								// Habilitando o mapa de sombras
	renderer.shadowMap.autoUpdate = true; // Atualizando automaticamente o mapa de sombras	
	renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);

	renderer.physicallyCorrectLights	= true; // Habilitando o uso de luzes fisicamente corretas
	renderer.shadowMap.enabled 			= true; // Habilitando o mapa de sombras

	document.getElementById("threejs-canvas").appendChild(renderer.domElement);

	window.addEventListener("resize", onWindowResize, false);

	carregaTexturas(); 
	CriaCenario();
	adcionaObjetos();

	renderer.render(scene, camera);
	requestAnimationFrame(anime);
};

// ************************************************************************
// **                                                                    **
// ************************************************************************
function carregaTexturas() {
	let textureLoader = new THREE.TextureLoader(); 

	tex 		= textureLoader.load("../Assets/Textures/ash_uvgrid01.jpg"); 	
	texNormal 	= textureLoader.load("../Assets/Textures/normalmaps/NormalMap.png");
}

// ************************************************************************
// **                                                                    **
// ************************************************************************
function adcionaObjetos() {

	let matBola = new THREE.MeshPhongMaterial({	color: 0x00ff00,
												specular: 0xffffff,
												shininess: 30.0 }); 

	let matCubo = new THREE.MeshPhongMaterial({	color: 0x0000ff,
												specular: 0xffffff,
												shininess: 100.0,
												normalMap: texNormal
												}); 

	let matRosca = new THREE.MeshPhongMaterial({color: 0x0000ff,
												specular: 0xffffff,
												shininess: 100.0,
												emissive: 0x330033  }); 

	let bola 			= new THREE.Mesh(	new THREE.SphereGeometry(1.5), 
											matBola);
	bola.position.set(0, 1.5, 0); 
	bola.castShadow = true; 

	bola.name = "bola";
	scene.add(bola);

	let rosca 			= new THREE.Mesh(	new THREE.TorusGeometry(1.0, 0.2), 
											matRosca );

	rosca.position.set(5.0, 2.2, 0.0); 			
	rosca.castShadow = true; 					

	rosca.name = "rosca";
	scene.add(rosca);

	let cubo 			= new THREE.Mesh(	new THREE.BoxGeometry(1.5, 1.5, 1.5), 
											matCubo );

	cubo.position.set(0, 1.7, 5.0); 				
	cubo.castShadow = true; 						
	cubo.name = "cubo";
	scene.add(cubo);
}

// ************************************************************************
// **                                                                    **
// ************************************************************************
function CriaCenario() {

	scene 			= new THREE.Scene();
	camera 			= new THREE.PerspectiveCamera(	75.0, 
													window.innerWidth*0.8 / window.innerHeight*0.8, 
													0.1, 500.0); 

	camera.position.set(8.0, 8.0, 8.0); 	// Definindo a posição da câmera
	camera.lookAt(new THREE.Vector3(0, 0, 0)); // Definindo o ponto de vista da câmera

	let material = new THREE.MeshLambertMaterial({ map : tex });

	let plano 			= new THREE.Mesh(	new THREE.PlaneGeometry(500, 500, 1, 1), 
											material ); 											
											

	plano.rotation.x = -Math.PI / 2; 	// Rotacionando o plano para ficar horizontal
	plano.position.y = -0.2; 			// Ajustando a posição do plano para ficar abaixo da câmera

	plano.receiveShadow = true; 		// Habilitando o recebimento de sombra pelo plano

	plano.name = "plano"; 				// Nomeando o plano
	scene.add(plano);

	scene.add(new THREE.AxesHelper(5.0, 5.0, 5.0)); // Adicionando um AxesHelper para visualização

	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

	let luzPontual = new THREE.PointLight(0xffffff, 170.0, 0.0); // Criando uma luz pontual
	luzPontual.position.set(0.0, 12.0, 0.0); // Definindo a posição da luz pontual
	luzPontual.castShadow = true; // Habilitando a sombra da luz pontual
	luzPontual.shadow.mapSize.width = 1024; // Definindo o tamanho do mapa de sombras

	scene.add(luzPontual); // Adicionando a luz pontual à cena
	scene.add(new THREE.PointLightHelper(luzPontual, 0.5)); // Adicionando um helper para a luz pontual

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
