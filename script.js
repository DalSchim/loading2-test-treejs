import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.4;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// background sky
var loader = new THREE.TextureLoader();
loader.load('sky.jpg', function (texture) { scene.background = texture; });
// load model

var loader = new GLTFLoader();  // Utilisez simplement 'GLTFLoader' sans 'THREE.' avant


var loadedObject;  // Ajoutez une variable pour stocker l'objet chargé
function animate() {
    requestAnimationFrame(animate);

    // Assurez-vous que l'objet est chargé avant de tenter de le faire pivoter
    if (loadedObject) {
        loadedObject.rotation.y += 0.02;  // Rotation de l'objet
    }
    renderer.render(scene, camera);
}

loader.load('scene.gltf', function (gltf) {
    loadedObject = gltf.scene;
    loadedObject.scale.set(1, 1, 1);  // Mise à l'échelle du modèle
    loadedObject.position.set(0, -0.65, 0);  // Positionnement du modèle
    scene.add(loadedObject);
    animate();  // Animation démarre une fois le modèle chargé
});

var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
var directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(0, 0, 6).normalize();
scene.add(directionalLight);