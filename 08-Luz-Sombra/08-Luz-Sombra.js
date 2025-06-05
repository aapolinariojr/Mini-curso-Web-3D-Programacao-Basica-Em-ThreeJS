// Hello World em Three.js

import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

let renderer 	= null,
	scene 		= null,
	camera 		= null;

let controls 	= null; 				// Variável para os controles da câmera

let clock 		= new THREE.Clock(); 	// Usado para controlar o tempo de animação

let upBola 		= 0.1; 					// Variável para controlar a velocidade de subida da bola

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

	CriaCenario();
	adcionaObjetos();

	renderer.render(scene, camera);
	requestAnimationFrame(anime);
};

// ************************************************************************
// **                                                                    **
// ************************************************************************
function adcionaObjetos() {

	let bola 			= new THREE.Mesh(	new THREE.SphereGeometry(1.5), 
											new THREE.MeshLambertMaterial({color: 0x00ff00}) );
	bola.position.set(0, 1.5, 0); 				// Ajustando a posição da bola
	bola.castShadow = true; 					// Habilitando a sombra da bola

	bola.name = "bola";
	scene.add(bola);

	let rosca 			= new THREE.Mesh(	new THREE.TorusGeometry(1.0, 0.2), 
											new THREE.MeshLambertMaterial({color: 0xff0000}) );

	rosca.position.set(5.0, 2.2, 0.0); 			// Ajustando a posição da bola
	rosca.castShadow = true; 						// Habilitando a sombra da rosca

	rosca.name = "rosca";
	scene.add(rosca);

	let cubo 			= new THREE.Mesh(	new THREE.BoxGeometry(1.5, 1.5, 1.5), 
											new THREE.MeshLambertMaterial({color: 0x0000ff}) );

	cubo.position.set(0, 1.7, 5.0); 				// Ajustando a posição da bola
	cubo.castShadow = true; 						// Habilitando a sombra do cubo
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

	let plano 			= new THREE.Mesh(	new THREE.PlaneGeometry(500, 500, 1, 1), 
											new THREE.MeshLambertMaterial({color: 0xcccccc}) );

	plano.rotation.x = -Math.PI / 2; 	// Rotacionando o plano para ficar horizontal
	plano.position.y = -0.2; 			// Ajustando a posição do plano para ficar abaixo da câmera

	plano.receiveShadow = true; 		// Habilitando o recebimento de sombra pelo plano

	console.log(plano);

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

	let bola = scene.getObjectByName("bola");
	let rosca = scene.getObjectByName("rosca");
	let cubo = scene.getObjectByName("cubo");

	if (bola) {
		// Atualizando a rotação da bola
		bola.position.y += upBola;
		if ( (bola.position.y > 7.0) || (bola.position.y < 1.1) )
			upBola *= -1.0;
		}

	if (rosca) {
		// Atualizando a rotação da rosca
		rosca.rotation.x += 0.01;
		rosca.rotation.y += 0.02;
		rosca.rotation.z += 0.05;
		}

	if (cubo) 
		// Atualizando a rotação do cubo
		cubo.rotateOnAxis(new THREE.Vector3(1, 1, 1), 0.01);
		

	renderer.shadowMap.needsUpdate = true; // Necessário para atualizar o mapa de sombras
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
