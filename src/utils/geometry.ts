import * as THREE from 'three';

export function createBoxBufferGeometry(width: number, height: number, depth: number): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  const vertices = new Float32Array([
    // Front face
    -width / 2,
    -height / 2,
    depth / 2,
    width / 2,
    -height / 2,
    depth / 2,
    width / 2,
    height / 2,
    depth / 2,
    -width / 2,
    height / 2,
    depth / 2,

    // Back face
    -width / 2,
    -height / 2,
    -depth / 2,
    width / 2,
    -height / 2,
    -depth / 2,
    width / 2,
    height / 2,
    -depth / 2,
    -width / 2,
    height / 2,
    -depth / 2,
  ]);

  const indices = [
    // Front face
    0, 1, 2, 0, 2, 3,
    // Back face
    4, 5, 6, 4, 6, 7,
    // Left face
    0, 3, 7, 0, 7, 4,
    // Right face
    1, 2, 6, 1, 6, 5,
    // Top face
    3, 2, 6, 3, 6, 7,
    // Bottom face
    0, 1, 5, 0, 5, 4,
  ];

  const normals = new Float32Array([
    // Front face
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    // Back face
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    // Left face
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    // Right face
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    // Top face
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    // Bottom face
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
  ]);

  const uvs = new Float32Array([
    // Front face
    0, 0, 1, 0, 1, 1, 0, 1,
    // Back face
    1, 0, 1, 1, 0, 1, 0, 0,
    // Left face
    0, 0, 1, 0, 1, 1, 0, 1,
    // Right face
    1, 0, 1, 1, 0, 1, 0, 0,
    // Top face
    0, 0, 1, 0, 1, 1, 0, 1,
    // Bottom face
    0, 0, 1, 0, 1, 1, 0, 1,
  ]);

  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  return geometry;
}
