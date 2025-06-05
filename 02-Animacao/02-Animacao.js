// Hello World em Three.js

import * as THREE from 'three';

let renderer 	= null,
	scene 		= null,
	camera 		= null;

let t_ant 		= 0.0,
	sum_delta 	= 0.0;

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

	scene 	= new THREE.Scene();
	camera 	= new THREE.Camera();

	renderer.render(scene, camera);

	requestAnimationFrame(anime)
};

// ************************************************************************
// **                                                                    **
// ************************************************************************
function anime(time) {

	sum_delta += clock.getDelta(); 	// Calculando o delta time

	if (sum_delta > 2.0) { 			// Se o delta time for maior que 4 segundos troca a cor de fundo
		renderer.setClearColor(new THREE.Color(Math.random(), Math.random(), Math.random()));
		renderer.render(scene, camera);
		sum_delta = 0.0;
	}

	requestAnimationFrame(anime);
}	

// ************************************************************************
// **                                                                    **
// ************************************************************************
function onWindowResize() {

	renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);
}

// ************************************************************************
// ************************************************************************
// ************************************************************************
main()
