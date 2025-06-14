// Hello World em Three.js

import * as THREE from 'three';

let renderer 	= null,
	scene 		= null,
	camera 		= null;

// ************************************************************************
// **                                                                    **
// ************************************************************************
function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);

	document.getElementById("threejs-canvas").appendChild(renderer.domElement);

	window.addEventListener("resize", onWindowResize, false);

	scene 			= new THREE.Scene();
	camera 			= new THREE.PerspectiveCamera();
	
	let plano 			= new THREE.Mesh(	new THREE.PlaneGeometry(500, 500, 1, 1), 
											new THREE.MeshBasicMaterial({color: 0x055904}) );

	plano.rotation.x = -Math.PI / 2; 	// Rotacionando o plano para ficar horizontal
	plano.position.y = -1.0; 			// Ajustando a posição do plano para ficar abaixo da câmera
	plano.name = "plano"; 				// Nomeando o plano
	scene.add(plano);

	scene.add(new THREE.AxesHelper(5.0, 5.0, 5.0)); // Adicionando um AxesHelper para visualização

	renderer.render(scene, camera);
};

// ************************************************************************
// **                                                                    **
// ************************************************************************
function onWindowResize() {

  	renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);
	renderer.render(scene, camera);
}

// ************************************************************************
// ************************************************************************
// ************************************************************************
main()
