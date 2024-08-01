import { FC, useEffect } from 'react';
import '@ar-js-org/ar.js';
import * as THREE from 'three';
import { createBoxBufferGeometry } from '../utils';

export const IndexPage: FC = () => {
  useEffect(() => {
    const scene = document.querySelector('a-scene').object3D;
    const camera = document.querySelector('[camera]').object3D;

    // const materials = [
    //   new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    //   new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    //   new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    //   new THREE.MeshBasicMaterial({ color: 0xff00ff }),
    //   new THREE.MeshBasicMaterial({ color: 0x00ffff }),
    //   new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    // ];

    // const cube = new THREE.Mesh(createBoxBufferGeometry(0.2, 0.2, 0.2), materials);
    // cube.position.set(1, 1, 1);
    // scene.add(cube);
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <a-scene embedded arjs="sourceType: webcam;">
          <a-marker preset="hiro">
            <a-entity
              geometry="primitive: box; width: 0.2; height: 0.2; depth: 0.2"
              material="color: red"
              position="0 0.1 0"></a-entity>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      `,
      }}
    />
  );
};

export default IndexPage;

export function Head() {
  return <script src="https://unpkg.com/webxr-polyfill@latest/build/webxr-polyfill.min.js" />;
}
