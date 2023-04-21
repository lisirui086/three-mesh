/* 
  BufferGeometry生成酷炫三角形科技物体
*/
// 1. 引入threejs
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 2. 创建摄像机
const camera = new THREE.PerspectiveCamera(
  75,
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
// 创建几何体
for (let i = 0; i < 50; i++){
  // 每个三角形，需要三个顶点，每个顶点需要三个值
  const geometry = new THREE.BufferGeometry()
  const positionArray = new Float32Array(9)
  for (let j = 0; j < 9; j++){
    positionArray[j] = Math.random() * 10 - 5
  }
  // 设置顶点
  geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
  // 3.2 创建材质
  // 颜色随机
  const color = new THREE.Color(Math.random(), Math.random(), Math.random())
  // transparent开启透明，opacity透明度
  const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity:0.3, })
  // 3.3 根据几何体和材质创建物体
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}


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

rennder.setAnimationLoop( animation );
// 5 将WebGL渲染到canvas内容中添加到body
document.body.appendChild(rennder.domElement)
rennder.render(scene, camera)
function animation( time ) {

	// mesh.rotation.x = time / 2000;
	// mesh.rotation.y = time / 1000;

	rennder.render( scene, camera );
}
// 侦听画面变化， 更新渲染画面
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = (window.innerWidth/window.innerHeight)
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  rennder.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  rennder.setPixelRatio(window.devicePixelRatio)
})