import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


// SCENE keeps all the objects like camera and renderer as a container
const scene= new THREE.Scene();

const camera= new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.setZ(30);
renderer.render(scene,camera);
//  Added Gemeotry
const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});

// gemotry+material =mesh

const torus = new THREE.Mesh(geometry,material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientlight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientlight)

const lighthelper = new THREE.PointLightHelper(pointLight)
//  Grid =helper draws a 3 dimentional grid in the scene
const gridhelper = new THREE.GridHelper(200,50);

scene.add(lighthelper,gridhelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
   const material = new THREE.MeshStandardMaterial({color:0xffffff})
    const star = new THREE.Mesh(geometry,material);

    // position of each star randfloatspread that generates randomly positive and negative function
    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));


    star.position.set(x,y,z);
    scene.add(star)
}
Array(200).fill().forEach(addStar)

// avatar last
// const jeffTexture = new THREE.TextureLoader().load('moon.jpeg');

// const jeff = new THREE.Mesh(
//   new THREE.SphereGeometry(40),
//   new THREE.MeshBasicMaterial({ map: jeffTexture})
// );

// scene.add(jeff);

//Moon

const moonTexture =new THREE.TextureLoader().load('moon.jpg');
const normalTexture= new THREE.TextureLoader().load('normal.jpg');

const moon= new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({ map: moonTexture,normalMap:normalTexture})
);

scene.add(moon);
const spaceTexture = new THREE.TextureLoader().load('earth.jpg');
scene.background = spaceTexture;


function animate(){
  requestAnimationFrame(animate);
   torus.rotation.x += 0.01;
   torus.rotation.y += 0.005;
   torus.rotation.z +=0.03;
   controls.update();
  renderer.render(scene,camera);
  
}
animate();




