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
    
    const geometry = new THREE.BoxGeometry( 2, 2, 2 );
    // const material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    const material = new THREE.ShaderMaterial({
        uniforms: {
          color1: {
            value: new THREE.Color("green")
          },
          color2: {
            value: new THREE.Color("yellow")
          }
        },
        vertexShader: `
          varying vec2 vUv;
      
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
        
          varying vec2 vUv;
          
          void main() {
            
            gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
          }
        `,
        wireframe: true
      });

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