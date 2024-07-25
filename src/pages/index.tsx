import { FC, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { createBoxBufferGeometry } from '../utils';

export const IndexPage: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onActivateClick = useCallback(async () => {
    try {
      if (!canvasRef.current || !navigator.xr) {
        return;
      }
      const gl = canvasRef.current.getContext('webgl2', { xrCompatible: true });

      if (!gl) {
        return;
      }

      const scene = new THREE.Scene();

      const materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        new THREE.MeshBasicMaterial({ color: 0xff00ff }),
        new THREE.MeshBasicMaterial({ color: 0x00ffff }),
        new THREE.MeshBasicMaterial({ color: 0xffff00 }),
      ];

      // Create the cube and add it to the demo scene.
      const cube = new THREE.Mesh(createBoxBufferGeometry(0.2, 0.2, 0.2), materials);
      cube.position.set(1, 1, 1);
      scene.add(cube);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        canvas: canvasRef.current,
        context: gl,
      });
      renderer.autoClear = false;

      const camera = new THREE.PerspectiveCamera();
      camera.matrixAutoUpdate = false;

      const session = await navigator.xr.requestSession('immersive-ar');
      session.updateRenderState({
        baseLayer: new XRWebGLLayer(session, gl),
      });

      const referenceSpace = await session.requestReferenceSpace('local');

      const onXRFrame = (_time: DOMHighResTimeStamp, frame: XRFrame) => {
        session.requestAnimationFrame(onXRFrame);

        if (!session.renderState.baseLayer) {
          return;
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer);

        const pose = frame.getViewerPose(referenceSpace);

        if (pose) {
          const view = pose.views[0];

          const viewport = session.renderState.baseLayer.getViewport(view);

          if (!viewport) {
            return;
          }

          renderer.setSize(viewport.width, viewport.height);

          camera.matrix.fromArray(view.transform.matrix);
          camera.projectionMatrix.fromArray(view.projectionMatrix);
          camera.updateMatrixWorld(true);

          renderer.render(scene, camera);
        }
      };
      session.requestAnimationFrame(onXRFrame);
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <main className="tw-p-4 tw-min-h-screen tw-flex tw-flex-col tw-items-stretch">
      <button onClick={onActivateClick}>Start</button>
      <canvas className="tw-flex-1" ref={canvasRef} />
    </main>
  );
};

export default IndexPage;
