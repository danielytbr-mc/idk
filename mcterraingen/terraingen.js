const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#c') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(1, 0.75, 0.5)
scene.add(dirLight);
let zoomlevel = -10
camera.position.set(10 - zoomlevel, 10 - zoomlevel, 10 - zoomlevel);
camera.lookAt(0, 0, 0);

function newCube(x, y, z, color = Math.floor(Math.random() * 0xffffff)) {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshLambertMaterial({ color: color });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  const f = Math.floor;
  cube.position.set(f(x), f(y), f(z))
}

function iterateCubes(scene) {
  scene.children.forEach(function (object) {
    if (object instanceof THREE.Mesh) {
      if (object.geometry instanceof THREE.BoxGeometry) {
        console.log("Found a cube:", object);
      }
    }
  });
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

let [w, h, s, m] = [48, 48, 7, 7];

for (i in new Array(w).fill(null)) {
  for (j in new Array(h).fill(null)) {
    newCube(i - w / 2, PerlinNoise.noise2D(i / s, j / s) * m, j - h / 2, 0x00aa00)
  }
}
iterateCubes(scene);