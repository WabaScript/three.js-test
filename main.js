// initialize functions to allow page dynamacity (window dmensions)
let scene, camera, renderer, cube;

const init = () => {
    scene = new THREE.Scene();
    
    // (FOV, aspect, nearPlane, farPlane)
    camera = new THREE.PerspectiveCamera( 
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    
    // enable anti-aliasing for smoother edges (perf decrease)
    renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    cube = new THREE.Mesh( geometry, material );
    scene.add(cube);
    
    // adjust camera
    camera.position.z = 5

}

// animate the scene (constant loop)
const animate = () => {
    requestAnimationFrame(animate);

    // speed of rotation on each axis
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false)

init()
animate()