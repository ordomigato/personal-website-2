import React, { useEffect, useRef } from 'react'
import * as THREE from "three"
import { gsap } from "gsap";
import "../styles/global.scss"

interface CubeObject extends THREE.Mesh {
  animated: boolean,
}

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
      const aspectRatio = sizes.width / 2 / sizes.height
      const frustumSize = 10
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
      renderer.setSize( window.innerWidth, window.innerHeight * 2 );
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

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      function onPointerMove( event: PointerEvent ) {
        pointer.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
        pointer.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
        raycaster.setFromCamera( pointer, camera );

        const intersects = raycaster.intersectObjects( scene.children );
        for ( let i = 0; i < intersects.length; i ++ ) {
          const object = intersects[ i ].object as CubeObject;
          if (!object.animated) {
            const originalPosition = new THREE.Vector3(object.position.x, object.position.y, object.position.z);
            // @ts-ignore
            const originalColor = new THREE.Color(object.material.color)
            const newColor = new THREE.Color( 0xC5AFDB );

            object.animated = true;
            // @ts-ignore
            gsap.to(object.material.color, { duration: 1, r: newColor.r, g: newColor.g, b: newColor.b });
            gsap.to(object.position, { duration: 1, y: object.position.y + 0.5});
            gsap.to(object.scale, { duration: 1, y: 2 })
            setTimeout(() => {
              // @ts-ignore
              gsap.to(object.material.color, { duration: 1, r: originalColor.r, g: originalColor.g, b: originalColor.b })
              gsap.to(object.position, { duration: 1, y: originalPosition.y})
              gsap.to(object.scale, { duration: 1, y: 1, onComplete() { object.animated = false } })
            }, 1000)
          }
        }
      }

      window.addEventListener( 'pointermove', onPointerMove );
  
      const animate = function () {
        requestAnimationFrame( animate );
        // update the picking ray with the camera and pointer position
        renderer.render( scene, camera );
      }
  
      let onWindowResize = function () {
        // update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        const aspectRatio = sizes.width / 2 / sizes.height
        // update camera
        camera.left = -frustumSize * aspectRatio;
        camera.right = frustumSize * aspectRatio;
        camera.top = frustumSize;
        camera.bottom = -frustumSize;
        renderer.setSize( window.innerWidth, window.innerHeight * 2 );
        camera.updateProjectionMatrix();
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
    <div ref={mountRef}>
    </div>
  )
}

export default CubeScene
