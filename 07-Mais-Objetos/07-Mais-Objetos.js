// Hello World em Three.js

import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

let renderer 	= null,
	scene 		= null,
	camera 		= null;

let controls 	= null; 				// Variável para os controles da câmera

let clock 		= new THREE.Clock(); 	// Usado para controlar o tempo de animação

// ************************************************************************
// **                                                                    **
// ************************************************************************
function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);

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
											new THREE.MeshBasicMaterial({color: 0x00ff00}) );
	bola.position.set(0, 5.0, 0); 				// Ajustando a posição da bola

	bola.name = "bola";
	scene.add(bola);

	let rosca 			= new THREE.Mesh(	new THREE.TorusGeometry(1.0, 0.2), 
											new THREE.MeshBasicMaterial({color: 0xff0000}) );

	rosca.position.set(5.0, 1.2, 0.0); 			// Ajustando a posição da bola

	rosca.name = "rosca";
	scene.add(rosca);

	let cubo 			= new THREE.Mesh(	new THREE.BoxGeometry(1.5, 1.5, 1.5), 
											new THREE.MeshBasicMaterial({color: 0x0000ff}) );

	cubo.position.set(0, 0.8, 5.0); 				// Ajustando a posição da bola
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
											new THREE.MeshBasicMaterial({color: 0xcccccc}) );

	plano.rotation.x = -Math.PI / 2; 	// Rotacionando o plano para ficar horizontal
	plano.position.y = -0.2; 			// Ajustando a posição do plano para ficar abaixo da câmera

	console.log(plano);

	plano.name = "plano"; 				// Nomeando o plano
	scene.add(plano);

	let grid = new THREE.GridHelper(500, 100, 0xffffff, 0xbbbbbb); 	// Criando um GridHelper para visualização
	grid.position.y = -0.1; 											// Ajustando a posição do grid para ficar abaixo da câmera
	scene.add(grid); 

	scene.add(new THREE.AxesHelper(5.0, 5.0, 5.0)); // Adicionando um AxesHelper para visualização

	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();
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
