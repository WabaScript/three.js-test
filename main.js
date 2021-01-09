const scene = new THREE.Scene();

// (FOV, aspect, nearPlane, farPlane)
const camera = new THREE.PerspectiveCamera( 
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// enable anti-aliasing for smoother edges (perf decrease)
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
const cube = new THREE.Mesh( geometry, material );
scene.add(cube);

// adjust camera
camera.position.z = 5

// animate the scene (constant loop)
const animate = () => {
    requestAnimationFrame(animate);

    // speed of rotation on each axis
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate()