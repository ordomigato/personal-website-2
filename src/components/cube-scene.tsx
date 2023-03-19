import React, { useEffect, useRef } from 'react'
import * as THREE from "three"
import "../styles/global.scss"

const createCube = (x: number, y: number, z: number): THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial> => {
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshLambertMaterial( { color: 0x484050 } );
  const cube = new THREE.Mesh( geometry, material );

  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;
  return cube;
}

const CubeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mountRef.current) {
      // scene
      const scene = new THREE.Scene();

      // camera
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      const aspectRatio = sizes.width / sizes.height
      const frustumSize = 5
      const camera = new THREE.OrthographicCamera(
        -frustumSize * aspectRatio,
        frustumSize * aspectRatio,
        frustumSize,
        -frustumSize,
        0.1,
        1000,
      )

      // renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      mountRef.current.appendChild( renderer.domElement );

      const group = new THREE.Group();

      const renderCubes = () => {
        const cubes = 20;
        for (let x = 0; x < cubes; x++) {
          for (let y = 0; y < cubes; y++) {
              const zDisplacement = Math.abs(x + y - y)
              const cube = createCube(x + y, y, zDisplacement);
              group.add(cube)
          }
        }
        new THREE.Box3().setFromObject( group ).getCenter( group.position ).multiplyScalar( - 1 );
        scene.add(group);
      }

      renderCubes();

      // add ambient light
      const light = new THREE.AmbientLight( 0x404040, 1 ); // soft white light
      scene.add(light);

      // add spotlight
      const spotLight = new THREE.SpotLight( 0xffffff );
      spotLight.position.set( 100, 150, 100 );
      scene.add( spotLight );

      camera.position.set(-50, 50, 50)
      camera.lookAt(0, 0, 0);
  
      const animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
      }
  
      let onWindowResize = function () {
        // update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        const aspectRatio = sizes.width / sizes.height 
        // update camera
        camera.left = -frustumSize * aspectRatio;
        camera.right = frustumSize * aspectRatio;
        camera.top = frustumSize;
        camera.bottom = -frustumSize;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
      }
  
      window.addEventListener("resize", onWindowResize, false);
  
      animate();

      // cleanup
      return () => {
        if (mountRef.current) {
          mountRef.current.removeChild( renderer.domElement);
        }
      }
    }
  }, [])
  
  return (
    <div ref={mountRef} style={{ height: `100vh` }}>
    </div>
  )
}

export default CubeScene
