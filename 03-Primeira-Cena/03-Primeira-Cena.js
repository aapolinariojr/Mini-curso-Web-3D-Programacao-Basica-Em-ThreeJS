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

	scene 	= new THREE.Scene();
	camera 	= new THREE.Camera();

	let geometriaPlano 	= new THREE.PlaneGeometry(10, 10, 1, 1); 
	let materialPlano	= new THREE.MeshBasicMaterial({color: 0xffffff});
	
	let plano 			= new THREE.Mesh(geometriaPlano, materialPlano);
	scene.add(plano);

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
