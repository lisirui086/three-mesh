/* 
  了解纹理偏移、旋转、重复
*/
// 1. 引入threejs
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 引入图片
import green from '../assets/image/green.png'
import desert from '../assets/image/desert.jpg'
import people from '../assets/image/people.jpg'
// 引入纹理
const texture = new THREE.TextureLoader().load(people)
// 设置纹理偏移
// texture.offset.set(0.1, 0.1)
// texture.offset.x = 0.2
// texture.offset.y = 0.2
// 设置纹理旋转 Math.PI = 180°
// texture.rotation = Math.PI / 4
// // 设置旋转原点
// texture.center.set(0.5, 0.5)
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
// 设置纹理重复
texture.repeat.set(2, 3)
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
// 3.1 创建几何体
// 添加物体
const geomtry = new THREE.BoxGeometry(1, 1, 1)
// 添加材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: '#ffffff',
  map: texture
})
const cube = new THREE.Mesh(geomtry, basicMaterial)
// 添加物体
scene.add(cube)
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