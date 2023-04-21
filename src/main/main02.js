/* 
  BufferGeometry设置顶点创建矩形
*/
// 1. 引入threejs
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 2. 创建摄像机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
// 2. 创建场景
const scene = new THREE.Scene()
// 3.1 创建几何体 x,y,z
const vertice = new Float32Array([
  -1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0
])
const geometry = new THREE.BufferGeometry()
// 设置顶点
geometry.setAttribute('position', new THREE.BufferAttribute( vertice, 3))
// 3.2 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00a2ff })
// 3.3 根据几何体和材质创建物体
const mesh = new THREE.Mesh(geometry, material)
// 4.1 初始化渲染器
const rennder = new THREE.WebGLRenderer({ antialias: true })
// 4.2 设置渲染器的尺寸大小
rennder.setSize(window.innerWidth, window.innerHeight)
// 添加轨道控制器
const controls = new OrbitControls(camera, rennder.domElement)
// 添加辅助对象
const axesHelper = new THREE.AxesHelper(5)
// 将辅助对象添加到场景
scene.add(axesHelper)
// 2.1 将相机、物体添加到场景
scene.add(camera)
scene.add(mesh)
rennder.setAnimationLoop( animation );
// 5 将WebGL渲染到canvas内容中添加到body
document.body.appendChild(rennder.domElement)
rennder.render(scene, camera)
function animation( time ) {

	// mesh.rotation.x = time / 2000;
	// mesh.rotation.y = time / 1000;

	rennder.render( scene, camera );
}