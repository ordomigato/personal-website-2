import React, { useEffect, useRef, useState } from 'react'
import * as THREE from "three"
import { gsap } from "gsap";
import "../styles/global.scss"

interface CubeObject extends THREE.Mesh {
  animated: boolean,
}

interface ICameraConfigure {
  left: number
  right: number
  top: number
  bottom: number
  far: number
  near: number
}

const color = 0x484050

const createCube = (x: number, y: number, z: number): THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial, THREE.Object3DEventMap> => {
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshPhongMaterial( { color } );
  const cube = new THREE.Mesh( geometry, material );

  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;
  return cube;
}

// set camera settings for creation and updating
const cameraConfig = (): ICameraConfigure => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const aspectRatio = sizes.width / sizes.height;
  let frustumSize = 5
  if (aspectRatio > 10) {
    frustumSize = 2;
  }
  if (aspectRatio > 20) {
    frustumSize = 1;
  }
  if (aspectRatio > 100) {
    frustumSize = 0.1;
  }
  return {
    left: -frustumSize * aspectRatio,
    right: frustumSize * aspectRatio,
    top: frustumSize,
    bottom: -frustumSize,
    near: 0.1,
    far: 1000,
  }
}

const updateCamera = (camera: THREE.OrthographicCamera) => {
  const { left, right, top, bottom, near, far } = cameraConfig();
  camera.left = left;
  camera.right = right;
  camera.top = top;
  camera.bottom = bottom;
  camera.near = near;
  camera.far = far;
}

const CubeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (mountRef.current) {
      // scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color( color );

      // camera
      const { left, right, top, bottom, near, far } = cameraConfig();
      const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
      camera.position.set(-50, 50, 50)
      camera.lookAt(0, 0, 0);

      // renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      mountRef.current.appendChild( renderer.domElement );

      const group = new THREE.Group();

      const renderCubes = () => {
        const cubes = 200;
        for (let x = 0; x < cubes; x++) {
          for (let y = 0; y < cubes / 20; y++) {
              const zDisplacement = Math.abs(x + y - y)
              const cube = createCube(x + y, y, zDisplacement);
              group.add(cube)
          }
        }
        new THREE.Box3().setFromObject( group ).getCenter( group.position ).multiplyScalar( - 1 );
        scene.add(group);
      }

      renderCubes();
      setLoading(false)

      // add ambient light
      const light = new THREE.AmbientLight( 0x404040, 1 ); // soft white light
      scene.add(light);

      // add spotlight
      const spotLight = new THREE.SpotLight( 0xffffff );
      spotLight.position.set( -4, 10, 4 );
      spotLight.intensity = 200;

      scene.add( spotLight );

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
        updateCamera(camera);
        renderer.setSize( window.innerWidth, window.innerHeight );
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
    <div className="cube-container">
      <div className={'loading-overlay ' + (loading ? '' : 'hide')}></div>
      <div ref={mountRef}>
      </div>
    </div>
  )
}

export default CubeScene
